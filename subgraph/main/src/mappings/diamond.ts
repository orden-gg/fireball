import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import {
  AavegotchiDiamond,
  AavegotchiInteract,
  BuyPortals,
  ClaimAavegotchi,
  DecreaseStake,
  EquipWearables,
  ERC721ExecutedListing,
  ERC721ExecutedToRecipient,
  ERC721ListingAdd,
  ERC721ListingCancelled,
  ERC721ListingRemoved,
  ExperienceTransfer,
  GotchiLendingAdd,
  GotchiLendingAdded,
  GotchiLendingCancel,
  GotchiLendingCanceled,
  GotchiLendingClaim,
  GotchiLendingClaimed,
  GotchiLendingEnd,
  GotchiLendingEnded,
  GotchiLendingExecute,
  GotchiLendingExecuted,
  GrantExperience,
  IncreaseStake,
  MintPortals,
  PortalOpened,
  RemoveExperience,
  SetAavegotchiName,
  SpendSkillpoints,
  Transfer,
  TransferBatch,
  TransferFromParent,
  TransferSingle,
  TransferToParent,
  UseConsumables,
  Xingyun
} from '../../generated/AavegotchiDiamond/AavegotchiDiamond';
import {
  laodOrCreateERC721Listing,
  loadOrCreatePlayer,
  loadOrCreateItem,
  updateERC721ListingInfo,
  loadOrCreateGotchi,
  loadOrCreateGotchiOption,
  calculateBaseRarityScore,
  updateGotchiInfo,
  updateAavegotchiWearables,
  loadOrCreateGotchiLending,
  updateGotchiLending,
  loadOrCreateWhitelist,
  loadOrCreateClaimedToken,
  loadOrCreatePortal,
  updateIdentityByGotchi,
  updateIdentityByOptions,
  removeUnclaimedIdentity
} from '../helpers';
import {
  BIGINT_ONE,
  BLOCK_DISABLE_OLD_LENDING_EVENTS,
  ERC1155ItemCategoty,
  PORTAL_STATUS_BOUGHT,
  PORTAL_STATUS_CLAIMED,
  PORTAL_STATUS_OPENED
} from '../shared';

// ERC 721 EVENTS
export function handleERC721ListingAdd(event: ERC721ListingAdd): void {
  let listing = laodOrCreateERC721Listing(event.params.listingId.toString());
  listing = updateERC721ListingInfo(listing, event.params.listingId, event);

  if (listing.category == BigInt.fromI32(3)) {
    listing.gotchi = event.params.erc721TokenId.toString();
    const gotchi = loadOrCreateGotchi(event.params.erc721TokenId, event)!;
    listing.collateral = gotchi.collateral;
    gotchi.activeListing = event.params.listingId;
    gotchi.save();
    listing.nameLowerCase = gotchi.nameLowerCase;

    // Traits for Filter in v2
    if (gotchi.withSetsNumericTraits != null && gotchi.withSetsNumericTraits!.length == 6) {
      listing.nrgTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![0]);
      listing.aggTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![1]);
      listing.spkTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![2]);
      listing.brnTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![3]);
      listing.eysTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![4]);
      listing.eycTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![5]);
    }
  } else if (listing.category.lt(BigInt.fromI32(3))) {
    const portal = loadOrCreatePortal(event.params.erc721TokenId);
    portal.activeListing = event.params.listingId;
    portal.save();
    listing.portal = event.params.erc721TokenId.toString();
  }

  listing.save();
}

export function handleERC721ExecutedListing(event: ERC721ExecutedListing): void {
  let listing = laodOrCreateERC721Listing(event.params.listingId.toString());
  listing = updateERC721ListingInfo(listing, event.params.listingId, event);

  listing.buyer = event.params.buyer;
  listing.timePurchased = event.params.time;

  if (event.params.category.lt(BigInt.fromI32(3))) {
    const portal = loadOrCreatePortal(event.params.erc721TokenId);

    portal.timesTraded = portal.timesTraded.plus(BIGINT_ONE);

    // add to historical prices
    let historicalPrices = portal.historicalPrices;
    if (historicalPrices == null) {
      historicalPrices = new Array();
    }
    historicalPrices.push(event.params.priceInWei);
    portal.historicalPrices = historicalPrices;
    portal.activeListing = null;
    portal.save();
  } else if (event.params.category.equals(BigInt.fromI32(3))) {
    const gotchi = loadOrCreateGotchi(event.params.erc721TokenId, event)!;
    let historicalPrices = gotchi.historicalPrices;

    if (historicalPrices == null) {
      historicalPrices = new Array();
    }

    gotchi.timesTraded = gotchi.timesTraded.plus(BIGINT_ONE);
    historicalPrices.push(event.params.priceInWei);
    gotchi.historicalPrices = historicalPrices;
    gotchi.activeListing = null;
    gotchi.save();
  }

  listing.save();
}

