import { GuildPlayerBestGotchiStats } from './guild-gotchi.model';

export interface Guild {
  id: string;
  safeAddress: string;
  owner: string;
  name: string;
  description: string;
  logo: string;
  members: {
    id: string;
  }[];
  membersCount: number;
}

export interface GuildPlayerBestGotchi {
  id: string;
  gotchisOriginalOwned: GuildPlayerBestGotchiStats;
}

export interface GuildPlayerStats {
  id: string;
  gotchisVP: string;
  itemsVP: string;
  portalsVP: string;
  portalsAmount: number;
  gotchisOriginalOwnedAmount: number;
  itemsAmount: number;
}

export interface GuildPlayerRealmStats {
  id: string;
  parcelsCount: number;
  installationsCount: number;
  tilesCount: number;
  parcelsVP: string;
}

export interface GuildStats {
  membersCount: number;
  gotchisCount: number;
  itemsCount: number;
  portalsCount: number;
  votingPower: number;
}

export interface GuildRealmStats {
  realmCount: number;
  installationsCount: number;
  tilesCount: number;
  votingPower: number;
}

export interface GeneralGuildStats extends GuildStats, GuildRealmStats {
  id?: string;
  bestGotchi?: GuildPlayerBestGotchiStats;
}
