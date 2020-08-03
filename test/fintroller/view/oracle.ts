import { AddressZero } from "@ethersproject/constants";
import { expect } from "chai";

export default function shouldBehaveLikeOracleStorageGetter(): void {
  it("should retrieve the contract address of the oracle", async function () {
    const oracle = await this.fintroller.oracle();
    expect(oracle).to.be.equal(AddressZero);
  });
}