export function handleERC721ListingCancelled(event: ERC721ListingCancelled): void {
  let listing = laodOrCreateERC721Listing(event.params.listingId.toString());
  listing = updateERC721ListingInfo(listing, event.params.listingId, event);

  listing.cancelled = true;
  listing.save();

  if (listing.category.lt(BigInt.fromI32(3))) {
    const portal = loadOrCreatePortal(listing.tokenId);

    portal.activeListing = null;
    portal.save();
  } else if (listing.category.equals(BigInt.fromI32(3))) {
    const gotchi = loadOrCreateGotchi(listing.tokenId, event)!;
    gotchi.activeListing = null;
    gotchi.save();
  }
}

export function handleERC721ListingRemoved(event: ERC721ListingRemoved): void {
  let listing = laodOrCreateERC721Listing(event.params.listingId.toString());
  listing = updateERC721ListingInfo(listing, event.params.listingId, event);

  listing.cancelled = true;
  listing.save();

  if (listing.category.lt(BigInt.fromI32(3))) {
    const portal = loadOrCreatePortal(listing.tokenId);

    portal.activeListing = null;
    portal.save();
  } else if (listing.category.equals(BigInt.fromI32(3))) {
    const gotchi = loadOrCreateGotchi(listing.tokenId, event)!;
    gotchi.activeListing = null;
    gotchi.save();
  }
}

// HENDLE PORTALS
export function handleMintPortals(event: MintPortals): void {
  const buyer = loadOrCreatePlayer(event.params._from);
  const owner = loadOrCreatePlayer(event.params._to);
  let baseId = event.params._tokenId;

  for (let i = 0; i < event.params._numAavegotchisToPurchase.toI32(); i++) {
    const portal = loadOrCreatePortal(baseId);

    portal.hauntId = event.params._hauntId;
    portal.status = PORTAL_STATUS_BOUGHT;
    portal.gotchiId = baseId;
    portal.boughtAt = event.block.number;
    portal.owner = owner.id;
    portal.buyer = buyer.id;
    portal.timesTraded = BigInt.zero();

    portal.save();
    baseId = baseId.plus(BIGINT_ONE);
  }

  buyer.save();
  owner.save();
}

export function handleBuyPortals(event: BuyPortals): void {
  const contract = AavegotchiDiamond.bind(event.address);
  const buyer = loadOrCreatePlayer(event.params._from);
  const owner = loadOrCreatePlayer(event.params._to);

  const baseId = event.params._tokenId;

  for (let i = 0; i < event.params._numAavegotchisToPurchase.toI32(); i++) {
    const id = baseId.plus(BigInt.fromI32(i));
    const portal = loadOrCreatePortal(id);

    //Add portal hauntId
    const portalResponse = contract.try_getAavegotchi(id);
    if (!portalResponse.reverted) {
      portal.hauntId = portalResponse.value.hauntId;
    }

    portal.status = PORTAL_STATUS_BOUGHT;
    portal.gotchiId = event.params._tokenId;
    portal.owner = owner.id;
    portal.buyer = buyer.id;

    portal.save();
  }

  buyer.save();
  owner.save();
}

