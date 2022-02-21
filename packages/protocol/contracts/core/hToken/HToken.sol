// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity >=0.8.4;

import "@paulrberg/contracts/access/Ownable.sol";
import "@paulrberg/contracts/token/erc20/Erc20.sol";
import "@paulrberg/contracts/token/erc20/Erc20Permit.sol";
import "@paulrberg/contracts/token/erc20/Erc20Recover.sol";
import "@paulrberg/contracts/token/erc20/SafeErc20.sol";

import "./IHToken.sol";
import "../balanceSheet/IBalanceSheetV1.sol";

/// @notice Emitted when the bond matured.
error HToken__BondMatured(uint256 now, uint256 maturity);

/// @notice Emitted when the bond did not mature.
error HToken__BondNotMatured(uint256 now, uint256 maturity);

/// @notice Emitted when burning hTokens and the caller is not the BalanceSheet contract.
error HToken__BurnNotAuthorized(address caller);

/// @notice Emitted when depositing a zero amount of underlying.
error HToken__DepositUnderlyingZero();

/// @notice Emitted when the maturity is in the past.
error HToken__MaturityPassed(uint256 now, uint256 maturity);

/// @notice Emitted when minting hTokens and the caller is not the BalanceSheet contract.
error HToken__MintNotAuthorized(address caller);

/// @notice Emitted when redeeming more underlying that there is in the reserve.
error HToken__RedeemInsufficientLiquidity(uint256 underlyingAmount, uint256 totalUnderlyingReserve);

/// @notice Emitted when redeeming a zero amount of underlying.
error HToken__RedeemZero();

/// @notice Emitted when constructing the contract and the underlying has more than 18 decimals.
error HToken__UnderlyingDecimalsOverflow(uint256 decimals);

/// @notice Emitted when constructing the contract and the underlying has zero decimals.
error HToken__UnderlyingDecimalsZero();

/// @notice Emitted when withdrawing more underlying than there is available.
error HToken__WithdrawUnderlyingUnderflow(address depositor, uint256 availableAmount, uint256 underlyingAmount);

/// @notice Emitted when withdrawing a zero amount of underlying.
error HToken__WithdrawUnderlyingZero();

