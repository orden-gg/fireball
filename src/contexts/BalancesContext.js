import React, { createContext, useContext, useEffect, useState } from 'react';

import alchemicaApi from 'api/alchemica.api';
import ghstApi from 'api/ghst.api';
import quickSwapApi from 'api/quickswap.api';
import { ALPHA_CONTRACT, DAI_CONTRACT, FOMO_CONTRACT, FUD_CONTRACT, GHST_CONTRACT, KEK_CONTRACT } from 'api/common/constants';
import alphaIcon from 'assets/images/icons/alpha.svg';
import fomoIcon from 'assets/images/icons/fomo.svg';
import fudIcon from 'assets/images/icons/fud.svg';
import ghstIcon from 'assets/images/icons/ghst-token.svg';
import kekIcon from 'assets/images/icons/kek.svg';
import commonUtils from 'utils/commonUtils';

import { LoginContext } from './LoginContext';

export const BalancesContext = createContext({});

const BalancesContextProvider = (props) => {
    const initialTokensValues = [
        {
            imgSrc: fudIcon,
            amount: 0,
            balance: 0
        },
        {
            imgSrc: fomoIcon,
            amount: 0,
            balance: 0
        },
        {
            imgSrc: alphaIcon,
            amount: 0,
            balance: 0
        },
        {
            imgSrc: kekIcon,
            amount: 0,
            balance: 0
        },
        {
            imgSrc: ghstIcon,
            amount: 0,
            balance: 0
        }
    ];

    const { activeAddress } = useContext(LoginContext);

    const [tokens, setTokens] = useState([...initialTokensValues.map(token => ({
        amount: token.amount,
        balance: token.balance,
        imgSrc: token.imgSrc
    }))]);

    useEffect(() => {
        if (activeAddress) {
            let mounted = true;

            async function getBalances() {
                const [ghst, ghstPrice] = await getGhstAndPriceToToken(GHST_CONTRACT, DAI_CONTRACT);
                const [fudAmount, fomoAmount, alphaAmount, kekAmount, gshtAmount] = await Promise.all([
                    alchemicaApi.getFudBalance(activeAddress),
                    alchemicaApi.getFomoBalance(activeAddress),
                    alchemicaApi.getAlphaBalance(activeAddress),
                    alchemicaApi.getKekBalance(activeAddress),
                    ghstApi.getBalanceOf(activeAddress)
                ]);
                const [fudToken, fomoToken, alphaToken, kekToken] = await Promise.all([
                    quickSwapApi.getTokenData(FUD_CONTRACT),
                    quickSwapApi.getTokenData(FOMO_CONTRACT),
                    quickSwapApi.getTokenData(ALPHA_CONTRACT),
                    quickSwapApi.getTokenData(KEK_CONTRACT)
                ]);
                const [fudBalance, fomoBalance, alphaBalance, kekBalance] = await Promise.all([
                    getTokenBalance(ghst, ghstPrice, fudToken, fudAmount),
                    getTokenBalance(ghst, ghstPrice, fomoToken, fomoAmount),
                    getTokenBalance(ghst, ghstPrice, alphaToken, alphaAmount),
                    getTokenBalance(ghst, ghstPrice, kekToken, kekAmount),
                ]);
                const ghstBalance = gshtAmount * ghstPrice;

                const tokens = [
                    {
                        alt: 'fud',
                        imgSrc: fudIcon,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(fudAmount),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(fudBalance)
                    },
                    {
                        alt: 'fomo',
                        imgSrc: fomoIcon,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(fomoAmount),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(fomoBalance)
                    },
                    {
                        alt: 'alpha',
                        imgSrc: alphaIcon,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(alphaAmount),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(alphaBalance)
                    },
                    {
                        alt: 'kek',
                        imgSrc: kekIcon,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(kekAmount),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(kekBalance)
                    },
                    {
                        alt: 'ghst',
                        imgSrc: ghstIcon,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(gshtAmount),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(ghstBalance)
                    },
                ];

                if (mounted) {
                    setTokens(tokens);
                }
            }

            getBalances();

            const interval = setInterval(() => {
                getBalances();
            }, 30000);

            return () => {
                mounted = false;

                clearInterval(interval);
            }
        }
    }, [activeAddress]);

    const getGhstAndPriceToToken = async (ghstContract, tokenContract) => {
        const [ghst, token] = await Promise.all([
            quickSwapApi.getTokenData(ghstContract),
            quickSwapApi.getTokenData(tokenContract)
        ]);

        const ghstTokenPair = await quickSwapApi.getPairData(ghst, token);
        const ghstTokenRoute = quickSwapApi.getTokenRouteByPair(ghst, ghstTokenPair);
        const ghstPriceToToken = ghstTokenRoute.midPrice.toSignificant(6);

        return [ghst, ghstPriceToToken];
    }

    const getTokenBalance = async (ghst, ghstPrice, token, tokenAmount) => {
        const ghstTokenPair = await quickSwapApi.getPairData(ghst, token);
        const ghstTokenRoute = quickSwapApi.getTokenRouteByPair(token, ghstTokenPair);
        const tokenToGhstPrice = ghstTokenRoute.midPrice.toSignificant(6);
        const tokenPrice = ghstPrice * tokenToGhstPrice;
        const tokenBalance = tokenPrice * tokenAmount;

        return tokenBalance;
    }

    return (
        <BalancesContext.Provider value={{
            tokens
        }}>
            { props.children }
        </BalancesContext.Provider>
    )
}

export default BalancesContextProvider;
