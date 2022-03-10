import { FintrollerErrors } from "@hifi/errors";
import { expect } from "chai";

export function shouldBehaveLikeGetDepositUnderlyingAllowed(): void {
  context("when the bond is not listed", function () {
    it("reverts", async function () {
      await expect(
        this.contracts.fintroller.getDepositUnderlyingAllowed(this.mocks.hTokens[0].address),
      ).to.be.revertedWith(FintrollerErrors.BOND_NOT_LISTED);
    });
  });

  context("when the bond is listed", function () {
    beforeEach(async function () {
      await this.contracts.fintroller.connect(this.signers.admin).listBond(this.mocks.hTokens[0].address);
    });

    it("returns the default value", async function () {
      const depositUnderlyingAllowed: boolean = await this.contracts.fintroller.getDepositUnderlyingAllowed(
        this.mocks.hTokens[0].address,
      );
      expect(depositUnderlyingAllowed).to.equal(true);
    });
  });
}
