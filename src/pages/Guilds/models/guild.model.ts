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
}

export interface GuildPlayerStats {
  gotchisVP: string;
  itemsVP: string;
  portalsVP: string;
  portalsAmount: number;
  gotchisOriginalOwnedAmount: number;
  itemsAmount: number;
}

export interface GuildPlayerRealmStats {
  parcelsCount: number;
  installationsCount: number;
  tilesCount: number;
  parcelsVP: string;
}

export interface GuildStats {
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

export interface GeneralGuildStats extends GuildStats, GuildRealmStats {}
