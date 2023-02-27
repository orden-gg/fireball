import { BigInt } from '@graphprotocol/graph-ts';
import {
  ERC721ExecutedListing,
  ERC721ListingAdd,
  ERC721ListingCancelled,
  ERC721ListingRemoved
} from '../../generated/AavegotchiDiamond/AavegotchiDiamond';
import { laodOrCreateERC721Listing, loadOrCreateParcel, updateERC721ListingInfo } from '../helpers';
import { BIGINT_ONE } from '../shared/constants/common.constants';

export function handleERC721ListingAdd(event: ERC721ListingAdd): void {
  let listing = laodOrCreateERC721Listing(event.params.listingId.toString());
  listing = updateERC721ListingInfo(listing, event.params.listingId, event);

  // eslint-disable-next-line
  if (event.params.category == BigInt.fromI32(4)) {
    const parcel = loadOrCreateParcel(event.params.erc721TokenId);
    parcel.activeListing = event.params.listingId;
    parcel.save();

    listing.parcel = event.params.erc721TokenId.toString();

    listing.fudBoost = parcel.fudBoost;
    listing.fomoBoost = parcel.fomoBoost;
    listing.alphaBoost = parcel.alphaBoost;
    listing.kekBoost = parcel.kekBoost;

    listing.district = parcel.district;
    listing.size = parcel.size;

    listing.coordinateX = parcel.coordinateX;
    listing.coordinateY = parcel.coordinateY;

    listing.parcelHash = parcel.parcelHash;
  }

  listing.save();
}

export function handleERC721ExecutedListing(event: ERC721ExecutedListing): void {
  let listing = laodOrCreateERC721Listing(event.params.listingId.toString());
  listing = updateERC721ListingInfo(listing, event.params.listingId, event);

  listing.buyer = event.params.buyer;
  listing.timePurchased = event.params.time;
  listing.parcel = event.params.erc721TokenId.toString();

  listing.save();

  // eslint-disable-next-line
  if (event.params.category == BigInt.fromI32(4)) {
    //Parcel -- update number of times traded

    const parcel = loadOrCreateParcel(event.params.erc721TokenId);
    parcel.timesTraded = parcel.timesTraded.plus(BIGINT_ONE);
    parcel.activeListing = null;
    // add to historical prices
    let historicalPrices = parcel.historicalPrices;

    // eslint-disable-next-line
    if (historicalPrices == null) {
      historicalPrices = new Array();
    }
    historicalPrices.push(event.params.priceInWei);
    parcel.historicalPrices = historicalPrices;
    parcel.save();
  }
}

export function handleERC721ListingCancelled(event: ERC721ListingCancelled): void {
  let listing = laodOrCreateERC721Listing(event.params.listingId.toString());
  listing = updateERC721ListingInfo(listing, event.params.listingId, event);

  if (listing.category.equals(BigInt.fromI32(4))) {
    const parcel = loadOrCreateParcel(listing.tokenId);
    parcel.activeListing = null;
    parcel.save();
  }

  listing.cancelled = true;
  listing.save();
}

export function handleERC721ListingRemoved(event: ERC721ListingRemoved): void {
  let listing = laodOrCreateERC721Listing(event.params.listingId.toString());
  listing = updateERC721ListingInfo(listing, event.params.listingId, event);

  if (listing.category.equals(BigInt.fromI32(4))) {
    const parcel = loadOrCreateParcel(listing.tokenId);
    parcel.activeListing = null;
    parcel.save();
  }

  listing.cancelled = true;
  listing.save();
}
