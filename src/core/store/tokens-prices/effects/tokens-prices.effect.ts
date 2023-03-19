import { QuickswapApi } from 'api';

import { AppThunk } from 'core/store/store';

import {
  ALPHA_CONTRACT,
  FOMO_CONTRACT,
  FUD_CONTRACT,
  GHST_CONTRACT,
  GLTR_CONTRACT,
  KEK_CONTRACT,
  TokenTypes,
  USDC_CONTRACT,
  WMATIC_CONTRACT
} from 'shared/constants';

import { setIsPricesLoaded, setTokensPrices } from '../slices/tokens-prices.slice';

const fetchInterval: number = 300; // seconds

export const onSetIsPricesLoaded =
  (isPrice: boolean): AppThunk =>
  (dispatch) => {
    dispatch(setIsPricesLoaded(isPrice));
  };

export const onLoadTokensPrices = (): AppThunk => (dispatch) => {
  const getTokensPrices = async function (): Promise<void> {
    setIsPricesLoaded(false);
    const [ghstPrice, ghst]: number[] = await getGhstAndPriceToToken(GHST_CONTRACT, USDC_CONTRACT);
    const [maticPrice]: number[] = await getGhstAndPriceToToken(WMATIC_CONTRACT, USDC_CONTRACT);
    const [fudToken, fomoToken, alphaToken, kekToken, gltrToken]: number[] = await Promise.all([
      QuickswapApi.getTokenData(FUD_CONTRACT),
      QuickswapApi.getTokenData(FOMO_CONTRACT),
      QuickswapApi.getTokenData(ALPHA_CONTRACT),
      QuickswapApi.getTokenData(KEK_CONTRACT),
      QuickswapApi.getTokenData(GLTR_CONTRACT)
    ]);
    const [fudPrice, fomoPrice, alphaPrice, kekPrice, gltrPrice]: number[] = await Promise.all([
      getTokenPrice(ghst, ghstPrice, fudToken),
      getTokenPrice(ghst, ghstPrice, fomoToken),
      getTokenPrice(ghst, ghstPrice, alphaToken),
      getTokenPrice(ghst, ghstPrice, kekToken),
      getTokenPrice(ghst, ghstPrice, gltrToken)
    ]);
    dispatch(
      setTokensPrices({
        [TokenTypes.Fud]: fudPrice,
        [TokenTypes.Fomo]: fomoPrice,
        [TokenTypes.Alpha]: alphaPrice,
        [TokenTypes.Kek]: kekPrice,
        [TokenTypes.Gltr]: gltrPrice,
        [TokenTypes.Ghst]: ghstPrice,
        [TokenTypes.Matic]: maticPrice
      })
    );
    dispatch(setIsPricesLoaded(true));
  };

  getTokensPrices();

  setInterval(() => {
    getTokensPrices();
  }, fetchInterval * 1000);
};

const getGhstAndPriceToToken = async (ghstContract, tokenContract): Promise<CustomAny> => {
  const [ghst, token]: number[] = await Promise.all([
    QuickswapApi.getTokenData(ghstContract),
    QuickswapApi.getTokenData(tokenContract)
  ]);

  const ghstTokenPair: number = await QuickswapApi.getPairData(ghst, token);
  const ghstTokenRoute: CustomAny = QuickswapApi.getTokenRouteByPair(ghst, ghstTokenPair);
  const ghstPriceToToken: number = Number(ghstTokenRoute.midPrice.toSignificant(6));

  return [ghstPriceToToken, ghst];
};

const getTokenPrice = async (compareToken, compareTokenPrice, targetToken) => {
  const tokensPair: number = await QuickswapApi.getPairData(compareToken, targetToken);
  const tokensRoute: CustomAny = QuickswapApi.getTokenRouteByPair(targetToken, tokensPair);
  const targetTokenToCompareTokenPrice: number = Number(tokensRoute.midPrice.toSignificant(6));
  const tokenPrice: number = compareTokenPrice * targetTokenToCompareTokenPrice;

  return tokenPrice;
};
