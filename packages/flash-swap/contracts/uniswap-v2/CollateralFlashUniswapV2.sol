// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity >=0.8.4;

import "@paulrberg/contracts/token/erc20/IErc20.sol";
import "@paulrberg/contracts/token/erc20/SafeErc20.sol";
import "@hifi/protocol/contracts/core/balanceSheet/IBalanceSheetV1.sol";
import "@hifi/protocol/contracts/core/balanceSheet/SBalanceSheetV1.sol";
import "@hifi/protocol/contracts/core/hToken/IHToken.sol";

import "./FlashUtils.sol";
import "./ICollateralFlashUniswapV2.sol";
import "./IUniswapV2Pair.sol";

/// @notice Emitted when the caller is not the Uniswap V2 pair contract.
error CollateralFlashUniswapV2__CallNotAuthorized(address caller);

/// @notice Emitted when the flash borrowed asset is the collateral instead of the underlying.
error CollateralFlashUniswapV2__FlashBorrowCollateral();

/// @notice Emitted when the liquidation does not yield a sufficient profit.
error CollateralFlashUniswapV2__InsufficientProfit(
    uint256 seizedCollateralAmount,
    uint256 repayCollateralAmount,
    uint256 minProfit
);

/// @notice Emitted when neither the token0 nor the token1 is the underlying.
error CollateralFlashUniswapV2__UnderlyingNotInPool(
    IUniswapV2Pair pair,
    address token0,
    address token1,
    IErc20 underlying
);

