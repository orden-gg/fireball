import { createContext, useContext, useEffect, useState } from 'react';

import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, GhstTokenIcon, GltrTokenIcon, KekTokenIcon } from 'components/Icons/Icons';
import {
    getAlphaBalance,
    getFomoBalance,
    getFudBalance,
    getGltrBalance,
    getKekBalance
} from 'api/alchemica.api';
import { getBalanceOf } from 'api/ghst.api';
import { getPairData, getTokenData, getTokenRouteByPair } from 'api/quickswap.api';
import { ALPHA_CONTRACT, DAI_CONTRACT, FOMO_CONTRACT, FUD_CONTRACT, GHST_CONTRACT, GLTR_CONTRACT, KEK_CONTRACT } from 'api/common/api.constants';
import { CommonUtils } from 'utils';

import { LoginContext } from './LoginContext';

export const BalancesContext = createContext({});

const BalancesContextProvider = (props) => {
    const initialTokensValues = [
        {
            icon: <FudTokenIcon height={14} width={14} />,
            amount: 0,
            balance: 0
        },
        {
            icon: <FomoTokenIcon height={14} width={14} />,
            amount: 0,
            balance: 0
        },
        {
            icon: <AlphaTokenIcon height={14} width={14} />,
            amount: 0,
            balance: 0
        },
        {
            icon: <KekTokenIcon height={14} width={14} />,
            amount: 0,
            balance: 0
        },
        {
            icon: <GltrTokenIcon height={14} width={14} />,
            amount: 0,
            balance: 0
        },
        {
            icon: <GhstTokenIcon height={14} width={14} />,
            amount: 0,
            balance: 0
        }
    ];

    const { activeAddress } = useContext(LoginContext);

    const [isBalancesLoading, setIsBalancesLoading] = useState(false);
    const [tokens, setTokens] = useState([...initialTokensValues.map(token => ({
        amount: token.amount,
        balance: token.balance,
        imgSrc: token.imgSrc
    }))]);

    const fetchInterval = 120; // seconds

    useEffect(() => {
        let getBalances;
        if (activeAddress) {
            let mounted = true;

            setIsBalancesLoading(true);

            getBalances = async function () {
                const [ghst, ghstPrice] = await getGhstAndPriceToToken(GHST_CONTRACT, DAI_CONTRACT);
                const [fudAmount, fomoAmount, alphaAmount, kekAmount, gltrAmount, gshtAmount] = await Promise.all([
                    getFudBalance(activeAddress),
                    getFomoBalance(activeAddress),
                    getAlphaBalance(activeAddress),
                    getKekBalance(activeAddress),
                    getGltrBalance(activeAddress),
                    getBalanceOf(activeAddress)
                ]);
                const [fudToken, fomoToken, alphaToken, kekToken, gltrToken] = await Promise.all([
                    getTokenData(FUD_CONTRACT),
                    getTokenData(FOMO_CONTRACT),
                    getTokenData(ALPHA_CONTRACT),
                    getTokenData(KEK_CONTRACT),
                    getTokenData(GLTR_CONTRACT)
                ]);
                const [fudPrice, fomoPrice, alphaPrice, kekPrice, gltrPrice] = await Promise.all([
                    getTokenPrice(ghst, ghstPrice, fudToken),
                    getTokenPrice(ghst, ghstPrice, fomoToken),
                    getTokenPrice(ghst, ghstPrice, alphaToken),
                    getTokenPrice(ghst, ghstPrice, kekToken),
                    getTokenPrice(ghst, ghstPrice, gltrToken)
                ]);
                const ghstBalance = gshtAmount * ghstPrice;

                const tokens = [
                    {
                        key: 'fud',
                        icon: <FudTokenIcon height={14} width={14} />,
                        amount: CommonUtils.convertFloatNumberToSuffixNumber(fudAmount),
                        pricePerToken: fudPrice.toFixed(3),
                        balance: CommonUtils.convertFloatNumberToSuffixNumber(fudPrice * fudAmount),
                        swapUrl: generateSwapUrl(FUD_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: 'fomo',
                        icon: <FomoTokenIcon height={14} width={14} />,
                        amount: CommonUtils.convertFloatNumberToSuffixNumber(fomoAmount),
                        pricePerToken: fomoPrice.toFixed(3),
                        balance: CommonUtils.convertFloatNumberToSuffixNumber(fomoPrice * fomoAmount),
                        swapUrl: generateSwapUrl(FOMO_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: 'alpha',
                        icon: <AlphaTokenIcon height={14} width={14} />,
                        amount: CommonUtils.convertFloatNumberToSuffixNumber(alphaAmount),
                        pricePerToken: alphaPrice.toFixed(3),
                        balance: CommonUtils.convertFloatNumberToSuffixNumber(alphaPrice * alphaAmount),
                        swapUrl: generateSwapUrl(ALPHA_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: 'kek',
                        icon: <KekTokenIcon height={14} width={14} />,
                        amount: CommonUtils.convertFloatNumberToSuffixNumber(kekAmount),
                        pricePerToken: kekPrice.toFixed(2),
                        balance: CommonUtils.convertFloatNumberToSuffixNumber(kekPrice * kekAmount),
                        swapUrl: generateSwapUrl(KEK_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: 'gltr',
                        icon: <GltrTokenIcon height={14} width={14} />,
                        amount: CommonUtils.convertFloatNumberToSuffixNumber(gltrAmount),
                        pricePerToken: gltrPrice.toFixed(5),
                        balance: CommonUtils.convertFloatNumberToSuffixNumber(gltrPrice * gltrAmount),
                        swapUrl: generateSwapUrl(GLTR_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: 'ghst',
                        icon: <GhstTokenIcon height={14} width={14} />,
                        amount: CommonUtils.convertFloatNumberToSuffixNumber(gshtAmount),
                        pricePerToken: ghstPrice.toFixed(2),
                        balance: CommonUtils.convertFloatNumberToSuffixNumber(ghstBalance),
                        swapUrl: generateSwapUrl(GHST_CONTRACT, DAI_CONTRACT)
                    }
                ];

                if (mounted) {
                    setTokens(tokens);
                    setIsBalancesLoading(false);
                }
            };

            getBalances();

            const interval = setInterval(() => {
                getBalances();
            }, fetchInterval * 1000);

            return () => {
                mounted = false;

                clearInterval(interval);
            };
        }
    }, [activeAddress]);

    const getGhstAndPriceToToken = async (ghstContract, tokenContract) => {
        const [ghst, token] = await Promise.all([
            getTokenData(ghstContract),
            getTokenData(tokenContract)
        ]);

        const ghstTokenPair = await getPairData(ghst, token);
        const ghstTokenRoute = getTokenRouteByPair(ghst, ghstTokenPair);
        const ghstPriceToToken = Number(ghstTokenRoute.midPrice.toSignificant(6));

        return [ghst, ghstPriceToToken];
    };

    const getTokenPrice = async (ghst, ghstPrice, token) => {
        const ghstTokenPair = await getPairData(ghst, token);
        const ghstTokenRoute = getTokenRouteByPair(token, ghstTokenPair);
        const tokenToGhstPrice = Number(ghstTokenRoute.midPrice.toSignificant(6));
        const tokenPrice = ghstPrice * tokenToGhstPrice;

        return tokenPrice;
    };

    const generateSwapUrl = (inputToken, outputToken) => {
        return `https://quickswap.exchange/#/swap?inputCurrency=${inputToken}&outputCurrency=${outputToken}`;
    };

    return (
        <BalancesContext.Provider value={{
            tokens,
            isBalancesLoading
        }}>
            { props.children }
        </BalancesContext.Provider>
    );
};

export default BalancesContextProvider;
