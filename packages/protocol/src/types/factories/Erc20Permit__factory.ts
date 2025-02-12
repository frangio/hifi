/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Erc20Permit, Erc20PermitInterface } from "../Erc20Permit";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "Erc20Permit__InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20Permit__OwnerZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "Erc20Permit__PermitExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20Permit__RecoveredOwnerZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20Permit__SpenderZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20__ApproveOwnerZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20__ApproveSpenderZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Erc20__InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "senderBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Erc20__InsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20__TransferRecipientZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Erc20__TransferSenderZeroAddress",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
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
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedAmount",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedAmount",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b5060405162000f0c38038062000f0c83398101604081905262000034916200029f565b82828282600090805190602001906200004f9291906200012c565b508151620000659060019060208501906200012c565b5060ff16608052505060405146907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f90620000a39060009062000361565b60408051918290038220828201825260018352603160f81b6020938401528151928301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc66060820152608081018290523060a082015260c00160408051601f19818403018152919052805160209091012060a052506200040592505050565b8280546200013a9062000324565b90600052602060002090601f0160209004810192826200015e5760008555620001a9565b82601f106200017957805160ff1916838001178555620001a9565b82800160010185558215620001a9579182015b82811115620001a95782518255916020019190600101906200018c565b50620001b7929150620001bb565b5090565b5b80821115620001b75760008155600101620001bc565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001fa57600080fd5b81516001600160401b0380821115620002175762000217620001d2565b604051601f8301601f19908116603f01168101908282118183101715620002425762000242620001d2565b816040528381526020925086838588010111156200025f57600080fd5b600091505b8382101562000283578582018301518183018401529082019062000264565b83821115620002955760008385830101525b9695505050505050565b600080600060608486031215620002b557600080fd5b83516001600160401b0380821115620002cd57600080fd5b620002db87838801620001e8565b94506020860151915080821115620002f257600080fd5b506200030186828701620001e8565b925050604084015160ff811681146200031957600080fd5b809150509250925092565b600181811c908216806200033957607f821691505b602082108114156200035b57634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c9150808316806200037e57607f831692505b60208084108214156200039f57634e487b7160e01b86526022600452602486fd5b818015620003b65760018114620003c857620003f7565b60ff19861689528489019650620003f7565b60008a81526020902060005b86811015620003ef5781548b820152908501908301620003d4565b505084890196505b509498975050505050505050565b60805160a051610ada62000432600039600081816101d501526105a80152600061019c0152610ada6000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806354fd4d5011610097578063a457c2d711610066578063a457c2d71461027b578063a9059cbb1461028e578063d505accf146102a1578063dd62ed3e146102b657600080fd5b806354fd4d501461020a57806370a082311461022a5780637ecebe001461025357806395d89b411461027357600080fd5b806330adf81f116100d357806330adf81f14610170578063313ce567146101975780633644e515146101d057806339509351146101f757600080fd5b806306fdde0314610105578063095ea7b31461012357806318160ddd1461014657806323b872dd1461015d575b600080fd5b61010d6102ef565b60405161011a91906108ae565b60405180910390f35b61013661013136600461091f565b61037d565b604051901515815260200161011a565b61014f60025481565b60405190815260200161011a565b61013661016b366004610949565b610393565b61014f7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b6101be7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff909116815260200161011a565b61014f7f000000000000000000000000000000000000000000000000000000000000000081565b61013661020536600461091f565b61040c565b61010d604051806040016040528060018152602001603160f81b81525081565b61014f610238366004610985565b6001600160a01b031660009081526003602052604090205490565b61014f610261366004610985565b60056020526000908152604090205481565b61010d610454565b61013661028936600461091f565b610461565b61013661029c36600461091f565b610492565b6102b46102af3660046109a7565b61049f565b005b61014f6102c4366004610a1a565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205490565b600080546102fc90610a4d565b80601f016020809104026020016040519081016040528092919081815260200182805461032890610a4d565b80156103755780601f1061034a57610100808354040283529160200191610375565b820191906000526020600020905b81548152906001019060200180831161035857829003601f168201915b505050505081565b600061038a3384846106dc565b50600192915050565b60006103a084848461078b565b6001600160a01b0384166000908152600460209081526040808320338452909152902054828110156103f457604051632b3ca6f360e11b815260048101829052602481018490526044015b60405180910390fd5b61040185338584036106dc565b506001949350505050565b3360009081526004602090815260408083206001600160a01b0386168452909152812054819061043d908490610a9e565b905061044a3385836106dc565b5060019392505050565b600180546102fc90610a4d565b3360009081526004602090815260408083206001600160a01b0386168452909152812054819061043d908490610ab6565b600061038a33848461078b565b6001600160a01b0387166104c65760405163bc622b6360e01b815260040160405180910390fd5b6001600160a01b0386166104ed57604051632853494b60e11b815260040160405180910390fd5b428410156105115760405163212ed8bb60e11b8152600481018590526024016103eb565b6001600160a01b0387811660008181526005602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958c166060860152608085018b905260a085019590955260c08085018a90528151808603909101815260e08501825280519083012061190160f01b6101008601527f000000000000000000000000000000000000000000000000000000000000000061010286015261012280860182905282518087039091018152610142860180845281519185019190912090859052610162860180845281905260ff8a166101828701526101a286018990526101c2860188905291519095919491926101e2808401939192601f1981019281900390910190855afa15801561064c573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661068057604051630f81234f60e31b815260040160405180910390fd5b896001600160a01b0316816001600160a01b0316146106c557604051630b76193960e31b815260ff8716600482015260248101869052604481018590526064016103eb565b6106d08a8a8a6106dc565b50505050505050505050565b6001600160a01b0383166107035760405163230326bf60e11b815260040160405180910390fd5b6001600160a01b03821661072a57604051630b39ecd960e21b815260040160405180910390fd5b6001600160a01b0383811660008181526004602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166107b25760405163907bfbd760e01b815260040160405180910390fd5b6001600160a01b0382166107d957604051637184c13f60e01b815260040160405180910390fd5b6001600160a01b0383166000908152600360205260409020548181101561081d57604051632dcf2e2160e21b815260048101829052602481018390526044016103eb565b6001600160a01b03808516600090815260036020526040808220858503905591851681529081208054849290610854908490610a9e565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516108a091815260200190565b60405180910390a350505050565b600060208083528351808285015260005b818110156108db578581018301518582016040015282016108bf565b818111156108ed576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461091a57600080fd5b919050565b6000806040838503121561093257600080fd5b61093b83610903565b946020939093013593505050565b60008060006060848603121561095e57600080fd5b61096784610903565b925061097560208501610903565b9150604084013590509250925092565b60006020828403121561099757600080fd5b6109a082610903565b9392505050565b600080600080600080600060e0888a0312156109c257600080fd5b6109cb88610903565b96506109d960208901610903565b95506040880135945060608801359350608088013560ff811681146109fd57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610a2d57600080fd5b610a3683610903565b9150610a4460208401610903565b90509250929050565b600181811c90821680610a6157607f821691505b60208210811415610a8257634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610ab157610ab1610a88565b500190565b600082821015610ac857610ac8610a88565b50039056fea164736f6c634300080c000a";

type Erc20PermitConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Erc20PermitConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Erc20Permit__factory extends ContractFactory {
  constructor(...args: Erc20PermitConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Erc20Permit";
  }

  deploy(
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Erc20Permit> {
    return super.deploy(
      _name,
      _symbol,
      _decimals,
      overrides || {}
    ) as Promise<Erc20Permit>;
  }
  getDeployTransaction(
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _decimals,
      overrides || {}
    );
  }
  attach(address: string): Erc20Permit {
    return super.attach(address) as Erc20Permit;
  }
  connect(signer: Signer): Erc20Permit__factory {
    return super.connect(signer) as Erc20Permit__factory;
  }
  static readonly contractName: "Erc20Permit";
  public readonly contractName: "Erc20Permit";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Erc20PermitInterface {
    return new utils.Interface(_abi) as Erc20PermitInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Erc20Permit {
    return new Contract(address, _abi, signerOrProvider) as Erc20Permit;
  }
}