export function handlePortalOpened(event: PortalOpened): void {
  const contract = AavegotchiDiamond.bind(event.address);
  const portal = loadOrCreatePortal(event.params.tokenId);

  const _traitsResponse = contract.try_portalAavegotchiTraits(event.params.tokenId);

  if (!_traitsResponse.reverted) {
    const array = _traitsResponse.value;

    for (let i = 0; i < array.length; i++) {
      const possibleAavegotchiTraits = array[i];
      const gotchi = loadOrCreateGotchiOption(portal.id, i);

      gotchi.portal = portal.id;
      gotchi.owner = portal.owner;
      gotchi.randomNumber = possibleAavegotchiTraits.randomNumber;
      gotchi.numericTraits = possibleAavegotchiTraits.numericTraits;
      gotchi.collateralType = possibleAavegotchiTraits.collateralType;
      gotchi.minimumStake = possibleAavegotchiTraits.minimumStake;
      gotchi.gotchiId = BigInt.fromString(portal.id);
      gotchi.hauntId = portal.hauntId.toI32();
      //calculate base rarity score
      gotchi.baseRarityScore = calculateBaseRarityScore(gotchi.numericTraits);

      const identity = updateIdentityByOptions(gotchi);

      gotchi.identity = identity.id;

      identity.save();
      gotchi.save();
    }
  }

  portal.status = PORTAL_STATUS_OPENED;
  portal.openedAt = event.block.number;
  portal.save();
}

export function handleClaimAavegotchi(event: ClaimAavegotchi): void {
  const portal = loadOrCreatePortal(event.params._tokenId);
  let gotchi = loadOrCreateGotchi(event.params._tokenId, event)!;

  gotchi = updateGotchiInfo(gotchi, event.params._tokenId, event);
  gotchi.claimedAt = event.block.number;
  gotchi.gotchiId = event.params._tokenId;

  portal.gotchi = gotchi.id;
  const zeroUser = loadOrCreatePlayer(Address.zero());
  portal.owner = zeroUser.id;
  portal.status = PORTAL_STATUS_CLAIMED;
  portal.claimedAt = event.block.number;

  if (portal.activeListing) {
    const listing = laodOrCreateERC721Listing(portal.activeListing!.toString());
    listing.cancelled = true;
    listing.save();
  }

  const identity = updateIdentityByGotchi(gotchi);
  identity.save();

  gotchi.identity = identity.id;

  for (let i = 0; i < 10; i++) {
    const unclaimedIdentity = removeUnclaimedIdentity(portal.id, i);

    unclaimedIdentity.save();
  }

  portal.status = PORTAL_STATUS_OPENED;
  portal.openedAt = event.block.number;
  portal.save();

  gotchi.save();
  zeroUser.save();
}

export function handleIncreaseStake(event: IncreaseStake): void {
  let gotchi = loadOrCreateGotchi(event.params._tokenId, event)!;
  gotchi = updateGotchiInfo(gotchi, event.params._tokenId, event);
  gotchi.save();
}

// - event: DecreaseStake(indexed uint256,uint256)
//   handler: handleDecreaseStake

export function handleDecreaseStake(event: DecreaseStake): void {
  let gotchi = loadOrCreateGotchi(event.params._tokenId, event)!;
  gotchi = updateGotchiInfo(gotchi, event.params._tokenId, event);
  gotchi.save();
}

// - event: SpendSkillpoints(indexed uint256,int8[4])
//   handler: handleSpendSkillpoints

export function handleSpendSkillpoints(event: SpendSkillpoints): void {
  let gotchi = loadOrCreateGotchi(event.params._tokenId, event)!;
  gotchi = updateGotchiInfo(gotchi, event.params._tokenId, event);
  updateAavegotchiWearables(gotchi, event);
}

export function handleTransfer(event: Transfer): void {
  const id = event.params._tokenId;
  const newOwner = loadOrCreatePlayer(event.params._to);
  newOwner.save();
  const portal = loadOrCreatePortal(id, false);
  let gotchi = loadOrCreateGotchi(id, event, false);

  // ERC721 transfer can be portal or gotchi based, so we have to check it.
  if (gotchi != null) {
    if (!gotchi.modifiedRarityScore) {
      gotchi = updateGotchiInfo(gotchi, event.params._tokenId, event);
    }
    gotchi.owner = newOwner.id;
    if (!gotchi.lending) {
      gotchi.originalOwner = newOwner.id;
    }
    gotchi.save();
  } else {
    portal.owner = newOwner.id;
    portal.save();
  }
}

