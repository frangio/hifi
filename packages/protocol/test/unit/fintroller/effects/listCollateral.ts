import { Zero } from "@ethersproject/constants";
import { FintrollerErrors, OwnableErrors } from "@hifi/errors";
import { expect } from "chai";

export function shouldBehaveLikeListCollateral(): void {
  context("when the caller is not the owner", function () {
    it("reverts", async function () {
      await expect(
        this.contracts.fintroller.connect(this.signers.raider).listCollateral(this.mocks.wbtc.address),
      ).to.be.revertedWith(OwnableErrors.NOT_OWNER);
    });
  });

  context("when the caller is the owner", function () {
    context("when the number of decimals is out of bounds", function () {
      context("when the number of decimals is 0", function () {
        beforeEach(async function () {
          await this.mocks.wbtc.mock.decimals.returns(Zero);
        });

        it("reverts", async function () {
          await expect(
            this.contracts.fintroller.connect(this.signers.admin).listCollateral(this.mocks.wbtc.address),
          ).to.be.revertedWith(FintrollerErrors.COLLATERAL_DECIMALS_ZERO);
        });
      });

      context("when the number of decimals is 36", function () {
        beforeEach(async function () {
          await this.mocks.wbtc.mock.decimals.returns(36);
        });

        it("reverts", async function () {
          await expect(
            this.contracts.fintroller.connect(this.signers.admin).listCollateral(this.mocks.wbtc.address),
          ).to.be.revertedWith(FintrollerErrors.COLLATERAL_DECIMALS_OVERFLOW);
        });
      });
    });

    context("when the number of decimals is not out of bounds", function () {
      it("lists the collateral", async function () {
        await this.contracts.fintroller.connect(this.signers.admin).listCollateral(this.mocks.wbtc.address);
        const collateral = await this.contracts.fintroller.getCollateral(this.mocks.wbtc.address);
        expect(collateral.isListed).to.equal(true);
      });

      it("emits a ListCollateral event", async function () {
        await expect(this.contracts.fintroller.connect(this.signers.admin).listCollateral(this.mocks.wbtc.address))
          .to.emit(this.contracts.fintroller, "ListCollateral")
          .withArgs(this.signers.admin.address, this.mocks.wbtc.address);
      });
    });
  });
}