/// @title CollateralFlashUniswapV2
/// @author Hifi
contract CollateralFlashUniswapV2 is ICollateralFlashUniswapV2 {
    using SafeErc20 for IErc20;

    /// PUBLIC STORAGE ///

    /// @inheritdoc ICollateralFlashUniswapV2
    IBalanceSheetV1 public override balanceSheet;

    /// @inheritdoc ICollateralFlashUniswapV2
    address public override uniV2Factory;

    /// @inheritdoc ICollateralFlashUniswapV2
    bytes32 public override uniV2PairInitCodeHash;

    /// CONSTRUCTOR ///
    constructor(
        IBalanceSheetV1 balanceSheet_,
        address uniV2Factory_,
        bytes32 uniV2PairInitCodeHash_
    ) {
        balanceSheet = IBalanceSheetV1(balanceSheet_);
        uniV2Factory = uniV2Factory_;
        uniV2PairInitCodeHash = uniV2PairInitCodeHash_;
    }

    /// PUBLIC CONSTANT FUNCTIONS ////

    /// @inheritdoc ICollateralFlashUniswapV2
    function getCollateralAndUnderlyingAmount(
        IUniswapV2Pair pair,
        uint256 amount0,
        uint256 amount1,
        IErc20 underlying
    ) public view override returns (IErc20 collateral, uint256 underlyingAmount) {
        address token0 = pair.token0();
        address token1 = pair.token1();
        if (token0 == address(underlying)) {
            if (amount1 > 0) {
                revert CollateralFlashUniswapV2__FlashBorrowCollateral();
            }
            collateral = IErc20(token1);
            underlyingAmount = amount0;
        } else if (token1 == address(underlying)) {
            if (amount0 > 0) {
                revert CollateralFlashUniswapV2__FlashBorrowCollateral();
            }
            collateral = IErc20(token0);
            underlyingAmount = amount1;
        } else {
            revert CollateralFlashUniswapV2__UnderlyingNotInPool(pair, token0, token1, underlying);
        }
    }

    /// @inheritdoc ICollateralFlashUniswapV2
    function getRepayCollateralAmount(
        IUniswapV2Pair pair,
        IErc20 underlying,
        uint256 underlyingAmount
    ) public view override returns (uint256 repayCollateralAmount) {
        // Depending upon which token is which, the reserves are returned in a different order.
        address token0 = pair.token0();
        uint112 collateralReserves;
        uint112 underlyingReserves;
        if (token0 == address(underlying)) {
            (underlyingReserves, collateralReserves, ) = pair.getReserves();
        } else {
            (collateralReserves, underlyingReserves, ) = pair.getReserves();
        }

        // Note that we can safely use unchecked arithmetic here because the UniswapV2Pair.sol contract performs
        // sanity checks on the amounts before calling the current contract.
        unchecked {
            uint256 numerator = collateralReserves * underlyingAmount * 1000;
            uint256 denominator = (underlyingReserves - underlyingAmount) * 997;
            repayCollateralAmount = numerator / denominator + 1;
        }
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    struct UniswapV2CallLocalVars {
        IHToken bond;
        address borrower;
        IErc20 collateral;
        uint256 minProfit;
        uint256 mintedHTokenAmount;
        uint256 profitCollateralAmount;
        uint256 repayCollateralAmount;
        uint256 seizedCollateralAmount;
        uint256 subsidizedCollateralAmount;
        address subsidizer;
        IErc20 underlying;
        uint256 underlyingAmount;
    }

    /// @inheritdoc IUniswapV2Callee
    function uniswapV2Call(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external override {
        UniswapV2CallLocalVars memory vars;

        // Unpack the ABI encoded data passed by the UniswapV2Pair contract.
        (vars.borrower, vars.bond, vars.minProfit, vars.subsidizer) = abi.decode(
            data,
            (address, IHToken, uint256, address)
        );

        // Figure out which token is the collateral and which token is the underlying.
        vars.underlying = vars.bond.underlying();
        (vars.collateral, vars.underlyingAmount) = getCollateralAndUnderlyingAmount(
            IUniswapV2Pair(msg.sender),
            amount0,
            amount1,
            vars.underlying
        );

        // Check that the caller is a genuine UniswapV2Pair contract.
        if (
            msg.sender !=
            FlashUtils.pairFor(uniV2Factory, uniV2PairInitCodeHash, address(vars.underlying), address(vars.collateral))
        ) {
            revert CollateralFlashUniswapV2__CallNotAuthorized(msg.sender);
        }

        // Mint hTokens and liquidate the borrower.
        vars.mintedHTokenAmount = FlashUtils.mintHTokensInternal(vars.bond, vars.underlyingAmount);
        vars.seizedCollateralAmount = FlashUtils.liquidateBorrowInternal(
            balanceSheet,
            vars.borrower,
            vars.bond,
            vars.collateral,
            vars.mintedHTokenAmount
        );

        // Calculate the amount of collateral required to repay.
        vars.repayCollateralAmount = getRepayCollateralAmount(
            IUniswapV2Pair(msg.sender),
            vars.underlying,
            vars.underlyingAmount
        );
        // If no subsidizer is assigned, the liquidation should not be subsidized.
        if (vars.subsidizer == address(0)) {
            if (vars.seizedCollateralAmount <= vars.repayCollateralAmount + vars.minProfit) {
                revert CollateralFlashUniswapV2__InsufficientProfit(
                    vars.seizedCollateralAmount,
                    vars.repayCollateralAmount,
                    vars.minProfit
                );
            }
        } else {
            // The flash swap fee must be subsidized when the repay collateral amount is greater than
            // the seized collateral amount.
            if (vars.repayCollateralAmount > vars.seizedCollateralAmount) {
                unchecked {
                    vars.subsidizedCollateralAmount = vars.repayCollateralAmount - vars.seizedCollateralAmount;
                }
                vars.collateral.safeTransferFrom(vars.subsidizer, address(this), vars.subsidizedCollateralAmount);
            }
        }

        // Pay back the loan.
        vars.collateral.safeTransfer(msg.sender, vars.repayCollateralAmount);

        // Reap the profit if the seized collateral amount is greater than the repay collateral amount.
        if (vars.seizedCollateralAmount > vars.repayCollateralAmount) {
            unchecked {
                vars.profitCollateralAmount = vars.seizedCollateralAmount - vars.repayCollateralAmount;
            }
            vars.collateral.safeTransfer(sender, vars.profitCollateralAmount);
        }

        // Emit an event.
        emit FlashSwapCollateralAndLiquidateBorrow(
            sender,
            vars.borrower,
            address(vars.bond),
            vars.underlyingAmount,
            vars.seizedCollateralAmount,
            vars.repayCollateralAmount,
            vars.subsidizedCollateralAmount,
            vars.profitCollateralAmount
        );
    }
}
