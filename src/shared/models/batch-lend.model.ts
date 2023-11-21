export interface BatchLend {
  tokenId: number;
  originalOwner: string;
  readonly initialCost: number;
  readonly period: number;
  readonly revenueSplit: [number, number, number];
  readonly thirdParty: string;
  readonly whitelistId: number;
  readonly revenueTokens: [string, string, string, string];
  readonly permissions: number;
}
