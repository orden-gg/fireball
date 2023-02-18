import { createContext, useEffect, useState } from 'react';

import {
  ALPHA_CONTRACT,
  FOMO_CONTRACT,
  FUD_CONTRACT,
  GHST_CONTRACT,
  GLTR_CONTRACT,
  KEK_CONTRACT,
  TokenTypes,
  USDC_CONTRACT, 
  MATIC_CONTRACT
} from 'shared/constants';
import { QuickswapApi } from 'api';

export const TokensPricesContext = createContext({});

// TODO add types
export const TokensPricesContextProvider = props => {
  const [isPricesLoaded, setIsPricesLoaded] = useState(false);
  const [tokensPrices, setTokensPrices] = useState({});

  const fetchInterval = 300; // seconds

  useEffect(() => {
    const getTokensPrices = async function() {
      setIsPricesLoaded(false);
      const [ghst, ghstPrice] = await getGhstAndPriceToToken(GHST_CONTRACT, USDC_CONTRACT);
      const [maticPrice] = await getMaticAndPriceToToken(MATIC_CONTRACT, USDC_CONTRACT);
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
      setTokensPrices({
        [TokenTypes.Fud]: fudPrice,
        [TokenTypes.Fomo]: fomoPrice,
        [TokenTypes.Alpha]: alphaPrice,
        [TokenTypes.Kek]: kekPrice,
        [TokenTypes.Gltr]: gltrPrice,
        [TokenTypes.Ghst]: ghstPrice,
        [TokenTypes.Matic]: maticPrice
      });
      setIsPricesLoaded(true);
    };

    getTokensPrices();

    const interval = setInterval(() => {
      getTokensPrices();
    }, fetchInterval * 1000);

    return () => clearInterval(interval);
  }, []);

  const getGhstAndPriceToToken = async (ghstContract, tokenContract) => {
    const [ghst, token] = await Promise.all([
      QuickswapApi.getTokenData(ghstContract),
      QuickswapApi.getTokenData(tokenContract)
    ]);

    const ghstTokenPair = await QuickswapApi.getPairData(ghst, token);
    const ghstTokenRoute = QuickswapApi.getTokenRouteByPair(ghst, ghstTokenPair);
    const ghstPriceToToken = Number(ghstTokenRoute.midPrice.toSignificant(6));

    return [ghst, ghstPriceToToken];
  };

  const getMaticAndPriceToToken = async (maticContract, tokenContract) => {
    const [matic, token] = await Promise.all([
      QuickswapApi.getTokenData(maticContract),
      QuickswapApi.getTokenData(tokenContract)
    ]);
    const maticTokenPair = await QuickswapApi.getPairData(matic, token);
    const maticTokenRoute = QuickswapApi.getTokenRouteByPair(matic, maticTokenPair);
    const maticPriceToToken = Number(maticTokenRoute.midPrice.toSignificant(6));

    return [maticPriceToToken];
  };

  const getTokenPrice = async (compareToken, compareTokenPrice, targetToken) => {
    const tokensPair = await QuickswapApi.getPairData(compareToken, targetToken);
    const tokensRoute = QuickswapApi.getTokenRouteByPair(targetToken, tokensPair);
    const targetTokenToCompareTokenPrice = Number(tokensRoute.midPrice.toSignificant(6));
    const tokenPrice = compareTokenPrice * targetTokenToCompareTokenPrice;

    return tokenPrice;
  };

  return (
    <TokensPricesContext.Provider
      value={{
        tokensPrices,
        isPricesLoaded
      }}
    >
      {props.children}
    </TokensPricesContext.Provider>
  );
};
