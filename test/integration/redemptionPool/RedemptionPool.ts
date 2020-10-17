import { shouldBehaveLikeRedemptionPool } from "./RedemptionPool.behavior";
import { integrationFixture } from "../fixtures";

export function integrationTestRedemptionPool(): void {
  describe("RedemptionPool", function () {
    beforeEach(async function () {
      const { balanceSheet, fintroller, oracle, redemptionPool, underlying, yToken } = await this.loadFixture(
        integrationFixture,
      );
      this.contracts.balanceSheet = balanceSheet;
      this.contracts.fintroller = fintroller;
      this.contracts.oracle = oracle;
      this.contracts.redemptionPool = redemptionPool;
      this.contracts.underlying = underlying;
      this.contracts.yToken = yToken;
    });

    shouldBehaveLikeRedemptionPool();
  });
}
