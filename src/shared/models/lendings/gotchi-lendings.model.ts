import { FBGotchi } from '../gotchi.model';

export interface GotchiLending {
  id: string;
  timeCreated: string;
  timeAgreed: string;
  rentDuration: string;
  upfrontCost: string;
  period: string;
  lastClaimed: string;
  completed: boolean;
  gotchi: {
    id: string;
    name: string;
    collateral: string;
    kinship: string;
    hauntId: string;
    baseRarityScore: string;
    modifiedRarityScore: string;
    numericTraits: number[]; // ?? tuple
    modifiedNumericTraits: number[]; // ?? tuple
    withSetsNumericTraits: number[]; // ?? tuple
    withSetsRarityScore: string;
    equippedWearables: number[]; // ?? tuple
    possibleSets: string;
    equippedSetID: string;
    equippedSetName: string;
    toNextLevel: string;
    level: string;
    timesTraded: string;
    stakedAmount: string;
    originalOwner: {
      id: string;
    };
  };
  lender: string;
  borrower: string;
  whitelistId: string;
  tokensToShare: string[];
  splitOther: string;
  splitBorrower: string;
  splitOwner: string;
  endTime?: number;
}

export interface GotchiLendingExtended extends GotchiLending, FBGotchi {}
