import { Address, BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts';
import { AavegotchiDiamond } from '../../generated/AavegotchiDiamond/AavegotchiDiamond';
import { AavegotchiOption, ClaimedToken, Gotchi, GotchiLending, Whitelist } from '../../generated/schema';
import { CORE_DIAMOND, STATUS_AAVEGOTCHI } from '../shared/constants/common.constants';
import { laodOrCreateERC721Listing } from './ERC721Listings.helper';
import { loadOrCreatePlayer } from './player.helper';

export const loadOrCreateGotchi = (
  id: BigInt,
  event: ethereum.Event,
  createIfNotFound: boolean = true
): Gotchi | null => {
  let gotchi = Gotchi.load(id.toString());

  if (gotchi == null && createIfNotFound) {
    gotchi = new Gotchi(id.toString());
    gotchi.gotchiId = id;
    gotchi.createdAt = event.block.number;
    gotchi.timesTraded = BigInt.zero();
    gotchi.historicalPrices = [];
    gotchi.badges = [];
    gotchi.originalOwner = Address.zero().toHexString();
  } else if (gotchi == null && !createIfNotFound) {
    return null;
  }

  return gotchi as Gotchi;
};

export function loadOrCreateGotchiOption(
  portalId: string,
  // @ts-ignore
  i: i32,
  createIfNotFound: boolean = true
): AavegotchiOption {
  const id = portalId.concat('-').concat(BigInt.fromI32(i).toString());
  let option = AavegotchiOption.load(id);

  if (option == null && createIfNotFound) {
    option = new AavegotchiOption(id);
    option.portalOptionId = i;
  }

  return option as AavegotchiOption;
}

// @ts-ignore
export function calculateBaseRarityScore(numericTraits: Array<i32>): i32 {
  let rarityScore = 0;

  for (let index = 0; index < numericTraits.length; index++) {
    const element = numericTraits[index];

    if (element < 50) rarityScore = rarityScore + (100 - element);
    else rarityScore = rarityScore + (element + 1);
  }

  return rarityScore;
}

export function updateGotchiInfo(
  gotchi: Gotchi,
  id: BigInt,
  event: ethereum.Event,
  updateListing: boolean = true
): Gotchi {
  const _contract = AavegotchiDiamond.bind(event.address);
  const _response = _contract.try_getAavegotchi(id);

  if (!_response.reverted) {
    const gotchiInfo = _response.value;

    const owner = loadOrCreatePlayer(gotchiInfo.owner);
    owner.save();
    gotchi.owner = owner.id;
    if (!gotchi.originalOwner) {
      gotchi.originalOwner = owner.id;
    }
    gotchi.name = gotchiInfo.name;
    gotchi.nameLowerCase = gotchiInfo.name.toLowerCase();
    gotchi.randomNumber = gotchiInfo.randomNumber;
    gotchi.status = gotchiInfo.status;
    gotchi.numericTraits = gotchiInfo.numericTraits;
    gotchi.modifiedNumericTraits = gotchiInfo.modifiedNumericTraits;

    gotchi.equippedWearables = gotchiInfo.equippedWearables;
    gotchi.collateral = gotchiInfo.collateral;
    gotchi.escrow = gotchiInfo.escrow;
    gotchi.stakedAmount = gotchiInfo.stakedAmount;
    gotchi.minimumStake = gotchiInfo.minimumStake;

    gotchi.kinship = gotchiInfo.kinship;
    gotchi.lastInteracted = gotchiInfo.lastInteracted;
    gotchi.experience = gotchiInfo.experience;
    gotchi.toNextLevel = gotchiInfo.toNextLevel;
    gotchi.usedSkillPoints = gotchiInfo.usedSkillPoints;
    gotchi.level = gotchiInfo.level;
    gotchi.hauntId = gotchiInfo.hauntId;
    gotchi.baseRarityScore = gotchiInfo.baseRarityScore;
    gotchi.modifiedRarityScore = gotchiInfo.modifiedRarityScore;

    if (!gotchi.withSetsRarityScore) {
      gotchi.withSetsRarityScore = gotchiInfo.modifiedRarityScore;
      gotchi.withSetsNumericTraits = gotchiInfo.modifiedNumericTraits;
    }

    if (gotchi.lending) {
      const lending = loadOrCreateGotchiLending(gotchi.lending!);
      lending.gotchiKinship = gotchi.kinship;
      lending.gotchiBRS = gotchi.withSetsRarityScore;
      lending.save();
    }

    if (gotchi.activeListing && updateListing) {
      const listing = laodOrCreateERC721Listing(gotchi.activeListing!.toString());
      listing.kinship = gotchi.kinship;
      listing.experience = gotchi.experience;
      listing.nameLowerCase = gotchi.nameLowerCase;
      if (gotchi.withSetsNumericTraits != null && gotchi.withSetsNumericTraits!.length == 6) {
        listing.nrgTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![0]);
        listing.aggTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![1]);
        listing.spkTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![2]);
        listing.brnTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![3]);
        listing.eysTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![4]);
        listing.eycTrait = BigInt.fromI32(gotchi.withSetsNumericTraits![5]);
      }
      listing.save();
    }

    gotchi.locked = gotchiInfo.locked;
  } else {
    // log.warning("Aavegotchi {} couldn't be updated at block: {} tx_hash: {}", [
    //   id.toString(),
    //   event.block.number.toString(),
    //   event.transaction.hash.toHexString()
    // ]);
  }

  return gotchi as Gotchi;
}
export function updateAavegotchiWearables(gotchi: Gotchi, event: ethereum.Event): void {
  const _contract = AavegotchiDiamond.bind(event.address);

  const bigInts = new Array<BigInt>();
  const equippedWearables = gotchi.equippedWearables;

  for (let index = 0; index < equippedWearables.length; index++) {
    const element = equippedWearables[index];
    bigInts.push(BigInt.fromI32(element));
  }

  const equippedSets = _contract.try_findWearableSets(bigInts);

  if (!equippedSets.reverted) {
    // log.warning('Equipped sets for GotchiID {} length {}', [
    //   gotchi.id,
    //   BigInt.fromI32(equippedSets.value.length).toString()
    // ]);

    if (equippedSets.value.length > 0) {
      //Find the best set
      const foundSetIDs = equippedSets.value;

      //Retrieve sets from onchain
      const getSetTypes = _contract.try_getWearableSets();
      if (!getSetTypes.reverted) {
        const setTypes = getSetTypes.value;

        let bestSetID = 0;
        let highestBRSBonus = 0;
        //Iterate through all the possible equipped sets
        for (let index = 0; index < foundSetIDs.length; index++) {
          const setID = foundSetIDs[index];
          const setInfo = setTypes[setID.toI32()];
          const traitBonuses = setInfo.traitsBonuses;
          const brsBonus = traitBonuses[0];

          if (brsBonus >= highestBRSBonus) {
            highestBRSBonus = brsBonus;
            bestSetID = setID.toI32();
          }
        }

        // log.warning('Best set: for GotchiID {} {} {}', [
        //   gotchi.gotchiId.toString(),
        //   setTypes[bestSetID].name,
        //   bestSetID.toString()
        // ]);

        const setBonuses = setTypes[bestSetID].traitsBonuses;

        //Add the set bonuses on to the modified numeric traits (which already include wearable bonuses, but not rarityScore modifiers)
        const brsBonus = setBonuses[0];

        const beforeSetBonus = calculateBaseRarityScore(gotchi.modifiedNumericTraits);

        //Before modifying
        const withSetsNumericTraits = gotchi.modifiedNumericTraits;

        //Add in the individual bonuses
        for (let index = 0; index < 4; index++) {
          withSetsNumericTraits[index] = withSetsNumericTraits[index] + setBonuses[index + 1];
        }

        //Get the post-set bonus
        const afterSetBonus = calculateBaseRarityScore(withSetsNumericTraits);

        //Get the difference
        const bonusDifference = afterSetBonus - beforeSetBonus;

        //Update the traits
        gotchi.withSetsNumericTraits = withSetsNumericTraits;

        //Add on the bonus differences to the modified rarity score
        gotchi.withSetsRarityScore = gotchi.modifiedRarityScore
          .plus(BigInt.fromI32(bonusDifference))
          .plus(BigInt.fromI32(brsBonus));

        //Equip the set
        gotchi.equippedSetID = BigInt.fromI32(bestSetID);

        //Set the name
        gotchi.equippedSetName = setTypes[bestSetID].name;
      }

      gotchi.possibleSets = BigInt.fromI32(equippedSets.value.length);
    } else {
      gotchi.equippedSetID = null;
      gotchi.equippedSetName = '';
      gotchi.withSetsRarityScore = gotchi.modifiedRarityScore;
      gotchi.withSetsNumericTraits = gotchi.modifiedNumericTraits;
    }
  } else {
    gotchi.withSetsRarityScore = gotchi.modifiedRarityScore;
    gotchi.withSetsNumericTraits = gotchi.modifiedNumericTraits;
    // log.warning('Find wearable sets reverted at block: {} tx_hash: {}', [
    //   event.block.number.toString(),
    //   event.transaction.hash.toHexString()
    // ]);
  }

  if (gotchi.status.equals(STATUS_AAVEGOTCHI)) {
    gotchi.save();
  }
}

