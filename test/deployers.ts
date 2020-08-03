import { Wallet } from "@ethersproject/wallet";
import { deployContract } from "ethereum-waffle";

import Erc20Artifact from "../artifacts/Erc20.json";
import FintrollerArtifact from "../artifacts/Fintroller.json";
import GuarantorPoolArtifact from "../artifacts/GuarantorPool.json";
import YTokenArtifact from "../artifacts/YToken.json";

import { Erc20 } from "../typechain/Erc20";
import { Fintroller } from "../typechain/Fintroller";
import { GuarantorPool } from "../typechain/GuarantorPool";
import { YToken } from "../typechain/YToken";

/**
 * Throughout this file, we use "as unknown" a couple of times. Refer to the URL for more information.
 * https://bit.ly/3i7mxrh
 */

export async function deployFintroller(this: Mocha.Context, deployer: Wallet): Promise<void> {
  this.fintroller = ((await deployContract(deployer, FintrollerArtifact, [])) as unknown) as Fintroller;
}

export async function deployUnderlying(this: Mocha.Context, deployer: Wallet): Promise<void> {
  this.underlying = ((await deployContract(deployer, Erc20Artifact, [
    this.scenario.underlying.name,
    this.scenario.underlying.symbol,
    this.scenario.underlying.decimals,
  ])) as unknown) as Erc20;
}

export async function deployCollateral(this: Mocha.Context, deployer: Wallet): Promise<void> {
  this.collateral = ((await deployContract(deployer, Erc20Artifact, [
    this.scenario.collateral.name,
    this.scenario.collateral.symbol,
    this.scenario.collateral.decimals,
  ])) as unknown) as Erc20;
}

export async function deployGuarantorPool(this: Mocha.Context, deployer: Wallet): Promise<void> {
  this.guarantorPool = ((await deployContract(deployer, GuarantorPoolArtifact, [
    this.scenario.guarantorPool.name,
    this.scenario.guarantorPool.symbol,
    this.scenario.guarantorPool.decimals,
  ])) as unknown) as GuarantorPool;
}

export async function deployYToken(this: Mocha.Context, deployer: Wallet): Promise<void> {
  await deployUnderlying.call(this, deployer);
  await deployCollateral.call(this, deployer);
  await deployGuarantorPool.call(this, deployer);

  this.yToken = ((await deployContract(deployer, YTokenArtifact, [
    this.scenario.yToken.name,
    this.scenario.yToken.symbol,
    this.scenario.yToken.decimals,
    this.fintroller.address,
    this.underlying.address,
    this.collateral.address,
    this.guarantorPool.address,
    this.scenario.yToken.expirationTime,
  ])) as unknown) as YToken;
}
