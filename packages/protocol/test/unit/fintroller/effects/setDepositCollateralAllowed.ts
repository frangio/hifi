import { FintrollerErrors, OwnableErrors } from "@hifi/errors";
import { expect } from "chai";

export function shouldBehaveLikeSetDepositCollateralAllowed(): void {
  context("when the caller is not the owner", function () {
    it("reverts", async function () {
      await expect(
        this.contracts.fintroller
          .connect(this.signers.raider)
          .setDepositCollateralAllowed(this.mocks.wbtc.address, true),
      ).to.be.revertedWith(OwnableErrors.NOT_OWNER);
    });
  });

  context("when the caller is the owner", function () {
    context("when the collateral is not listed", function () {
      it("rejects", async function () {
        await expect(
          this.contracts.fintroller
            .connect(this.signers.admin)
            .setDepositCollateralAllowed(this.mocks.wbtc.address, true),
        ).to.be.revertedWith(FintrollerErrors.COLLATERAL_NOT_LISTED);
      });
    });

    context("when the collateral is listed", function () {
      beforeEach(async function () {
        await this.contracts.fintroller.connect(this.signers.admin).listCollateral(this.mocks.wbtc.address);
      });

      it("sets the value to true", async function () {
        await this.contracts.fintroller
          .connect(this.signers.admin)
          .setDepositCollateralAllowed(this.mocks.wbtc.address, true);
        const newState: boolean = await this.contracts.fintroller.getDepositCollateralAllowed(this.mocks.wbtc.address);
        expect(newState).to.equal(true);
      });

      it("sets the value to false", async function () {
        await this.contracts.fintroller
          .connect(this.signers.admin)
          .setDepositCollateralAllowed(this.mocks.wbtc.address, false);
        const newState: boolean = await this.contracts.fintroller.getDepositCollateralAllowed(this.mocks.wbtc.address);
        expect(newState).to.equal(false);
      });

      it("emits a SetDepositCollateralAllowed event", async function () {
        await expect(
          this.contracts.fintroller
            .connect(this.signers.admin)
            .setDepositCollateralAllowed(this.mocks.wbtc.address, true),
        )
          .to.emit(this.contracts.fintroller, "SetDepositCollateralAllowed")
          .withArgs(this.signers.admin.address, this.mocks.wbtc.address, true);
      });
    });
  });
}
