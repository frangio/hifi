# Hifi AMM ![npm (scoped)](https://img.shields.io/npm/v/@hifi/amm)

Dedicated AMM for market-making hTokens, based on the [Yield Space](https://yield.is/YieldSpace.pdf) design.

The build artifacts can be browsed via [unpkg.com](https://unpkg.com/browse/@hifi/amm@latest/).

## Installation

With yarn:

```bash
$ yarn add @hifi/amm
```

Or npm:

```bash
$ npm install @hifi/amm
```

## Usage

The node package that you just installed contains both Solidity and JavaScript code. The former is the smart contracts
themselves; the latter, the smart contract ABIs and the TypeChain bindings.

### Solidity

The Hifi AMM can only be compiled with Solidity v0.8.4 and above, because we are reverting with [custom
errors](https://blog.soliditylang.org/2021/04/21/custom-errors/) instead of reason strings.

```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@hifi/amm/contracts/IHifiPool.sol";

contract YourContract {
    // Find the address on https://docs.hifi.finance
    IHifiPool hifiPool = IHifiPool(0x...);

    function getQuote(uint256 hTokenIn) external view returns (uint256 underlyingOut) {
        underlyingOut = hifiPool.getQuoteForSellingHToken(hTokenIn);
    }
}
```

### JavaScript

```javascript
import { parseUnits } from "@ethersproject/units";
import { getDefaultProvider } from "@ethersproject/providers";
import { HifiPool__factory } from "@hifi/amm/dist/types/factories/HifiPool__factory";

async function getQuote() {
  const hifiPoolABI = HifiPool__factory.abi;
  const defaultProvider = getDefaultProvider();
  const hifiPool = new HifiPool__factory("0x...", defaultProvider); // Find the address on https://docs.hifi.finance
  const hTokenIn = parseUnits("100", 18);
  const underlyingOut = await hifiPool.getQuoteForSellingHToken(hTokenIn);
}
```

## License

[LGPL v3](./LICENSE.md) © Mainframe Group Inc.
