import { TokenTypes } from 'shared/constants';

export type TokenPrices = {
  [key in TokenTypes]: number;
};

export interface QuickswapToken {
  address: string;
  chainId: number;
  decimals: number;
  name?: string | undefined;
  symbol?: string | undefined;
}
export interface TokenPrice {
  price: number;
  token: QuickswapToken;
}