export function loadOrCreateGotchiLending(listingId: BigInt): GotchiLending {
  let lending = GotchiLending.load(listingId.toString());
  if (!lending) {
    lending = new GotchiLending(listingId.toString());
    lending.cancelled = false;
    lending.completed = false;
    lending.whitelist = null;
    lending.whitelistMembers = [];
    lending.whitelistId = null;
  }

  return lending;
}

export function updateGotchiLending(lending: GotchiLending, event: ethereum.Event): GotchiLending {
  const _contract = AavegotchiDiamond.bind(event.address);
  const _response = _contract.try_getGotchiLendingListingInfo(BigInt.fromString(lending.id));
  if (_response.reverted) {
    return lending;
  }

  const listingResult = _response.value.value0;
  const gotchiResult = _response.value.value1;

  // load Gotchi & update gotchi
  let gotchi = loadOrCreateGotchi(gotchiResult.tokenId, event)!;
  if (!gotchi.modifiedRarityScore) {
    gotchi = updateGotchiInfo(gotchi, gotchiResult.tokenId, event);
  }

  if (!listingResult.completed && !listingResult.canceled) {
    gotchi.lending = BigInt.fromString(lending.id);
  } else {
    gotchi.lending = null;
  }

  // remove Hotfix for lending
  if (gotchi.originalOwner == null) {
    const lender = loadOrCreatePlayer(listingResult.lender);
    lender.save();
    gotchi.originalOwner = lender.id;
  }

  gotchi.save();

  lending.gotchi = gotchi.id;
  lending.borrower = listingResult.borrower;
  lending.cancelled = listingResult.canceled;
  lending.completed = listingResult.completed;
  lending.gotchiTokenId = BigInt.fromString(gotchi.id);
  lending.gotchiBRS = gotchi.withSetsRarityScore;
  lending.gotchiKinship = gotchiResult.kinship;

  lending.tokensToShare = listingResult.revenueTokens.map<Bytes>(e => e);
  lending.upfrontCost = listingResult.initialCost;

  lending.lastClaimed = listingResult.lastClaimed;

  lending.lender = listingResult.lender;
  lending.originalOwner = listingResult.originalOwner;

  if (listingResult.whitelistId != BigInt.zero()) {
    const whitelist = loadOrCreateWhitelist(listingResult.whitelistId, event);
    if (whitelist !== null) {
      lending.whitelist = whitelist.id;
      lending.whitelistMembers = whitelist.members;
      lending.whitelistId = BigInt.fromString(whitelist.id);
    }
  }

  lending.period = listingResult.period;

  lending.splitOwner = BigInt.fromI32(listingResult.revenueSplit[0]);
  lending.splitBorrower = BigInt.fromI32(listingResult.revenueSplit[1]);
  lending.splitOther = BigInt.fromI32(listingResult.revenueSplit[2]);

  lending.thirdPartyAddress = listingResult.thirdParty;
  lending.timeAgreed = listingResult.timeAgreed;
  lending.timeCreated = listingResult.timeCreated;

  return lending;
}

