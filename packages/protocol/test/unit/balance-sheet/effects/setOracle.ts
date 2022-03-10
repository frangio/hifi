import { AddressZero } from "@ethersproject/constants";
import { BalanceSheetErrors, OwnableUpgradeableErrors } from "@hifi/errors";
import { expect } from "chai";
import { MockContract } from "ethereum-waffle";

import { deployMockChainlinkOperator } from "../../../shared/mocks";

export function shouldBehaveLikeSetOracle(): void {
  context("when the caller is not the owner", function () {
    it("reverts", async function () {
      await expect(this.contracts.balanceSheet.connect(this.signers.raider).setOracle(AddressZero)).to.be.revertedWith(
        OwnableUpgradeableErrors.NOT_OWNER,
      );
    });
  });

  context("when the caller is the owner", function () {
    context("when the oracle contract is the zero address", function () {
      it("reverts", async function () {
        await expect(this.contracts.balanceSheet.connect(this.signers.admin).setOracle(AddressZero)).to.be.revertedWith(
          BalanceSheetErrors.ORACLE_ZERO_ADDRESS,
        );
      });
    });

    context("when the oracle contract is not the zero address", function () {
      let newOracle: MockContract;

      beforeEach(async function () {
        newOracle = await deployMockChainlinkOperator(this.signers.admin);
      });

      it("sets the new oracle contract", async function () {
        await this.contracts.balanceSheet.connect(this.signers.admin).setOracle(newOracle.address);
        const oracle: string = await this.contracts.balanceSheet.oracle();
        expect(oracle).to.equal(newOracle.address);
      });

      it("emits a SetOracle event", async function () {
        await expect(this.contracts.balanceSheet.connect(this.signers.admin).setOracle(newOracle.address))
          .to.emit(this.contracts.balanceSheet, "SetOracle")
          .withArgs(this.signers.admin.address, this.mocks.oracle.address, newOracle.address);
      });
    });
  });
}
