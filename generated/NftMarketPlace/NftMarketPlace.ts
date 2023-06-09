// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ItemListed extends ethereum.Event {
  get params(): ItemListed__Params {
    return new ItemListed__Params(this);
  }
}

export class ItemListed__Params {
  _event: ItemListed;

  constructor(event: ItemListed) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get nftAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class NFTBought extends ethereum.Event {
  get params(): NFTBought__Params {
    return new NFTBought__Params(this);
  }
}

export class NFTBought__Params {
  _event: NFTBought;

  constructor(event: NFTBought) {
    this._event = event;
  }

  get buyer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get nftAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class NFTSold extends ethereum.Event {
  get params(): NFTSold__Params {
    return new NFTSold__Params(this);
  }
}

export class NFTSold__Params {
  _event: NFTSold;

  constructor(event: NFTSold) {
    this._event = event;
  }

  get seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class listingCancelled extends ethereum.Event {
  get params(): listingCancelled__Params {
    return new listingCancelled__Params(this);
  }
}

export class listingCancelled__Params {
  _event: listingCancelled;

  constructor(event: listingCancelled) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get nftAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class NftMarketPlace__getListingResultValue0Struct extends ethereum.Tuple {
  get price(): BigInt {
    return this[0].toBigInt();
  }

  get owner(): Address {
    return this[1].toAddress();
  }
}

export class NftMarketPlace extends ethereum.SmartContract {
  static bind(address: Address): NftMarketPlace {
    return new NftMarketPlace("NftMarketPlace", address);
  }

  getBalance(): BigInt {
    let result = super.call("getBalance", "getBalance():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getBalance(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getBalance", "getBalance():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getListing(
    nftAddress: Address,
    tokenId: BigInt
  ): NftMarketPlace__getListingResultValue0Struct {
    let result = super.call(
      "getListing",
      "getListing(address,uint256):((uint256,address))",
      [
        ethereum.Value.fromAddress(nftAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return changetype<NftMarketPlace__getListingResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getListing(
    nftAddress: Address,
    tokenId: BigInt
  ): ethereum.CallResult<NftMarketPlace__getListingResultValue0Struct> {
    let result = super.tryCall(
      "getListing",
      "getListing(address,uint256):((uint256,address))",
      [
        ethereum.Value.fromAddress(nftAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<NftMarketPlace__getListingResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  s_proceeds(param0: Address): BigInt {
    let result = super.call("s_proceeds", "s_proceeds(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_s_proceeds(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("s_proceeds", "s_proceeds(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class BuyNFTCall extends ethereum.Call {
  get inputs(): BuyNFTCall__Inputs {
    return new BuyNFTCall__Inputs(this);
  }

  get outputs(): BuyNFTCall__Outputs {
    return new BuyNFTCall__Outputs(this);
  }
}

export class BuyNFTCall__Inputs {
  _call: BuyNFTCall;

  constructor(call: BuyNFTCall) {
    this._call = call;
  }

  get nftAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class BuyNFTCall__Outputs {
  _call: BuyNFTCall;

  constructor(call: BuyNFTCall) {
    this._call = call;
  }
}

export class CancelListingCall extends ethereum.Call {
  get inputs(): CancelListingCall__Inputs {
    return new CancelListingCall__Inputs(this);
  }

  get outputs(): CancelListingCall__Outputs {
    return new CancelListingCall__Outputs(this);
  }
}

export class CancelListingCall__Inputs {
  _call: CancelListingCall;

  constructor(call: CancelListingCall) {
    this._call = call;
  }

  get nftAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CancelListingCall__Outputs {
  _call: CancelListingCall;

  constructor(call: CancelListingCall) {
    this._call = call;
  }
}

export class ListNFTCall extends ethereum.Call {
  get inputs(): ListNFTCall__Inputs {
    return new ListNFTCall__Inputs(this);
  }

  get outputs(): ListNFTCall__Outputs {
    return new ListNFTCall__Outputs(this);
  }
}

export class ListNFTCall__Inputs {
  _call: ListNFTCall;

  constructor(call: ListNFTCall) {
    this._call = call;
  }

  get nftAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get price(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ListNFTCall__Outputs {
  _call: ListNFTCall;

  constructor(call: ListNFTCall) {
    this._call = call;
  }
}

export class UpdateListingCall extends ethereum.Call {
  get inputs(): UpdateListingCall__Inputs {
    return new UpdateListingCall__Inputs(this);
  }

  get outputs(): UpdateListingCall__Outputs {
    return new UpdateListingCall__Outputs(this);
  }
}

export class UpdateListingCall__Inputs {
  _call: UpdateListingCall;

  constructor(call: UpdateListingCall) {
    this._call = call;
  }

  get nftAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get price(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class UpdateListingCall__Outputs {
  _call: UpdateListingCall;

  constructor(call: UpdateListingCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
