/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Fintroller, FintrollerInterface } from "../Fintroller";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
    ],
    name: "Fintroller__BondNotListed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "Fintroller__CollateralDecimalsOverflow",
    type: "error",
  },
  {
    inputs: [],
    name: "Fintroller__CollateralDecimalsZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
    ],
    name: "Fintroller__CollateralNotListed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newCollateralRatio",
        type: "uint256",
      },
    ],
    name: "Fintroller__CollateralRatioOverflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newCollateralRatio",
        type: "uint256",
      },
    ],
    name: "Fintroller__CollateralRatioUnderflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newDebtCeiling",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
    ],
    name: "Fintroller__DebtCeilingUnderflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newLiquidationIncentive",
        type: "uint256",
      },
    ],
    name: "Fintroller__LiquidationIncentiveOverflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newLiquidationIncentive",
        type: "uint256",
      },
    ],
    name: "Fintroller__LiquidationIncentiveUnderflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__OwnerZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
    ],
    name: "ListBond",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
    ],
    name: "ListCollateral",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "SetBorrowAllowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldCollateralCeiling",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newCollateralCeiling",
        type: "uint256",
      },
    ],
    name: "SetCollateralCeiling",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldCollateralRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newCollateralRatio",
        type: "uint256",
      },
    ],
    name: "SetCollateralRatio",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldDebtCeiling",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newDebtCeiling",
        type: "uint256",
      },
    ],
    name: "SetDebtCeiling",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "SetDepositCollateralAllowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "SetDepositUnderlyingAllowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "SetLiquidateBorrowAllowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldLiquidationIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newLiquidationIncentive",
        type: "uint256",
      },
    ],
    name: "SetLiquidationIncentive",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldMaxBonds",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newMaxBonds",
        type: "uint256",
      },
    ],
    name: "SetMaxBonds",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "SetRedeemAllowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "SetRepayBorrowAllowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "TransferOwnership",
    type: "event",
  },
  {
    inputs: [],
    name: "_renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "_transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "hToken",
        type: "address",
      },
    ],
    name: "getBond",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "debtCeiling",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isBorrowAllowed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isDepositUnderlyingAllowed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isLiquidateBorrowAllowed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isListed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isRedeemHTokenAllowed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isRepayBorrowAllowed",
            type: "bool",
          },
        ],
        internalType: "struct IFintroller.Bond",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
    ],
    name: "getBorrowAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
    ],
    name: "getCollateral",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ceiling",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ratio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "liquidationIncentive",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isDepositCollateralAllowed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isListed",
            type: "bool",
          },
        ],
        internalType: "struct IFintroller.Collateral",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
    ],
    name: "getCollateralCeiling",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
    ],
    name: "getCollateralRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
    ],
    name: "getDebtCeiling",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
    ],
    name: "getDepositCollateralAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
    ],
    name: "getDepositUnderlyingAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
    ],
    name: "getLiquidateBorrowAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
    ],
    name: "getLiquidationIncentive",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
    ],
    name: "getRepayBorrowAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
    ],
    name: "isBondListed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
    ],
    name: "isCollateralListed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
    ],
    name: "listBond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
    ],
    name: "listCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBonds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "setBorrowAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "collateral",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newCollateralCeiling",
        type: "uint256",
      },
    ],
    name: "setCollateralCeiling",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newCollateralRatio",
        type: "uint256",
      },
    ],
    name: "setCollateralRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newDebtCeiling",
        type: "uint256",
      },
    ],
    name: "setDebtCeiling",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "setDepositCollateralAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "setDepositUnderlyingAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "setLiquidateBorrowAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IErc20",
        name: "collateral",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newLiquidationIncentive",
        type: "uint256",
      },
    ],
    name: "setLiquidationIncentive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMaxBonds",
        type: "uint256",
      },
    ],
    name: "setMaxBonds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHToken",
        name: "bond",
        type: "address",
      },
      {
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "setRepayBorrowAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b031916339081178255604051909182917f5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c908290a350600a600155611928806100666000396000f3fe608060405234801561001057600080fd5b50600436106101cf5760003560e01c80638da5cb5b11610104578063c0273a21116100a2578063d686e9ee11610071578063d686e9ee146105dc578063e3ee6e4714610608578063e60f077314610611578063fd0ff4b91461062457600080fd5b8063c0273a2114610590578063ce8f6d3e146105a3578063d29d44ee146105b6578063d59f3f53146105c957600080fd5b80639d738556116100de5780639d7385561461052e578063aeb4fcc114610557578063b60b82571461056a578063bb23ffec1461057d57600080fd5b80638da5cb5b146104975780639b56d6c9146104c25780639bd8f6e81461051b57600080fd5b806342a4e0641161017157806363efc2281161014b57806363efc228146104285780637922911f1461045e57806381a7bc97146104715780638559d20d1461048457600080fd5b806342a4e064146103fa5780634b3f28891461040d5780635054d1501461041557600080fd5b806315a3ba43116101ad57806315a3ba431461033f578063227661cb14610379578063298f7b181461038c5780633c798109146103d157600080fd5b806302b5bda7146101d457806305e18c9d146101e95780630d8912f3146101fc575b600080fd5b6101e76101e2366004611841565b610637565b005b6101e76101f7366004611876565b610741565b6102d461020a36600461188f565b6040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810191909152506001600160a01b0316600090815260026020908152604091829020825160e0810184528154815260019091015460ff808216151593830193909352610100810483161515938201939093526201000083048216151560608201526301000000830482161515608082015264010000000083048216151560a08201526501000000000090920416151560c082015290565b6040516103369190600060e0820190508251825260208301511515602083015260408301511515604083015260608301511515606083015260808301511515608083015260a0830151151560a083015260c0830151151560c083015292915050565b60405180910390f35b61036b61034d36600461188f565b6001600160a01b031660009081526003602052604090206001015490565b604051908152602001610336565b6101e7610387366004611841565b6107d5565b6103c161039a36600461188f565b6001600160a01b031660009081526003602081905260409091200154610100900460ff1690565b6040519015158152602001610336565b61036b6103df36600461188f565b6001600160a01b031660009081526002602052604090205490565b6101e7610408366004611841565b6108c7565b6101e76109be565b6103c161042336600461188f565b610a55565b6103c161043636600461188f565b6001600160a01b03166000908152600260205260409020600101546301000000900460ff1690565b6101e761046c366004611841565b610aca565b6103c161047f36600461188f565b610bb8565b6101e761049236600461188f565b610c28565b6000546104aa906001600160a01b031681565b6040516001600160a01b039091168152602001610336565b6104d56104d036600461188f565b610d7e565b6040516103369190600060a08201905082518252602083015160208301526040830151604083015260608301511515606083015260808301511515608083015292915050565b6101e76105293660046118b3565b610e14565b61036b61053c36600461188f565b6001600160a01b031660009081526003602052604090205490565b6101e76105653660046118b3565b610f66565b6101e76105783660046118b3565b6110f3565b6103c161058b36600461188f565b6111ed565b6101e761059e36600461188f565b611263565b6103c16105b136600461188f565b611415565b6101e76105c436600461188f565b611484565b6101e76105d7366004611841565b611553565b61036b6105ea36600461188f565b6001600160a01b031660009081526003602052604090206002015490565b61036b60015481565b6103c161061f36600461188f565b611652565b6101e76106323660046118b3565b6116cb565b6000546001600160a01b0316331461067c5760005460405163cc6bdb1d60e01b81526001600160a01b0390911660048201523360248201526044015b60405180910390fd5b6001600160a01b0382166000908152600260205260409020600101546301000000900460ff166106ca5760405163216a460f60e11b81526001600160a01b0383166004820152602401610673565b6001600160a01b038083166000818152600260205260408082206001018054861515620100000262ff00001990911617905590549051919216907f71dc0d35e1b9ee171f1b8ac9511d05e460ed7416cc401fe4d33978c44f1ca35b9061073590851515815260200190565b60405180910390a35050565b6000546001600160a01b031633146107815760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b600180549082905560005460408051838152602081018590526001600160a01b03909216917ffdc6136113b0185cc0d7209bef28516dcabeae2ebd769f707fcf8710e5656567910160405180910390a25050565b6000546001600160a01b031633146108155760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6001600160a01b0382166000908152600260205260409020600101546301000000900460ff166108635760405163216a460f60e11b81526001600160a01b0383166004820152602401610673565b6001600160a01b03808316600081815260026020526040808220600101805486151560ff1990911617905590549051919216907fb415ca45b135e3d2eb232571276198ac50330743ec23e7745c78a5b78a0a1b519061073590851515815260200190565b6000546001600160a01b031633146109075760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6001600160a01b0382166000908152600260205260409020600101546301000000900460ff166109555760405163216a460f60e11b81526001600160a01b0383166004820152602401610673565b6001600160a01b0380831660008181526002602052604080822060010180548615156101000261ff001990911617905590549051919216907fc55893173627fb718b33144ccc6045fe1b2be87d4f4ab1b4e0460abbfe617c5f9061073590851515815260200190565b6000546001600160a01b031633146109fe5760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b600080546040516001600160a01b03909116907f5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c908390a36000805473ffffffffffffffffffffffffffffffffffffffff19169055565b6001600160a01b0381166000908152600260205260408120600101546301000000900460ff16610aa35760405163216a460f60e11b81526001600160a01b0383166004820152602401610673565b506001600160a01b0316600090815260026020526040902060010154610100900460ff1690565b6000546001600160a01b03163314610b0a5760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6001600160a01b03821660009081526003602081905260409091200154610100900460ff16610b5757604051630141c9a760e01b81526001600160a01b0383166004820152602401610673565b6001600160a01b038281166000818152600360208181526040808420909201805460ff191687151590811790915592549151928352929316917f0f3b9071297b60393e9906170c1e2262c9f49e48683463c2268e6b2214a02c829101610735565b6001600160a01b0381166000908152600260205260408120600101546301000000900460ff16610c065760405163216a460f60e11b81526001600160a01b0383166004820152602401610673565b506001600160a01b031660009081526002602052604090206001015460ff1690565b6000546001600160a01b03163314610c685760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6040805160e081018252600080825260016020808401828152848601838152606086018481526080870185815260a0880186815260c089018781526001600160a01b038c8116808b5260029098528b8a209a518b5595519990970180549451935192519151975161ffff1990951699151561ff00191699909917610100931515939093029290921763ffff00001916620100009115159190910263ff0000001916176301000000911515919091021765ffff0000000019166401000000009415159490940265ff000000000019169390931765010000000000931515939093029290921790935581549351929316917fd81bca3d01ee48c675a3635409a0de9f165d21de38d1b30566de2b764b96cd129190a350565b610db46040518060a001604052806000815260200160008152602001600081526020016000151581526020016000151581525090565b506001600160a01b0316600090815260036020818152604092839020835160a0810185528154815260018201549281019290925260028101549382019390935291015460ff80821615156060840152610100909104161515608082015290565b6000546001600160a01b03163314610e545760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6001600160a01b03821660009081526003602081905260409091200154610100900460ff16610ea157604051630141c9a760e01b81526001600160a01b0383166004820152602401610673565b6714d1120d7b160000811115610ecd5760405163ba4e26f960e01b815260048101829052602401610673565b670de0b6b3a7640000811015610ef957604051633c292c4d60e11b815260048101829052602401610673565b6001600160a01b038281166000818152600360209081526040808320600201805490879055925481519485529184018390528301859052909216907f344a32babe164e447da4243dd7af4572ba3e0db01b3644c0fca84ecfb3e66c9f9060600160405180910390a2505050565b6000546001600160a01b03163314610fa65760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6001600160a01b0382166000908152600260205260409020600101546301000000900460ff16610ff45760405163216a460f60e11b81526001600160a01b0383166004820152602401610673565b6000826001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611034573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061105891906118df565b90508082101561108557604051635a6bd6d160e01b81526004810183905260248101829052604401610673565b6001600160a01b0380841660008181526002602052604080822080549087905591549051919316907f722c25b91b159fac5bf2699329b2651dcbf7e2e9470fb0261243e801b9d271b3906110e59085908890918252602082015260400190565b60405180910390a350505050565b6000546001600160a01b031633146111335760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6001600160a01b03821660009081526003602081905260409091200154610100900460ff1661118057604051630141c9a760e01b81526001600160a01b0383166004820152602401610673565b6001600160a01b0380831660008181526003602052604080822080549086905591549051919316907f1bb3ad18b0ca1c3aed435a2d1b4caf5ecce0ef121e229a73034dd22815703d4c906111e09085908790918252602082015260400190565b60405180910390a3505050565b6001600160a01b0381166000908152600260205260408120600101546301000000900460ff1661123b5760405163216a460f60e11b81526001600160a01b0383166004820152602401610673565b506001600160a01b031660009081526002602052604090206001015462010000900460ff1690565b6000546001600160a01b031633146112a35760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6000816001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156112e3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061130791906118f8565b60ff1690508061132a576040516314a5ea3560e11b815260040160405180910390fd5b601281111561134f576040516315432fa560e21b815260048101829052602401610673565b6040805160a08101825260008082526714d1120d7b1600006020808401918252670f43fc2c04ee0000848601908152600160608601818152608087018281526001600160a01b038b81168089526003968790528a892099518a559651938901939093559251600288015551959092018054915161ffff1990921695151561ff001916959095176101009115159190910217909355815493519093909216917f6232505455ee4aa22dab92c1da7c3890a53b8f120c0c4e759173b9e33446e2e09190a35050565b6001600160a01b038116600090815260036020819052604082200154610100900460ff1661146157604051630141c9a760e01b81526001600160a01b0383166004820152602401610673565b506001600160a01b03166000908152600360208190526040909120015460ff1690565b6000546001600160a01b031633146114c45760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6001600160a01b0381166114eb57604051634208fc5d60e01b815260040160405180910390fd5b600080546040516001600160a01b03808516939216917f5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c91a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6000546001600160a01b031633146115935760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6001600160a01b0382166000908152600260205260409020600101546301000000900460ff166115e15760405163216a460f60e11b81526001600160a01b0383166004820152602401610673565b6001600160a01b038083166000818152600260205260408082206001018054861515650100000000000265ff00000000001990911617905590549051919216907f10424d34f926d4dd41e2f901147ab7b042eac6bf6d1e86205bce22c3744cc4269061073590851515815260200190565b6001600160a01b0381166000908152600260205260408120600101546301000000900460ff166116a05760405163216a460f60e11b81526001600160a01b0383166004820152602401610673565b506001600160a01b031660009081526002602052604090206001015465010000000000900460ff1690565b6000546001600160a01b0316331461170b5760005460405163cc6bdb1d60e01b81526001600160a01b039091166004820152336024820152604401610673565b6001600160a01b03821660009081526003602081905260409091200154610100900460ff1661175857604051630141c9a760e01b81526001600160a01b0383166004820152602401610673565b68056bc75e2d63100000811115611785576040516321acffb360e11b815260048101829052602401610673565b670de0b6b3a76400008110156117b157604051637444adfb60e11b815260048101829052602401610673565b6001600160a01b0380831660008181526003602052604080822060010180549086905591549051919316907f3352e03805e9a22af9ab02ba260864857143dc41b53213d78e1451b98d472ee4906111e09085908790918252602082015260400190565b6001600160a01b038116811461182957600080fd5b50565b8035801515811461183c57600080fd5b919050565b6000806040838503121561185457600080fd5b823561185f81611814565b915061186d6020840161182c565b90509250929050565b60006020828403121561188857600080fd5b5035919050565b6000602082840312156118a157600080fd5b81356118ac81611814565b9392505050565b600080604083850312156118c657600080fd5b82356118d181611814565b946020939093013593505050565b6000602082840312156118f157600080fd5b5051919050565b60006020828403121561190a57600080fd5b815160ff811681146118ac57600080fdfea164736f6c634300080c000a";

type FintrollerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FintrollerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Fintroller__factory extends ContractFactory {
  constructor(...args: FintrollerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Fintroller";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Fintroller> {
    return super.deploy(overrides || {}) as Promise<Fintroller>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Fintroller {
    return super.attach(address) as Fintroller;
  }
  connect(signer: Signer): Fintroller__factory {
    return super.connect(signer) as Fintroller__factory;
  }
  static readonly contractName: "Fintroller";
  public readonly contractName: "Fintroller";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FintrollerInterface {
    return new utils.Interface(_abi) as FintrollerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Fintroller {
    return new Contract(address, _abi, signerOrProvider) as Fintroller;
  }
}
