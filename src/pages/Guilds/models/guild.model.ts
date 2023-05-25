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

export interface GuildStats {
  gotchisAmount: number;
  itemsAmount: number;
  portalsAmount: number;
  votingPower: number;
}
