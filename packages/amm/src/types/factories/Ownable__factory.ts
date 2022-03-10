/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Ownable, OwnableInterface } from "../Ownable";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b031916339081178255604051909182917f5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c908290a35061023a806100616000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80634b3f2889146100465780638da5cb5b14610050578063d29d44ee1461007f575b600080fd5b61004e610092565b005b600054610063906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61004e61008d3660046101fd565b61012e565b6000546001600160a01b031633146100d75760005460405163cc6bdb1d60e01b81526001600160a01b0390911660048201523360248201526044015b60405180910390fd5b600080546040516001600160a01b03909116907f5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c908390a36000805473ffffffffffffffffffffffffffffffffffffffff19169055565b6000546001600160a01b0316331461016e5760005460405163cc6bdb1d60e01b81526001600160a01b0390911660048201523360248201526044016100ce565b6001600160a01b03811661019557604051634208fc5d60e01b815260040160405180910390fd5b600080546040516001600160a01b03808516939216917f5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c91a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b60006020828403121561020f57600080fd5b81356001600160a01b038116811461022657600080fd5b939250505056fea164736f6c634300080c000a";

type OwnableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwnableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Ownable__factory extends ContractFactory {
  constructor(...args: OwnableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Ownable";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Ownable> {
    return super.deploy(overrides || {}) as Promise<Ownable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Ownable {
    return super.attach(address) as Ownable;
  }
  connect(signer: Signer): Ownable__factory {
    return super.connect(signer) as Ownable__factory;
  }
  static readonly contractName: "Ownable";
  public readonly contractName: "Ownable";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwnableInterface {
    return new utils.Interface(_abi) as OwnableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Ownable {
    return new Contract(address, _abi, signerOrProvider) as Ownable;
  }
}
