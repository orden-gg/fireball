import { TokenTypes } from 'shared/constants';

export type TokenPricesType = {
  [key in TokenTypes]: number
}