export function handleGotchiLendingAdd(event: GotchiLendingAdd): void {
  if (event.block.number.gt(BLOCK_DISABLE_OLD_LENDING_EVENTS)) {
    return;
  }
  let lending = loadOrCreateGotchiLending(event.params.listingId);
  lending = updateGotchiLending(lending, event);
  lending.save();
}

export function handleGotchiLendingClaim(event: GotchiLendingClaim): void {
  if (event.block.number.gt(BLOCK_DISABLE_OLD_LENDING_EVENTS)) {
    return;
  }
  let lending = loadOrCreateGotchiLending(event.params.listingId);
  lending = updateGotchiLending(lending, event);
  for (let i = 0; i < event.params.tokenAddresses.length; i++) {
    const ctoken = loadOrCreateClaimedToken(event.params.tokenAddresses[i], lending);
    ctoken.amount = ctoken.amount.plus(event.params.amounts[i]);
    ctoken.save();
  }
  lending.save();
}

export function handleGotchiLendingAdded(event: GotchiLendingAdded): void {
  const lending = loadOrCreateGotchiLending(event.params.listingId);
  lending.upfrontCost = event.params.initialCost;
  lending.rentDuration = event.params.period;
  lending.lender = event.params.lender;
  lending.originalOwner = event.params.originalOwner;
  lending.period = event.params.period;
  lending.splitOwner = BigInt.fromI32(event.params.revenueSplit[0]);
  lending.splitBorrower = BigInt.fromI32(event.params.revenueSplit[1]);
  lending.splitOther = BigInt.fromI32(event.params.revenueSplit[2]);
  lending.tokensToShare = event.params.revenueTokens.map<Bytes>(e => e);
  lending.thirdPartyAddress = event.params.thirdParty;
  lending.timeCreated = event.params.timeCreated;
  lending.cancelled = false;
  lending.completed = false;
  if (event.params.whitelistId != BigInt.zero()) {
    const whitelist = loadOrCreateWhitelist(event.params.whitelistId, event);
    if (whitelist) {
      lending.whitelist = whitelist.id;
      lending.whitelistMembers = whitelist.members;
      lending.whitelistId = event.params.whitelistId;
    }
  }
  const gotchi = loadOrCreateGotchi(event.params.tokenId, event)!;
  lending.gotchi = gotchi.id;
  lending.gotchiTokenId = event.params.tokenId;
  lending.gotchiKinship = gotchi.kinship;
  lending.gotchiBRS = gotchi.withSetsRarityScore;
  lending.save();
}

export function handleGotchiLendingClaimed(event: GotchiLendingClaimed): void {
  const lending = loadOrCreateGotchiLending(event.params.listingId);

  for (let i = 0; i < event.params.revenueTokens.length; i++) {
    const ctoken = loadOrCreateClaimedToken(event.params.revenueTokens[i], lending);
    ctoken.amount = ctoken.amount.plus(event.params.amounts[i]);
    ctoken.save();
  }

  lending.upfrontCost = event.params.initialCost;
  lending.lender = event.params.lender;
  lending.originalOwner = event.params.originalOwner;
  lending.period = event.params.period;
  lending.splitOwner = BigInt.fromI32(event.params.revenueSplit[0]);
  lending.splitBorrower = BigInt.fromI32(event.params.revenueSplit[1]);
  lending.splitOther = BigInt.fromI32(event.params.revenueSplit[2]);
  lending.tokensToShare = event.params.revenueTokens.map<Bytes>(e => e);
  lending.thirdPartyAddress = event.params.thirdParty;
  lending.lastClaimed = event.params.timeClaimed;
  lending.gotchiTokenId = event.params.tokenId;
  lending.borrower = event.params.borrower;
  lending.cancelled = false;
  lending.completed = false;
  if (event.params.whitelistId != BigInt.zero()) {
    const whitelist = loadOrCreateWhitelist(event.params.whitelistId, event);
    if (whitelist) {
      lending.whitelist = whitelist.id;
      lending.whitelistMembers = whitelist.members;
      lending.whitelistId = event.params.whitelistId;
    }
  }
  lending.save();
}

