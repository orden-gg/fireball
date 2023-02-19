import { AavegotchiDiamond } from '../../generated/AavegotchiDiamond/AavegotchiDiamond';

import { ERC721Listing } from '../../generated/schema';
import { BigInt, ethereum } from '@graphprotocol/graph-ts';

export function laodOrCreateERC721Listing(id: string, createIfNotFound: boolean = true): ERC721Listing {
  let listing = ERC721Listing.load(id);

  // eslint-disable-next-line
  if (listing == null && createIfNotFound) {
    listing = new ERC721Listing(id);
    listing.blockCreated = BigInt.zero();
    listing.timeCreated = BigInt.zero();
  }

  return listing as ERC721Listing;
}

export function updateERC721ListingInfo(
  listing: ERC721Listing,
  listingID: BigInt,
  event: ethereum.Event
): ERC721Listing {
  const contract = AavegotchiDiamond.bind(event.address);
  const response = contract.try_getERC721Listing(listingID);

  if (!response.reverted) {
    const listingInfo = response.value;
    listing.category = listingInfo.category;
    listing.erc721TokenAddress = listingInfo.erc721TokenAddress;
    listing.tokenId = listingInfo.erc721TokenId;
    listing.seller = listingInfo.seller;
    listing.timeCreated = listingInfo.timeCreated;
    listing.timePurchased = listingInfo.timePurchased;
    listing.priceInWei = listingInfo.priceInWei;
    listing.cancelled = listingInfo.cancelled;

    if (listing.blockCreated.equals(BigInt.zero())) {
      listing.blockCreated = event.block.number;
    }
  } else {
    // log.warning('Listing {} couldnt be updated at block: {} tx_hash: {}', [
    //   listingID.toString(),
    //   event.block.number.toString(),
    //   event.transaction.hash.toHexString()
    // ]);
  }

  return listing as ERC721Listing;
}
