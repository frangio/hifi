import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { COLLATERAL_RATIOS, LIQUIDATION_INCENTIVES, WBTC_SYMBOL } from "@hifi/constants";
import { BalanceSheetErrors } from "@hifi/errors";
import { WBTC, hUSDC } from "@hifi/helpers";
import { expect } from "chai";
import { toBn } from "evm-bn";
import { mul } from "@prb/math";

import { getSeizableCollateralAmount } from "../../../shared/mirrors";

export function shouldBehaveLikeLiquidateBorrow(): void {
  const lowWbtcPrice: BigNumber = hUSDC("29999");
  const repayAmount: BigNumber = hUSDC("15000");
  const wbtcDepositAmount: BigNumber = WBTC("1");

  const debtAmount = repayAmount;
  const seizedWbtcAmount: BigNumber = getSeizableCollateralAmount(repayAmount, lowWbtcPrice);

  context("when the caller is the borrower", function () {
    it("reverts", async function () {
      await expect(
        this.contracts.balanceSheet
          .connect(this.signers.borrower)
          .liquidateBorrow(
            this.signers.borrower.address,
            this.mocks.hTokens[0].address,
            repayAmount,
            this.mocks.wbtc.address,
          ),
      ).to.be.revertedWith(BalanceSheetErrors.LIQUIDATE_BORROW_SELF);
    });
  });

  context("when the caller is not the borrower", function () {
    context("when the Fintroller does not allow borrow liquidations", function () {
      beforeEach(async function () {
        await this.mocks.fintroller.mock.getLiquidateBorrowAllowed
          .withArgs(this.mocks.hTokens[0].address)
          .returns(false);
      });

      it("reverts", async function () {
        await expect(
          this.contracts.balanceSheet
            .connect(this.signers.liquidator)
            .liquidateBorrow(
              this.signers.borrower.address,
              this.mocks.hTokens[0].address,
              repayAmount,
              this.mocks.wbtc.address,
            ),
        ).to.be.revertedWith(BalanceSheetErrors.LIQUIDATE_BORROW_NOT_ALLOWED);
      });
    });

    context("when the Fintroller allows borrow liquidations", function () {
      beforeEach(async function () {
        await this.mocks.fintroller.mock.getLiquidateBorrowAllowed
          .withArgs(this.mocks.hTokens[0].address)
          .returns(true);

        // Mock the necessary methods.
        await this.mocks.fintroller.mock.getLiquidationIncentive
          .withArgs(this.mocks.wbtc.address)
          .returns(LIQUIDATION_INCENTIVES.default);
        await this.mocks.fintroller.mock.getRepayBorrowAllowed.withArgs(this.mocks.hTokens[0].address).returns(true);
      });

      context("when the bond did not mature", function () {
        beforeEach(async function () {
          await this.mocks.hTokens[0].mock.isMatured.returns(false);
        });

        context("when the borrower does not owe a debt", function () {
          it("reverts", async function () {
            await expect(
              this.contracts.balanceSheet
                .connect(this.signers.liquidator)
                .liquidateBorrow(
                  this.signers.borrower.address,
                  this.mocks.hTokens[0].address,
                  repayAmount,
                  this.mocks.wbtc.address,
                ),
            ).to.be.revertedWith(BalanceSheetErrors.NO_LIQUIDITY_SHORTFALL);
          });
        });

        context("when the borrower owes a debt", function () {
          const debtAmount: BigNumber = repayAmount;

          beforeEach(async function () {
            // Mock the necessary methods.
            await this.mocks.fintroller.mock.getCollateralRatio
              .withArgs(this.mocks.wbtc.address)
              .returns(COLLATERAL_RATIOS.wbtc);
            await this.mocks.hTokens[0].mock.balanceOf.withArgs(this.signers.liquidator.address).returns(debtAmount);
            await this.mocks.hTokens[0].mock.burn.withArgs(this.signers.liquidator.address, repayAmount).returns();
            await this.mocks.wbtc.mock.transfer
              .withArgs(this.signers.liquidator.address, seizedWbtcAmount)
              .returns(true);

            // Make the collateral deposit.
            await this.contracts.balanceSheet.__godMode_setCollateralList(this.signers.borrower.address, [
              this.mocks.wbtc.address,
            ]);
            await this.contracts.balanceSheet.__godMode_setCollateralAmount(
              this.signers.borrower.address,
              this.mocks.wbtc.address,
              wbtcDepositAmount,
            );

            // Make the borrow.
            await this.contracts.balanceSheet.__godMode_setBondList(this.signers.borrower.address, [
              this.mocks.hTokens[0].address,
            ]);
            await this.contracts.balanceSheet.__godMode_setDebtAmount(
              this.signers.borrower.address,
              this.mocks.hTokens[0].address,
              debtAmount,
            );

            // Lower the WBTC price from $50k to $29,999, which makes the borrower have a liquidity shortfall.
            await this.mocks.oracle.mock.getNormalizedPrice.withArgs(WBTC_SYMBOL).returns(lowWbtcPrice);
          });

          it("makes the borrow liquidation", async function () {
            await this.contracts.balanceSheet
              .connect(this.signers.liquidator)
              .liquidateBorrow(
                this.signers.borrower.address,
                this.mocks.hTokens[0].address,
                repayAmount,
                this.mocks.wbtc.address,
              );

            const collateralList: string[] = await this.contracts.balanceSheet.getCollateralList(
              this.signers.borrower.address,
            );
            expect(collateralList).to.have.same.members([this.mocks.wbtc.address]);

            const collateralAmount: BigNumber = await this.contracts.balanceSheet.getCollateralAmount(
              this.signers.borrower.address,
              this.mocks.wbtc.address,
            );
            expect(collateralAmount).to.be.equal(wbtcDepositAmount.sub(seizedWbtcAmount));
          });
        });
      });

      context("when the bond matured", function () {
        beforeEach(async function () {
          await this.mocks.hTokens[0].mock.isMatured.returns(true);

          // Mock the necessary methods.
          await this.mocks.fintroller.mock.getCollateralRatio
            .withArgs(this.mocks.wbtc.address)
            .returns(COLLATERAL_RATIOS.wbtc);

          // Make the collateral deposit.
          await this.contracts.balanceSheet.__godMode_setCollateralList(this.signers.borrower.address, [
            this.mocks.wbtc.address,
          ]);
          await this.contracts.balanceSheet.__godMode_setCollateralAmount(
            this.signers.borrower.address,
            this.mocks.wbtc.address,
            wbtcDepositAmount,
          );

          // Make the borrow.
          await this.contracts.balanceSheet.__godMode_setBondList(this.signers.borrower.address, [
            this.mocks.hTokens[0].address,
          ]);
          await this.contracts.balanceSheet.__godMode_setDebtAmount(
            this.signers.borrower.address,
            this.mocks.hTokens[0].address,
            debtAmount,
          );
        });

        context("when there is not enough collateral to seize", function () {
          beforeEach(async function () {
            await this.mocks.oracle.mock.getNormalizedPrice.withArgs(WBTC_SYMBOL).returns(toBn("14999"));
          });

          it("reverts", async function () {
            await expect(
              this.contracts.balanceSheet
                .connect(this.signers.liquidator)
                .liquidateBorrow(
                  this.signers.borrower.address,
                  this.mocks.hTokens[0].address,
                  repayAmount,
                  this.mocks.wbtc.address,
                ),
            ).to.be.revertedWith(BalanceSheetErrors.LIQUIDATE_BORROW_INSUFFICIENT_COLLATERAL);
          });
        });

        context("when there is enough collateral to seize", function () {
          context("when the caller does not have enough hTokens", function () {
            beforeEach(async function () {
              const hTokenBalance: BigNumber = Zero;
              await this.mocks.hTokens[0].mock.balanceOf
                .withArgs(this.signers.liquidator.address)
                .returns(hTokenBalance);
            });

            it("reverts", async function () {
              await expect(
                this.contracts.balanceSheet
                  .connect(this.signers.liquidator)
                  .liquidateBorrow(
                    this.signers.borrower.address,
                    this.mocks.hTokens[0].address,
                    repayAmount,
                    this.mocks.wbtc.address,
                  ),
              ).to.be.revertedWith(BalanceSheetErrors.REPAY_BORROW_INSUFFICIENT_BALANCE);
            });
          });

          context("when the caller has enough hTokens", function () {
            beforeEach(async function () {
              const hTokenBalance: BigNumber = debtAmount;
              await this.mocks.hTokens[0].mock.balanceOf
                .withArgs(this.signers.liquidator.address)
                .returns(hTokenBalance);

              // Mock the necessary methods.
              await this.mocks.hTokens[0].mock.burn.withArgs(this.signers.liquidator.address, repayAmount).returns();
            });

            context("when all collateral is seized", function () {
              beforeEach(async function () {
                const localWbtcPrice: BigNumber = mul(repayAmount, LIQUIDATION_INCENTIVES.default);
                await this.mocks.oracle.mock.getNormalizedPrice.withArgs(WBTC_SYMBOL).returns(localWbtcPrice);

                // Mock the necessary methods.
                const localSeizedWbtcAmount: BigNumber = getSeizableCollateralAmount(repayAmount, localWbtcPrice);
                await this.mocks.wbtc.mock.transfer
                  .withArgs(this.signers.liquidator.address, localSeizedWbtcAmount)
                  .returns(true);
              });

              it("liquidates the borrower", async function () {
                await this.contracts.balanceSheet
                  .connect(this.signers.liquidator)
                  .liquidateBorrow(
                    this.signers.borrower.address,
                    this.mocks.hTokens[0].address,
                    repayAmount,
                    this.mocks.wbtc.address,
                  );

                const collateralList: string[] = await this.contracts.balanceSheet.getCollateralList(
                  this.signers.borrower.address,
                );
                expect(collateralList).to.be.empty;

                const collateralAmount: BigNumber = await this.contracts.balanceSheet.getCollateralAmount(
                  this.signers.borrower.address,
                  this.mocks.wbtc.address,
                );
                expect(collateralAmount).to.be.equal(Zero);
              });
            });

            context("when not all collateral is seized", function () {
              beforeEach(async function () {
                await this.mocks.oracle.mock.getNormalizedPrice.withArgs(WBTC_SYMBOL).returns(lowWbtcPrice);

                // Mock the necessary methods.
                await this.mocks.wbtc.mock.transfer
                  .withArgs(this.signers.liquidator.address, seizedWbtcAmount)
                  .returns(true);
              });

              it("makes the borrow liquidation", async function () {
                await this.contracts.balanceSheet
                  .connect(this.signers.liquidator)
                  .liquidateBorrow(
                    this.signers.borrower.address,
                    this.mocks.hTokens[0].address,
                    repayAmount,
                    this.mocks.wbtc.address,
                  );

                const collateralList: string[] = await this.contracts.balanceSheet.getCollateralList(
                  this.signers.borrower.address,
                );
                expect(collateralList).to.have.same.members([this.mocks.wbtc.address]);

                const collateralAmount: BigNumber = await this.contracts.balanceSheet.getCollateralAmount(
                  this.signers.borrower.address,
                  this.mocks.wbtc.address,
                );
                expect(collateralAmount).to.be.equal(wbtcDepositAmount.sub(seizedWbtcAmount));
              });

              it("emits a LiquidateBorrow event", async function () {
                await expect(
                  this.contracts.balanceSheet
                    .connect(this.signers.liquidator)
                    .liquidateBorrow(
                      this.signers.borrower.address,
                      this.mocks.hTokens[0].address,
                      repayAmount,
                      this.mocks.wbtc.address,
                    ),
                )
                  .to.emit(this.contracts.balanceSheet, "LiquidateBorrow")
                  .withArgs(
                    this.signers.liquidator.address,
                    this.signers.borrower.address,
                    this.mocks.hTokens[0].address,
                    repayAmount,
                    this.mocks.wbtc.address,
                    seizedWbtcAmount,
                  );
              });
            });
          });
        });
      });
    });
  });
}
