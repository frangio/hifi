import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-packager";
import "solidity-coverage";

import "./tasks/deploy";
import "./tasks/prepare";

import { resolve } from "path";

import { GAS_LIMITS } from "@hifi/constants";
import { getChainConfig, getEnvVar } from "@hifi/helpers";
import { config as dotenvConfig } from "dotenv";
import type { HardhatUserConfig } from "hardhat/types";

dotenvConfig({ path: resolve(__dirname, "..", "..", ".env") });

const infuraApiKey: string = getEnvVar("INFURA_API_KEY");
const mnemonic: string = getEnvVar("MNEMONIC");

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: {
      mainnet: getEnvVar("ETHERSCAN_API_KEY"),
      goerli: getEnvVar("ETHERSCAN_API_KEY"),
      polygon: getEnvVar("POLYGONSCAN_API_KEY"),
      rinkeby: getEnvVar("ETHERSCAN_API_KEY"),
      ropsten: getEnvVar("ETHERSCAN_API_KEY"),
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: ["GodModeErc20", "SimplePriceFeed", "StablecoinPriceFeed"],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
      },
      allowUnlimitedContractSize: true,
      blockGasLimit: GAS_LIMITS.hardhat.toNumber(),
      gas: GAS_LIMITS.hardhat.toNumber(), // https://github.com/nomiclabs/hardhat/issues/660#issuecomment-715897156
    },
    localhost: {
      accounts: {
        mnemonic,
      },
      url: "http://localhost:8545",
    },
    goerli: getChainConfig("goerli", infuraApiKey, mnemonic),
    "polygon-mainnet": getChainConfig("polygon-mainnet", infuraApiKey, mnemonic),
    rinkeby: getChainConfig("rinkeby", infuraApiKey, mnemonic),
    ropsten: getChainConfig("ropsten", infuraApiKey, mnemonic),
  },
  packager: {
    contracts: [
      "BalanceSheetV2",
      "ChainlinkOperator",
      "Erc20",
      "Erc20Permit",
      "Fintroller",
      "HToken",
      "IAggregatorV3",
      "IBalanceSheetV2",
      "IChainlinkOperator",
      "IErc20",
      "IErc20Permit",
      "IFintroller",
      "IHToken",
      "IOwnable",
      "IOwnableUpgradeable",
      "Ownable",
      "OwnableUpgradeable",
      "SimplePriceFeed",
      "StablecoinPriceFeed",
    ],
    includeFactories: true,
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.12",
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
};

export default config;