export function handleGotchiLendingEnd(event: GotchiLendingEnd): void {
  if (event.block.number.gt(BLOCK_DISABLE_OLD_LENDING_EVENTS)) {
    return;
  }

  let lending = loadOrCreateGotchiLending(event.params.listingId);
  lending = updateGotchiLending(lending, event);
  lending.timeEnded = event.block.timestamp;
  lending.save();

  const originalOwner = loadOrCreatePlayer(Address.fromBytes(lending.lender!));
  if (originalOwner.gotchisLentOut.length > 0) {
    const newGotchiLentOut = new Array<BigInt>();

    for (let i = 0; i < originalOwner.gotchisLentOut.length; i++) {
      const gotchiId = originalOwner.gotchisLentOut[i];
      if (!gotchiId.equals(lending.gotchiTokenId)) {
        newGotchiLentOut.push(gotchiId);
      }
    }
    originalOwner.gotchisLentOut = newGotchiLentOut;
    originalOwner.save();
  }

  const borrower = loadOrCreatePlayer(Address.fromBytes(lending.borrower!));
  if (borrower.gotchisBorrowed.length > 0) {
    const newGotchiLentOut = new Array<BigInt>();

    for (let i = 0; i < borrower.gotchisBorrowed.length; i++) {
      const gotchiId = borrower.gotchisBorrowed[i];
      if (!gotchiId.equals(lending.gotchiTokenId)) {
        newGotchiLentOut.push(gotchiId);
      }
    }
    borrower.gotchisBorrowed = newGotchiLentOut;
    borrower.save();
  }

  const gotchi = loadOrCreateGotchi(lending.gotchiTokenId, event)!;
  gotchi.lending = null;
  gotchi.originalOwner = originalOwner.id;
  gotchi.save();

  lending.save();
}

export function handleGotchiLendingExecute(event: GotchiLendingExecute): void {
  if (event.block.number.gt(BLOCK_DISABLE_OLD_LENDING_EVENTS)) {
    return;
  }
  let lending = loadOrCreateGotchiLending(event.params.listingId);
  lending = updateGotchiLending(lending, event);

  // update originalOwner to lender
  const gotchi = loadOrCreateGotchi(BigInt.fromString(lending.gotchi), event)!;
  const lender = loadOrCreatePlayer(Address.fromBytes(lending.lender!));
  gotchi.originalOwner = lender.id;
  lender.save();
  gotchi.save();

  const originalOwner = loadOrCreatePlayer(Address.fromBytes(lending.lender!));
  const gotchisLentOut = originalOwner.gotchisLentOut;
  gotchisLentOut.push(lending.gotchiTokenId);
  originalOwner.gotchisLentOut = gotchisLentOut;

  const borrower = loadOrCreatePlayer(Address.fromBytes(lending.borrower!));
  const gotchisBorrowed = borrower.gotchisBorrowed;
  gotchisBorrowed.push(lending.gotchiTokenId);
  borrower.gotchisBorrowed = gotchisBorrowed;

  originalOwner.save();
  borrower.save();
  lending.save();
}

