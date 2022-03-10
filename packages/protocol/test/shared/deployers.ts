import type { Signer } from "@ethersproject/abstract-signer";
import type { BigNumber } from "@ethersproject/bignumber";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import {
  GAS_LIMITS,
  USDC_DECIMALS,
  USDC_NAME,
  USDC_SYMBOL,
  WBTC_DECIMALS,
  WBTC_NAME,
  WBTC_PRICE,
  WBTC_SYMBOL,
} from "@hifi/constants";
import { getHTokenName, getHTokenSymbol, price } from "@hifi/helpers";
import type { GodModeBalanceSheet__factory } from "../../src/types/factories/GodModeBalanceSheet__factory";
import type { GodModeOwnableUpgradeable__factory } from "../../src/types/factories/GodModeOwnableUpgradeable__factory";
import type { ChainlinkOperator } from "../../src/types/ChainlinkOperator";
import type { Fintroller } from "../../src/types/Fintroller";
import type { GodModeBalanceSheet } from "../../src/types/GodModeBalanceSheet";
import type { GodModeErc20 } from "../../src/types/GodModeErc20";
import type { GodModeHToken } from "../../src/types/GodModeHToken";
import type { GodModeOwnableUpgradeable } from "../../src/types/GodModeOwnableUpgradeable";
import type { HToken } from "../../src/types/HToken";
import type { SimplePriceFeed } from "../../src/types/SimplePriceFeed";

const { deployContract } = waffle;
const overrides = { gasLimit: process.env.CODE_COVERAGE ? GAS_LIMITS.coverage : GAS_LIMITS.hardhat };

export async function deployChainlinkOperator(deployer: Signer): Promise<ChainlinkOperator> {
  const chainlinkOperatorArtifact: Artifact = await artifacts.readArtifact("ChainlinkOperator");
  const chainlinkOperator: ChainlinkOperator = <ChainlinkOperator>(
    await deployContract(deployer, chainlinkOperatorArtifact, [], overrides)
  );
  return chainlinkOperator;
}

export async function deployFintroller(deployer: Signer): Promise<Fintroller> {
  const fintrollerArtifact: Artifact = await artifacts.readArtifact("Fintroller");
  const fintroller: Fintroller = <Fintroller>await deployContract(deployer, fintrollerArtifact);
  await fintroller.deployed();
  return fintroller;
}

export async function deployHToken(
  deployer: Signer,
  maturity: BigNumber,
  balanceSheetAddress: string,
  fintrollerAddress: string,
  underlyingAddress: string,
): Promise<HToken> {
  const hTokenArtifact: Artifact = await artifacts.readArtifact("HToken");
  const hToken: HToken = <HToken>(
    await deployContract(
      deployer,
      hTokenArtifact,
      [
        getHTokenName(maturity),
        getHTokenSymbol(maturity),
        maturity,
        balanceSheetAddress,
        fintrollerAddress,
        underlyingAddress,
      ],
      overrides,
    )
  );
  return hToken;
}

export async function deployGodModeBalanceSheet(
  fintrollerAddress: string,
  oracleAddress: string,
): Promise<GodModeBalanceSheet> {
  const godModeBalanceSheetFactory: GodModeBalanceSheet__factory = await ethers.getContractFactory(
    "GodModeBalanceSheet",
  );
  const balanceSheet: GodModeBalanceSheet = <GodModeBalanceSheet>(
    await upgrades.deployProxy(godModeBalanceSheetFactory, [fintrollerAddress, oracleAddress])
  );
  return balanceSheet;
}

export async function deployGodModeHToken(
  deployer: Signer,
  maturity: BigNumber,
  balanceSheetAddress: string,
  fintrollerAddress: string,
  underlyingAddress: string,
): Promise<GodModeHToken> {
  const godModeHTokenArtifact: Artifact = await artifacts.readArtifact("GodModeHToken");
  const hToken: GodModeHToken = <GodModeHToken>(
    await deployContract(
      deployer,
      godModeHTokenArtifact,
      [
        getHTokenName(maturity),
        getHTokenSymbol(maturity),
        maturity,
        balanceSheetAddress,
        fintrollerAddress,
        underlyingAddress,
      ],
      overrides,
    )
  );
  return hToken;
}

export async function deployOwnableUpgradeable(): Promise<GodModeOwnableUpgradeable> {
  const ownableUpgradeableFactory: GodModeOwnableUpgradeable__factory = await ethers.getContractFactory(
    "GodModeOwnableUpgradeable",
  );
  const ownableUpgradeable: GodModeOwnableUpgradeable = <GodModeOwnableUpgradeable>(
    await upgrades.deployProxy(ownableUpgradeableFactory)
  );
  await ownableUpgradeable.deployed();
  return ownableUpgradeable;
}

export async function deployUsdc(deployer: Signer): Promise<GodModeErc20> {
  const godModeErc20Artifact: Artifact = await artifacts.readArtifact("GodModeErc20");
  const usdc: GodModeErc20 = <GodModeErc20>(
    await deployContract(deployer, godModeErc20Artifact, [USDC_NAME, USDC_SYMBOL, USDC_DECIMALS], overrides)
  );
  return usdc;
}

export async function deployUsdcPriceFeed(deployer: Signer): Promise<SimplePriceFeed> {
  const simplePriceFeedArtifact: Artifact = await artifacts.readArtifact("SimplePriceFeed");
  const usdcPriceFeed: SimplePriceFeed = <SimplePriceFeed>(
    await deployContract(deployer, simplePriceFeedArtifact, ["USDC/USD"], overrides)
  );
  await usdcPriceFeed.setPrice(price("1"));
  return usdcPriceFeed;
}

export async function deployWbtc(deployer: Signer): Promise<GodModeErc20> {
  const godModeErc20Artifact: Artifact = await artifacts.readArtifact("GodModeErc20");
  const usdc: GodModeErc20 = <GodModeErc20>(
    await deployContract(deployer, godModeErc20Artifact, [WBTC_NAME, WBTC_SYMBOL, WBTC_DECIMALS], overrides)
  );
  return usdc;
}

export async function deployWbtcPriceFeed(deployer: Signer): Promise<SimplePriceFeed> {
  const simplePriceFeedArtifact: Artifact = await artifacts.readArtifact("SimplePriceFeed");
  const wbtcPriceFeed: SimplePriceFeed = <SimplePriceFeed>(
    await deployContract(deployer, simplePriceFeedArtifact, ["WBTC/USD"], overrides)
  );
  await wbtcPriceFeed.setPrice(WBTC_PRICE);
  return wbtcPriceFeed;
}
