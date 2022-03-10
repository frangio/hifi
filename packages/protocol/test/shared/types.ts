import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { MockContract } from "ethereum-waffle";
import type { Fixture } from "ethereum-waffle";

import type { ChainlinkOperator } from "../../src/types/ChainlinkOperator";
import type { Fintroller } from "../../src/types/Fintroller";
import type { GodModeBalanceSheet } from "../../src/types/GodModeBalanceSheet";
import type { GodModeErc20 } from "../../src/types/GodModeErc20";
import type { GodModeHToken } from "../../src/types/GodModeHToken";
import type { GodModeOwnableUpgradeable } from "../../src/types/GodModeOwnableUpgradeable";
import type { SimplePriceFeed } from "../../src/types/SimplePriceFeed";

declare module "mocha" {
  interface Context {
    contracts: Contracts;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    mocks: Mocks;
    signers: Signers;
  }
}

export interface Contracts {
  balanceSheet: GodModeBalanceSheet;
  fintroller: Fintroller;
  hTokens: GodModeHToken[];
  oracle: ChainlinkOperator;
  ownableUpgradeable: GodModeOwnableUpgradeable;
  usdc: GodModeErc20;
  usdcPriceFeed: SimplePriceFeed;
  wbtc: GodModeErc20;
  wbtcPriceFeed: SimplePriceFeed;
}

export interface Mocks {
  balanceSheet: MockContract;
  fintroller: MockContract;
  hTokens: MockContract[];
  oracle: MockContract;
  usdc: MockContract;
  usdcPriceFeed: MockContract;
  wbtc: MockContract;
  wbtcPriceFeed: MockContract;
  weth: MockContract;
  wethPriceFeed: MockContract;
}

export interface Signers {
  admin: SignerWithAddress;
  borrower: SignerWithAddress;
  lender: SignerWithAddress;
  liquidator: SignerWithAddress;
  maker: SignerWithAddress;
  raider: SignerWithAddress;
}
