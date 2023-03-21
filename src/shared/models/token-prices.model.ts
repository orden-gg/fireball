import { TokenTypes } from 'shared/constants';

export type TokenPricesType = {
  [key in TokenTypes]: number
}
export interface QuickswapToken {
  address: string,
  chainId: number,
  decimals: number,
  name?: string | undefined,
  symbol?: string | undefined 
}

export interface GhstPriceType {
  price: number,
  token: QuickswapToken
}