/// @title HToken
/// @author Hifi
contract HToken is
    Ownable, // one dependency
    Erc20, // one dependency
    Erc20Permit, // four dependencies
    IHToken, // five dependencies
    Erc20Recover // five dependencies
{
    using SafeErc20 for IErc20;

    /// PUBLIC STORAGE ///

    /// @inheritdoc IHToken
    IBalanceSheetV1 public override balanceSheet;

    /// @inheritdoc IHToken
    uint256 public override maturity;

    /// @inheritdoc IHToken
    uint256 public override totalUnderlyingReserve;

    /// @inheritdoc IHToken
    IErc20 public override underlying;

    /// @inheritdoc IHToken
    uint256 public override underlyingPrecisionScalar;

    /// INTERNAL STORAGE ///

    /// @dev Underlying depositor balances.
    mapping(address => uint256) internal depositorBalances;

    /// CONSTRUCTOR ///

    /// @notice The hToken always has 18 decimals.
    /// @param name_ Erc20 name of this token.
    /// @param symbol_ Erc20 symbol of this token.
    /// @param maturity_ Unix timestamp in seconds for when this token matures.
    /// @param balanceSheet_ The address of the BalanceSheet contract.
    /// @param underlying_ The contract address of the underlying asset.
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maturity_,
        IBalanceSheetV1 balanceSheet_,
        IErc20 underlying_
    ) Erc20Permit(name_, symbol_, 18) Ownable() {
        // Set the maturity.
        if (maturity_ <= block.timestamp) {
            revert HToken__MaturityPassed(block.timestamp, maturity_);
        }
        maturity = maturity_;

        // Set the BalanceSheet contract.
        balanceSheet = balanceSheet_;

        // Set the underlying contract and calculate the precision scalar.
        uint256 underlyingDecimals = underlying_.decimals();
        if (underlyingDecimals == 0) {
            revert HToken__UnderlyingDecimalsZero();
        }
        if (underlyingDecimals > 18) {
            revert HToken__UnderlyingDecimalsOverflow(underlyingDecimals);
        }
        underlyingPrecisionScalar = 10**(18 - underlyingDecimals);
        underlying = underlying_;

        // Set the list of non-recoverable tokens.
        nonRecoverableTokens.push(underlying);
        isRecoverInitialized = true;
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    function getDepositorBalance(address depositor) external view override returns (uint256 amount) {
        return depositorBalances[depositor];
    }

    /// @inheritdoc IHToken
    function isMatured() public view override returns (bool) {
        return block.timestamp >= maturity;
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IHToken
    function _setBalanceSheet(IBalanceSheetV1 newBalanceSheet) external override onlyOwner {
        // Effects: update storage.
        IBalanceSheetV1 oldBalanceSheet = balanceSheet;
        balanceSheet = newBalanceSheet;

        emit SetBalanceSheet(owner, oldBalanceSheet, newBalanceSheet);
    }

    /// @inheritdoc IHToken
    function burn(address holder, uint256 burnAmount) external override {
        // Checks: the caller is the BalanceSheet.
        if (msg.sender != address(balanceSheet)) {
            revert HToken__BurnNotAuthorized(msg.sender);
        }

        // Effects: burns the hTokens.
        burnInternal(holder, burnAmount);

        // Emit a Burn and a Transfer event.
        emit Burn(holder, burnAmount);
    }

    /// @inheritdoc IHToken
    function depositUnderlying(uint256 underlyingAmount) external override {
        // Checks: the zero edge case.
        if (underlyingAmount == 0) {
            revert HToken__DepositUnderlyingZero();
        }

        // Checks: bond not matured.
        if (isMatured()) {
            revert HToken__BondMatured(block.timestamp, maturity);
        }

        // Effects: update storage.
        totalUnderlyingReserve += underlyingAmount;

        // Effects: update the balance of the depositor.
        depositorBalances[msg.sender] += underlyingAmount;

        // Normalize the underlying amount to 18 decimals.
        uint256 hTokenAmount = normalize(underlyingAmount);

        // Effects: mint the hTokens.
        mintInternal(msg.sender, hTokenAmount);

        // Interactions: perform the Erc20 transfer.
        underlying.safeTransferFrom(msg.sender, address(this), underlyingAmount);

        emit DepositUnderlying(msg.sender, underlyingAmount, hTokenAmount);
    }

    /// @inheritdoc IHToken
    function mint(address beneficiary, uint256 mintAmount) external override {
        // Checks: the caller is the BalanceSheet.
        if (msg.sender != address(balanceSheet)) {
            revert HToken__MintNotAuthorized(msg.sender);
        }

        // Effects: print the new hTokens into existence.
        mintInternal(beneficiary, mintAmount);

        // Emit a Mint event.
        emit Mint(beneficiary, mintAmount);
    }

    /// @inheritdoc IHToken
    function redeem(uint256 underlyingAmount) external override {
        // Checks: before maturation.
        if (!isMatured()) {
            revert HToken__BondNotMatured(block.timestamp, maturity);
        }

        // Checks: the zero edge case.
        if (underlyingAmount == 0) {
            revert HToken__RedeemZero();
        }

        // Checks: there is enough liquidity.
        if (underlyingAmount > totalUnderlyingReserve) {
            revert HToken__RedeemInsufficientLiquidity(underlyingAmount, totalUnderlyingReserve);
        }

        // Effects: decrease the remaining supply of underlying.
        totalUnderlyingReserve -= underlyingAmount;

        // Normalize the underlying amount to 18 decimals.
        uint256 hTokenAmount = normalize(underlyingAmount);

        // Effects: burn the hTokens.
        burnInternal(msg.sender, hTokenAmount);

        // Interactions: perform the Erc20 transfer.
        underlying.safeTransfer(msg.sender, underlyingAmount);

        emit Redeem(msg.sender, underlyingAmount, hTokenAmount);
    }

    /// @inheritdoc IHToken
    function withdrawUnderlying(uint256 underlyingAmount) external override {
        // Checks: the zero edge case.
        if (underlyingAmount == 0) {
            revert HToken__WithdrawUnderlyingZero();
        }

        // Checks: bond not matured. Depositors should call the `redeem` function instead.
        if (isMatured()) {
            revert HToken__BondMatured(block.timestamp, maturity);
        }

        // Checks: the depositor has enough underlying.
        uint256 availableAmount = depositorBalances[msg.sender];
        if (availableAmount < underlyingAmount) {
            revert HToken__WithdrawUnderlyingUnderflow(msg.sender, availableAmount, underlyingAmount);
        }

        // Effects: update storage.
        totalUnderlyingReserve -= underlyingAmount;

        // Effects: update the balance of the depositor.
        depositorBalances[msg.sender] -= underlyingAmount;

        // Normalize the underlying amount to 18 decimals.
        uint256 hTokenAmount = normalize(underlyingAmount);

        // Effects: burn the hTokens.
        burnInternal(msg.sender, hTokenAmount);

        // Interactions: perform the Erc20 transfer.
        underlying.safeTransfer(msg.sender, underlyingAmount);

        emit WithdrawUnderlying(msg.sender, underlyingAmount, hTokenAmount);
    }

    /// INTERNAL CONSTANT FUNCTIONS ///

    /// @notice Upscales the underlying amount to normalized form, i.e. 18 decimals of precision.
    /// @param underlyingAmount The underlying amount with its actual decimals of precision.
    /// @param normalizedUnderlyingAmount The underlying amount with 18 decimals of precision.
    function normalize(uint256 underlyingAmount) internal view returns (uint256 normalizedUnderlyingAmount) {
        normalizedUnderlyingAmount = underlyingPrecisionScalar != 1
            ? underlyingAmount * underlyingPrecisionScalar
            : underlyingAmount;
    }
}