export function handleGotchiLendingEnded(event: GotchiLendingEnded): void {
  const lending = loadOrCreateGotchiLending(event.params.listingId);
  lending.upfrontCost = event.params.initialCost;
  lending.lender = event.params.lender;
  lending.originalOwner = event.params.originalOwner;
  lending.period = event.params.period;
  lending.splitOwner = BigInt.fromI32(event.params.revenueSplit[0]);
  lending.splitBorrower = BigInt.fromI32(event.params.revenueSplit[1]);
  lending.splitOther = BigInt.fromI32(event.params.revenueSplit[2]);
  lending.tokensToShare = event.params.revenueTokens.map<Bytes>(e => e);
  lending.thirdPartyAddress = event.params.thirdParty;
  lending.gotchiTokenId = event.params.tokenId;
  lending.completed = true;
  lending.timeEnded = event.block.timestamp;
  if (event.params.whitelistId != BigInt.zero()) {
    const whitelist = loadOrCreateWhitelist(event.params.whitelistId, event);
    if (whitelist) {
      lending.whitelist = whitelist.id;
      lending.whitelistMembers = whitelist.members;
      lending.whitelistId = event.params.whitelistId;
    }
  }
  lending.save();

  if (event.block.number.le(BLOCK_DISABLE_OLD_LENDING_EVENTS)) {
    return;
  }
  // remove gotchi from originalOwner gotchisLentout
  const originalOwner = loadOrCreatePlayer(Address.fromBytes(lending.lender!));
  if (originalOwner.gotchisLentOut.length > 0) {
    const newGotchiLentOut = new Array<BigInt>();

    for (let i = 0; i < originalOwner.gotchisLentOut.length; i++) {
      const gotchiId = originalOwner.gotchisLentOut[i];
      if (!gotchiId.equals(lending.gotchiTokenId)) {
        newGotchiLentOut.push(gotchiId);
      }
    }
    originalOwner.gotchisLentOut = newGotchiLentOut;
    originalOwner.save();
  }

  // remove gotchi from borrower gotchis borrowed
  const borrower = loadOrCreatePlayer(Address.fromBytes(lending.borrower!));
  if (borrower.gotchisBorrowed.length > 0) {
    const newGotchiLentOut = new Array<BigInt>();

    for (let i = 0; i < borrower.gotchisBorrowed.length; i++) {
      const gotchiId = borrower.gotchisBorrowed[i];
      if (!gotchiId.equals(lending.gotchiTokenId)) {
        newGotchiLentOut.push(gotchiId);
      }
    }
    borrower.gotchisBorrowed = newGotchiLentOut;
    borrower.save();
  }

  const gotchi = loadOrCreateGotchi(lending.gotchiTokenId, event)!;
  gotchi.lending = null;
  gotchi.originalOwner = originalOwner.id;
  gotchi.save();
}

export function handleGotchiLendingExecuted(event: GotchiLendingExecuted): void {
  const lending = loadOrCreateGotchiLending(event.params.listingId);

  lending.upfrontCost = event.params.initialCost;
  lending.lender = event.params.lender;
  lending.originalOwner = event.params.originalOwner;
  lending.period = event.params.period;
  lending.splitOwner = BigInt.fromI32(event.params.revenueSplit[0]);
  lending.splitBorrower = BigInt.fromI32(event.params.revenueSplit[1]);
  lending.splitOther = BigInt.fromI32(event.params.revenueSplit[2]);
  lending.tokensToShare = event.params.revenueTokens.map<Bytes>(e => e);
  lending.thirdPartyAddress = event.params.thirdParty;
  lending.gotchiTokenId = event.params.tokenId;
  lending.timeAgreed = event.params.timeAgreed;
  lending.cancelled = false;
  lending.completed = false;
  lending.borrower = event.params.borrower;
  if (event.params.whitelistId != BigInt.zero()) {
    const whitelist = loadOrCreateWhitelist(event.params.whitelistId, event);
    if (whitelist) {
      lending.whitelist = whitelist.id;
      lending.whitelistMembers = whitelist.members;
      lending.whitelistId = event.params.whitelistId;
    }
  }
  lending.save();

  if (event.block.number.le(BLOCK_DISABLE_OLD_LENDING_EVENTS)) {
    return;
  }

  // update originalOwner to lender
  const gotchi = loadOrCreateGotchi(BigInt.fromString(lending.gotchi), event)!;
  const lender = loadOrCreatePlayer(Address.fromBytes(lending.lender!));
  gotchi.originalOwner = lender.id;
  lender.save();
  gotchi.save();

  const originalOwner = loadOrCreatePlayer(Address.fromBytes(lending.lender!));
  const gotchisLentOut = originalOwner.gotchisLentOut;
  gotchisLentOut.push(lending.gotchiTokenId);
  originalOwner.gotchisLentOut = gotchisLentOut;
  originalOwner.save();

  const borrower = loadOrCreatePlayer(Address.fromBytes(lending.borrower!));
  const gotchisBorrowed = borrower.gotchisBorrowed;
  gotchisBorrowed.push(lending.gotchiTokenId);
  borrower.gotchisBorrowed = gotchisBorrowed;
}

export function handleGotchiLendingCancel(event: GotchiLendingCancel): void {
  if (event.block.number.gt(BLOCK_DISABLE_OLD_LENDING_EVENTS)) {
    return;
  }
  let lending = loadOrCreateGotchiLending(event.params.listingId);
  lending = updateGotchiLending(lending, event);
  lending.save();
}

