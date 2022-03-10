import type { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { HTokenErrors } from "@hifi/errors";
import { hUSDC } from "@hifi/helpers";
import { getPrecisionScalar } from "@hifi/helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { toBn } from "evm-bn";
import forEach from "mocha-each";

export function shouldBehaveLikeDepositUnderlying(): void {
  let depositor: SignerWithAddress;

  beforeEach(async function () {
    depositor = this.signers.maker;
  });

  context("when the Fintroller does not allow underlying deposits", function () {
    beforeEach(async function () {
      await this.mocks.fintroller.mock.getDepositUnderlyingAllowed
        .withArgs(this.contracts.hTokens[0].address)
        .returns(false);
    });

    it("reverts", async function () {
      const depositAmount: BigNumber = Zero;
      await expect(this.contracts.hTokens[0].connect(depositor).depositUnderlying(depositAmount)).to.be.revertedWith(
        HTokenErrors.DEPOSIT_UNDERLYING_NOT_ALLOWED,
      );
    });
  });

  context("when the Fintroller allows underlying deposits", function () {
    beforeEach(async function () {
      await this.mocks.fintroller.mock.getDepositUnderlyingAllowed
        .withArgs(this.contracts.hTokens[0].address)
        .returns(true);
    });

    context("when the amount of underlying to deposit is zero", function () {
      it("reverts", async function () {
        const underlyingAmount: BigNumber = Zero;
        await expect(
          this.contracts.hTokens[0].connect(depositor).depositUnderlying(underlyingAmount),
        ).to.be.revertedWith(HTokenErrors.DEPOSIT_UNDERLYING_ZERO);
      });
    });

    context("when the amount of underlying to deposit is not zero", function () {
      const testSets: number[] = [18, 6, 1];

      forEach(testSets).describe("when the underlying has %d decimals", function (decimals: number) {
        const underlyingAmount: BigNumber = toBn("100", decimals);

        beforeEach(async function () {
          await this.contracts.hTokens[0].__godMode_setUnderlyingPrecisionScalar(getPrecisionScalar(decimals));
          await this.mocks.usdc.mock.transferFrom
            .withArgs(depositor.address, this.contracts.hTokens[0].address, underlyingAmount)
            .returns(true);
        });

        it("increases the depositor balance", async function () {
          const oldDepositorBalance: BigNumber = await this.contracts.hTokens[0].getDepositorBalance(depositor.address);
          await this.contracts.hTokens[0].connect(depositor).depositUnderlying(underlyingAmount);
          const newDepositorBalance: BigNumber = await this.contracts.hTokens[0].getDepositorBalance(depositor.address);
          expect(oldDepositorBalance).to.equal(newDepositorBalance.sub(underlyingAmount));
        });

        it("increases the underlying reserve", async function () {
          const oldUnderlyingReserve: BigNumber = await this.contracts.hTokens[0].totalUnderlyingReserve();
          await this.contracts.hTokens[0].connect(depositor).depositUnderlying(underlyingAmount);
          const newUnderlyingReserve: BigNumber = await this.contracts.hTokens[0].totalUnderlyingReserve();
          expect(oldUnderlyingReserve).to.equal(newUnderlyingReserve.sub(underlyingAmount));
        });

        it("emits a DepositUnderlying event", async function () {
          const hTokenAmount: BigNumber = hUSDC("100");
          await expect(this.contracts.hTokens[0].connect(depositor).depositUnderlying(underlyingAmount))
            .to.emit(this.contracts.hTokens[0], "DepositUnderlying")
            .withArgs(depositor.address, underlyingAmount, hTokenAmount);
        });
      });
    });
  });
}
