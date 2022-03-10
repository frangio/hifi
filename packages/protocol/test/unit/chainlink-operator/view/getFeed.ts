import { AddressZero } from "@ethersproject/constants";
import { WBTC_SYMBOL } from "@hifi/constants";
import { expect } from "chai";

export function shouldBehaveLikeGetFeed(): void {
  context("when the feed is not set", function () {
    it("returns the default values", async function () {
      const feed = await this.contracts.oracle.getFeed("FOO");
      expect(feed[0]).to.equal(AddressZero); // asset
      expect(feed[1]).to.equal(AddressZero); // id
      expect(feed[2]).to.equal(false); // isSet
    });
  });

  context("when the feed is set", function () {
    beforeEach(async function () {
      await this.contracts.oracle
        .connect(this.signers.admin)
        .setFeed(this.mocks.wbtc.address, this.mocks.wbtcPriceFeed.address);
    });

    it("returns the storage properties of the feed", async function () {
      const feed = await this.contracts.oracle.getFeed(WBTC_SYMBOL);
      expect(feed[0]).to.equal(this.mocks.wbtc.address); // asset
      expect(feed[1]).to.equal(this.mocks.wbtcPriceFeed.address); // id
      expect(feed[2]).to.equal(true); // isSet
    });
  });
}