export function handleERC721ExecutedToRecipient(event: ERC721ExecutedToRecipient): void {
  // update listing
  let listing = laodOrCreateERC721Listing(event.params.listingId.toString());
  listing = updateERC721ListingInfo(listing, event.params.listingId, event);
  listing.recipient = event.params.recipient;
  listing.buyer = event.params.buyer;
  listing.save();
}

export function handleGotchiLendingCanceled(event: GotchiLendingCanceled): void {
  const lending = loadOrCreateGotchiLending(event.params.listingId);

  lending.upfrontCost = event.params.initialCost;
  lending.lender = event.params.lender;
  lending.originalOwner = event.params.originalOwner;
  lending.period = event.params.period;
  lending.splitOwner = BigInt.fromI32(event.params.revenueSplit[0]);
  lending.splitBorrower = BigInt.fromI32(event.params.revenueSplit[1]);
  lending.splitOther = BigInt.fromI32(event.params.revenueSplit[2]);
  lending.tokensToShare = event.params.revenueTokens.map<Bytes>(e => e);
  lending.thirdPartyAddress = event.params.thirdParty;
  lending.gotchiTokenId = event.params.tokenId;
  lending.cancelled = true;
  lending.completed = false;
  if (event.params.whitelistId != BigInt.zero()) {
    const whitelist = loadOrCreateWhitelist(event.params.whitelistId, event);
    if (whitelist) {
      lending.whitelist = whitelist.id;
      lending.whitelistMembers = whitelist.members;
      lending.whitelistId = event.params.whitelistId;
    }
  }
  lending.save();
}

export function handleXingyun(event: Xingyun): void {
  const buyer = loadOrCreatePlayer(event.params._from);
  const owner = loadOrCreatePlayer(event.params._to);

  let baseId = event.params._tokenId;

  for (let i = 0; i < event.params._numAavegotchisToPurchase.toI32(); i++) {
    const portal = loadOrCreatePortal(baseId);

    portal.hauntId = BIGINT_ONE;
    portal.status = PORTAL_STATUS_BOUGHT;
    portal.gotchiId = baseId;
    portal.boughtAt = event.block.number;
    portal.owner = owner.id;
    portal.buyer = buyer.id;
    portal.timesTraded = BigInt.zero();

    portal.save();

    baseId = baseId.plus(BIGINT_ONE);
  }

  buyer.save();
  owner.save();
}

export function handleSetAavegotchiName(event: SetAavegotchiName): void {
  let gotchi = loadOrCreateGotchi(event.params._tokenId, event)!;
  gotchi = updateGotchiInfo(gotchi, event.params._tokenId, event);
  gotchi.save();

  if (gotchi.activeListing) {
    const listing = laodOrCreateERC721Listing(gotchi.activeListing!.toString(), false);
    listing.nameLowerCase = gotchi.nameLowerCase;
    listing.save();
  }
}

export function handleUseConsumables(event: UseConsumables): void {
  let gotchi = loadOrCreateGotchi(event.params._tokenId, event)!;
  gotchi = updateGotchiInfo(gotchi, event.params._tokenId, event);
  gotchi.save();
}

export function handleGrantExperience(event: GrantExperience): void {
  const ids = event.params._tokenIds;

  for (let i = 0; i < ids.length; i++) {
    const tokenID = ids[i];
    let gotchi = loadOrCreateGotchi(tokenID, event, false);

    if (gotchi) {
      gotchi = updateGotchiInfo(gotchi, tokenID, event);
      gotchi.save();
    }
  }
}

export function handleRemoveExperience(event: RemoveExperience): void {
  const ids = event.params._tokenIds;

  for (let i = 0; i < ids.length; i++) {
    const tokenID = ids[i];
    let gotchi = loadOrCreateGotchi(tokenID, event)!;
    gotchi = updateGotchiInfo(gotchi, tokenID, event);

    gotchi.save();
  }
}

export function handleExperienceTransfer(event: ExperienceTransfer): void {
  let tokenID = event.params._toTokenId;

  let gotchi = loadOrCreateGotchi(tokenID, event)!;
  gotchi = updateGotchiInfo(gotchi, tokenID, event);
  gotchi.save();
}

