import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ItemListed as ItemListedEvent,
  NFTBought as NFTBoughtEvent,
  NFTSold as NFTSoldEvent,
  listingCancelled as listingCancelledEvent,
} from "../generated/NftMarketPlace/NftMarketPlace"
import {
  ItemListed,
  NFTBought,
  NFTSold,
  listingCancelled,
  ActiveItem,
} from "../generated/schema"

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )
  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
  }

  itemListed.nftAddress = event.params.nftAddress
  activeItem.nftAddress = event.params.nftAddress

  itemListed.price = event.params.price
  activeItem.price = event.params.price

  itemListed.tokenId = event.params.tokenId
  activeItem.tokenId = event.params.tokenId

  itemListed.owner = event.params.owner
  activeItem.owner = event.params.owner

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  )

  itemListed.save()
  activeItem.save()
}

export function handleNFTBought(event: NFTBoughtEvent): void {
  let nftBought = NFTBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )
  if (!nftBought) {
    nftBought = new NFTBought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
  }
  nftBought.buyer = event.params.buyer
  nftBought.nftAddress = event.params.nftAddress

  nftBought.price = event.params.price
  nftBought.tokenId = event.params.tokenId

  activeItem!.buyer = event.params.buyer

  nftBought.save()
  activeItem!.save()
}

export function handleNFTSold(event: NFTSoldEvent): void {}

export function handlelistingCancelled(event: listingCancelledEvent): void {
  let itemCancelled = listingCancelled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  )
  if (!itemCancelled) {
    itemCancelled = new listingCancelled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )
  }
  itemCancelled.owner = event.params.owner
  itemCancelled.nftAddress = event.params.nftAddress
  itemCancelled.tokenId = event.params.tokenId
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  )

  itemCancelled.save()
  activeItem!.save()
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString()
}
