import { BigNumber } from "@ethersproject/bignumber";
import { HTokenErrors } from "@hifi/errors";
import { hUSDC } from "@hifi/helpers";
import { expect } from "chai";

export function shouldBehaveLikeMint(): void {
  const mintAmount: BigNumber = hUSDC("100");

  context("when the caller is not the HToken contract", function () {
    it("reverts", async function () {
      await expect(
        this.contracts.hTokens[0].connect(this.signers.raider).mint(this.signers.raider.address, mintAmount),
      ).to.be.revertedWith(HTokenErrors.MINT_NOT_AUTHORIZED);
    });
  });
}