export function handleAavegotchiInteract(event: AavegotchiInteract): void {
  let gotchi = loadOrCreateGotchi(event.params._tokenId, event, false);
  if (!gotchi) {
    return;
  }

  gotchi = updateGotchiInfo(gotchi, event.params._tokenId, event);
  // persist only if gotchi is already claimed
  if (gotchi.status.equals(BigInt.fromI32(3))) {
    gotchi.save();
  }
}

// ITEM HENDLERS
export function handleTransferSingle(event: TransferSingle): void {
  const contract = AavegotchiDiamond.bind(event.address);
  const _itemType = contract.getItemType(event.params._id);

  const playerOne = loadOrCreatePlayer(event.params._from);
  const playerTwo = loadOrCreatePlayer(event.params._to);

  playerOne.save();
  playerTwo.save();

  if (_itemType.category == ERC1155ItemCategoty.Badge) {
    log.warning('BADGE {}', [event.params._id.toString()]);
  } else {
    const wearableFrom = loadOrCreateItem(event.params._id, event.params._from, _itemType);
    const wearableTo = loadOrCreateItem(event.params._id, event.params._to, _itemType);

    const amount = event.params._value.toI32();

    wearableFrom.amount = wearableFrom.amount - amount;
    wearableTo.amount = wearableTo.amount + amount;

    wearableFrom.save();
    wearableTo.save();
  }
}

export function handleTransferBatch(event: TransferBatch): void {
  const contract = AavegotchiDiamond.bind(event.address);
  const playerOne = loadOrCreatePlayer(event.params._from);
  const playerTwo = loadOrCreatePlayer(event.params._to);

  playerOne.save();
  playerTwo.save();

  for (let i = 0; i < event.params._ids.length; i++) {
    const _itemType = contract.getItemType(event.params._ids[i]);

    if (_itemType.category == ERC1155ItemCategoty.Badge) {
      log.warning('BADGE {}', [event.params._ids[i].toString()]);
    } else {
      const wearableFrom = loadOrCreateItem(event.params._ids[i], event.params._from, _itemType);
      const wearableTo = loadOrCreateItem(event.params._ids[i], event.params._to, _itemType);
      const amount = event.params._values[i].toI32();

      wearableFrom.amount = wearableFrom.amount - amount;
      wearableTo.amount = wearableTo.amount + amount;

      wearableFrom.save();
      wearableTo.save();
    }
  }
}

export function handleTransferFromParent(event: TransferFromParent): void {
  const contract = AavegotchiDiamond.bind(event.address);
  const gotchi = loadOrCreateGotchi(event.params._fromTokenId, event);
  const _itemType = contract.getItemType(event.params._tokenTypeId);

  if (gotchi) {
    const item = loadOrCreateItem(event.params._tokenTypeId, Address.fromString(gotchi.originalOwner), _itemType);

    item.equipped = item.equipped - event.params._value.toI32();

    item.save();
  }
}

export function handleTransferToParent(event: TransferToParent): void {
  const contract = AavegotchiDiamond.bind(event.address);
  const gotchi = loadOrCreateGotchi(event.params._toTokenId, event);
  const _itemType = contract.getItemType(event.params._tokenTypeId);

  if (gotchi) {
    if (_itemType.category === ERC1155ItemCategoty.Badge) {
      const badges = gotchi.badges;

      badges.push(event.params._tokenTypeId.toI32());

      gotchi.badges = badges;

      gotchi.save();

      log.warning('EQUIP BADGE {}, GOTCHI {}', [
        event.params._tokenTypeId.toString(),
        event.params._toTokenId.toString()
      ]);
    } else {
      const item = loadOrCreateItem(event.params._tokenTypeId, Address.fromString(gotchi.originalOwner), _itemType);

      item.equipped = item.equipped + event.params._value.toI32();

      item.save();
    }

    log.warning('FROM PARENT id {}, category {}', [
      event.params._tokenTypeId.toString(),
      _itemType.category.toString()
    ]);
  }
}

export function handleEquipWearables(event: EquipWearables): void {
  const tokenId = event.params._tokenId;

  let gotchi = loadOrCreateGotchi(tokenId, event)!;

  gotchi = updateGotchiInfo(gotchi, tokenId, event);

  updateAavegotchiWearables(gotchi, event);
}