export function loadOrCreateWhitelist(id: BigInt, event: ethereum.Event): Whitelist | null {
  const _contract = AavegotchiDiamond.bind(Address.fromString(CORE_DIAMOND));
  const _response = _contract.try_getWhitelist(id);

  if (_response.reverted) {
    return null;
  }

  const result = _response.value;

  const members = result.addresses;
  const name = result.name;

  let whitelist = Whitelist.load(id.toString());
  if (!whitelist) {
    whitelist = new Whitelist(id.toString());
    whitelist.maxBorrowLimit = 1;
    whitelist.name = name;
  }

  const user = loadOrCreatePlayer(result.owner);
  user.save();
  whitelist.owner = user.id;
  whitelist.ownerAddress = result.owner;
  whitelist.members = members.map<Bytes>(e => e);

  whitelist.save();
  return whitelist;
}

export function loadOrCreateClaimedToken(tokenAddress: Bytes, lending: GotchiLending): ClaimedToken {
  const id = lending.id + '_' + tokenAddress.toHexString();
  let ctoken = ClaimedToken.load(id);
  if (ctoken == null) {
    ctoken = new ClaimedToken(id);
    ctoken.amount = BigInt.zero();
    ctoken.lending = lending.id;
    ctoken.token = tokenAddress;
  }

  return ctoken;
}
