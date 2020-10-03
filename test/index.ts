import { Signer } from "@ethersproject/abstract-signer";
import { Wallet } from "@ethersproject/wallet";
import { ethers, waffle } from "@nomiclabs/buidler";

import { Accounts, Contracts, Signers, Stubs } from "../@types/index";
import { testBalanceSheet } from "./units/balanceSheet/BalanceSheet";
import { testErc20Permit } from "./units/erc20Permit/Erc20Permit";
import { testFintroller } from "./units/fintroller/Fintroller";
import { testRedemptionPool } from "./units/redemptionPool/RedemptionPool";
import { testYToken } from "./units/yToken/YToken";

const { createFixtureLoader } = waffle;

describe("Unit Tests", function () {
  before(async function () {
    this.accounts = {} as Accounts;
    this.contracts = {} as Contracts;
    this.signers = {} as Signers;
    this.stubs = {} as Stubs;

    const signers: Signer[] = await ethers.getSigners();
    /* Delete this when https://github.com/nomiclabs/buidler/issues/849 gets fixed. */
    this.loadFixture = createFixtureLoader(signers as Wallet[]);

    this.signers.admin = signers[0];
    this.signers.brad = signers[1];
    this.signers.eve = signers[2];
    this.signers.grace = signers[3];
    this.signers.lucy = signers[4];
    this.signers.mark = signers[5];

    this.accounts.admin = await signers[0].getAddress();
    this.accounts.brad = await signers[1].getAddress();
    this.accounts.eve = await signers[2].getAddress();
    this.accounts.grace = await signers[3].getAddress();
    this.accounts.lucy = await signers[4].getAddress();
    this.accounts.mark = await signers[5].getAddress();
  });

  testBalanceSheet();
  testErc20Permit();
  testFintroller();
  testRedemptionPool();
  testYToken();
});
