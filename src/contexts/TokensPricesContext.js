import { createContext, useEffect, useState } from 'react';

import quickSwapApi from 'api/quickswap.api';
import { ALPHA_CONTRACT, DAI_CONTRACT, FOMO_CONTRACT, FUD_CONTRACT, GHST_CONTRACT, GLTR_CONTRACT, KEK_CONTRACT } from 'api/common/constants';
import { TokenTypes } from 'data/types';

export const TokensPricesContext = createContext({});

const TokensPricesContextProvider = (props) => {
    const [isPricesLoaded, setIsPricesLoaded] = useState(false);
    const [tokensPrices, setTokensPrices] = useState({});

    const fetchInterval = 300; // seconds

    useEffect(() => {
        const getTokensPrices = async function () {
            setIsPricesLoaded(false);

            const [ghst, ghstPrice] = await getGhstAndPriceToToken(GHST_CONTRACT, DAI_CONTRACT);
            const [fudToken, fomoToken, alphaToken, kekToken, gltrToken] = await Promise.all([
                quickSwapApi.getTokenData(FUD_CONTRACT),
                quickSwapApi.getTokenData(FOMO_CONTRACT),
                quickSwapApi.getTokenData(ALPHA_CONTRACT),
                quickSwapApi.getTokenData(KEK_CONTRACT),
                quickSwapApi.getTokenData(GLTR_CONTRACT)
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
                [TokenTypes.Ghst]: ghstPrice
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
            quickSwapApi.getTokenData(ghstContract),
            quickSwapApi.getTokenData(tokenContract)
        ]);

        const ghstTokenPair = await quickSwapApi.getPairData(ghst, token);
        const ghstTokenRoute = quickSwapApi.getTokenRouteByPair(ghst, ghstTokenPair);
        const ghstPriceToToken = Number(ghstTokenRoute.midPrice.toSignificant(6));

        return [ghst, ghstPriceToToken];
    };

    const getTokenPrice = async (compareToken, compareTokenPrice, targetToken) => {
        const tokensPair = await quickSwapApi.getPairData(compareToken, targetToken);
        const tokensRoute = quickSwapApi.getTokenRouteByPair(targetToken, tokensPair);
        const targetTokenToCompareTokenPrice = Number(tokensRoute.midPrice.toSignificant(6));
        const tokenPrice = compareTokenPrice * targetTokenToCompareTokenPrice;

        return tokenPrice;
    };

    return (
        <TokensPricesContext.Provider value={{
            tokensPrices,
            isPricesLoaded
        }}>
            { props.children }
        </TokensPricesContext.Provider>
    );
};

export default TokensPricesContextProvider;
