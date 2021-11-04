import { integrationFixture } from "../../shared/fixtures";
import { shouldBehaveLikeUnderlyingFlashUniswapV2 } from "./UnderlyingFlashUniswapV2.behavior";

export function integrationTestUnderlyingFlashUniswapV2(): void {
  describe("UnderlyingFlashUniswapV2", function () {
    beforeEach(async function () {
      const {
        balanceSheet,
        collateralFlashUniswapV2,
        fintroller,
        hToken,
        maliciousPair,
        oracle,
        underlyingFlashUniswapV2,
        uniswapV2Pair,
        usdc,
        usdcPriceFeed,
        wbtc,
        wbtcPriceFeed,
      } = await this.loadFixture(integrationFixture);
      this.contracts.balanceSheet = balanceSheet;
      this.contracts.collateralFlashUniswapV2 = collateralFlashUniswapV2;
      this.contracts.fintroller = fintroller;
      this.contracts.hToken = hToken;
      this.contracts.maliciousPair = maliciousPair;
      this.contracts.oracle = oracle;
      this.contracts.underlyingFlashUniswapV2 = underlyingFlashUniswapV2;
      this.contracts.uniswapV2Pair = uniswapV2Pair;
      this.contracts.usdc = usdc;
      this.contracts.usdcPriceFeed = usdcPriceFeed;
      this.contracts.wbtc = wbtc;
      this.contracts.wbtcPriceFeed = wbtcPriceFeed;
    });

    shouldBehaveLikeUnderlyingFlashUniswapV2();
  });
}
