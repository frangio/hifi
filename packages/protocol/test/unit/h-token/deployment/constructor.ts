import type { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { H_TOKEN_MATURITY_THREE_MONTHS } from "@hifi/constants";
import { HTokenErrors } from "@hifi/errors";
import { getNow } from "@hifi/helpers";
import { expect } from "chai";

import type { HToken } from "../../../../src/types/HToken";
import { deployHToken } from "../../../shared/deployers";

export function shouldBehaveLikeConstructor(): void {
  context("when the underlying has zero decimals", function () {
    beforeEach(async function () {
      await this.mocks.usdc.mock.decimals.returns(Zero);
    });

    it("reverts", async function () {
      const deployHTokenPromise: Promise<HToken> = deployHToken(
        this.signers.admin,
        H_TOKEN_MATURITY_THREE_MONTHS,
        this.mocks.balanceSheet.address,
        this.mocks.fintroller.address,
        this.mocks.usdc.address,
      );
      await expect(deployHTokenPromise).to.be.revertedWith(HTokenErrors.UNDERLYING_DECIMALS_ZERO);
    });
  });

  context("when the underlying has more than 18 decimals", function () {
    beforeEach(async function () {
      await this.mocks.usdc.mock.decimals.returns(36);
    });

    it("reverts", async function () {
      const deployHTokenPromise: Promise<HToken> = deployHToken(
        this.signers.admin,
        H_TOKEN_MATURITY_THREE_MONTHS,
        this.mocks.balanceSheet.address,
        this.mocks.fintroller.address,
        this.mocks.usdc.address,
      );
      await expect(deployHTokenPromise).to.be.revertedWith(HTokenErrors.UNDERLYING_DECIMALS_OVERFLOW);
    });
  });

  context("when the maturity is in the past", function () {
    it("reverts", async function () {
      const oneHourAgo: BigNumber = getNow().sub(3600);
      const deployHTokenPromise: Promise<HToken> = deployHToken(
        this.signers.admin,
        oneHourAgo,
        this.mocks.balanceSheet.address,
        this.mocks.fintroller.address,
        this.mocks.usdc.address,
      );
      await expect(deployHTokenPromise).to.be.revertedWith(HTokenErrors.MATURITY_PASSED);
    });
  });
}
