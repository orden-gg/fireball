import { QuickswapApi } from 'api';

import { AppThunk } from 'core/store/store';

import { setIsPricesLoaded, setTokensPrices } from '../slices/tokens-prices.slice';

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

const fetchInterval = 300; // seconds

export const onSetIsPricesLoaded = (isPrice: boolean): AppThunk => (dispatch) => {
  dispatch(setIsPricesLoaded(isPrice));
};

export const onLoadTokensPrices = (): AppThunk => (dispatch) => {
  const getTokensPrices = async function() {
    setIsPricesLoaded(false);
    const [ghstPrice, ghst] = await getGhstAndPriceToToken(GHST_CONTRACT, USDC_CONTRACT);
    const [maticPrice] = await getGhstAndPriceToToken(WMATIC_CONTRACT, USDC_CONTRACT);
    const [fudToken, fomoToken, alphaToken, kekToken, gltrToken] = await Promise.all([
      QuickswapApi.getTokenData(FUD_CONTRACT),
      QuickswapApi.getTokenData(FOMO_CONTRACT),
      QuickswapApi.getTokenData(ALPHA_CONTRACT),
      QuickswapApi.getTokenData(KEK_CONTRACT),
      QuickswapApi.getTokenData(GLTR_CONTRACT)
    ]);
    const [fudPrice, fomoPrice, alphaPrice, kekPrice, gltrPrice] = await Promise.all([
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

const getGhstAndPriceToToken = async (ghstContract, tokenContract) => {
  const [ghst, token] = await Promise.all([
    QuickswapApi.getTokenData(ghstContract),
    QuickswapApi.getTokenData(tokenContract)
  ]);

  const ghstTokenPair = await QuickswapApi.getPairData(ghst, token);
  const ghstTokenRoute = QuickswapApi.getTokenRouteByPair(ghst, ghstTokenPair);
  const ghstPriceToToken = Number(ghstTokenRoute.midPrice.toSignificant(6));

  return [ghstPriceToToken, ghst];
};

const getTokenPrice = async (compareToken, compareTokenPrice, targetToken) => {
  const tokensPair = await QuickswapApi.getPairData(compareToken, targetToken);
  const tokensRoute = QuickswapApi.getTokenRouteByPair(targetToken, tokensPair);
  const targetTokenToCompareTokenPrice = Number(tokensRoute.midPrice.toSignificant(6));
  const tokenPrice = compareTokenPrice * targetTokenToCompareTokenPrice;

  return tokenPrice;
};
