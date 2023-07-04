import { FireballGotchi } from 'shared/models';

export interface GuildPlayerBestGotchiStats {
  id: string;
  name: string;
  baseRarityScore: string;
  modifiedRarityScore: string;
}

export interface GuildGotchi {
  id: string;
  name: string;
  collateral: string;
  hauntId: string;
  numericTraits: number[]; // ?? tuple
  equippedWearables: number[]; // ?? tuple
  modifiedRarityScore: string;

  baseRarityScore: string;
  usedSkillPoints: string;
}

export interface GuildGotchiLent {
  id: string;
  gotchi: GuildGotchi;
  period: string;
  lender: string;
  borrower: string;
  timeAgreed: string;
  endTime?: number;
}

export interface GuildGotchiBorrowed extends GuildGotchiLent {}

export interface GuildGotchiExtended extends GuildGotchi, FireballGotchi {}

export interface GuildGotchiLentExtended extends GuildGotchiLent, FireballGotchi {}

export interface GuildGotchiBorrowedExtended extends GuildGotchiBorrowed, FireballGotchi {}
