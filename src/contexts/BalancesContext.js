import { createContext, useContext, useEffect, useState } from 'react';

import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, GhstTokenIcon, GltrTokenIcon, KekTokenIcon } from 'components/Icons/Icons';
import alchemicaApi from 'api/alchemica.api';
import ghstApi from 'api/ghst.api';
import { ALPHA_CONTRACT, DAI_CONTRACT, FOMO_CONTRACT, FUD_CONTRACT, GHST_CONTRACT, GLTR_CONTRACT, KEK_CONTRACT } from 'api/common/constants';
import commonUtils from 'utils/commonUtils';

import { LoginContext } from './LoginContext';
import { TokensPricesContext } from './TokensPricesContext';
import { TokenTypes } from 'data/types';

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
    const { isPricesLoaded, tokensPrices } = useContext(TokensPricesContext);

    const [isBalancesLoading, setIsBalancesLoading] = useState(false);
    const [tokens, setTokens] = useState([...initialTokensValues.map(token => ({
        amount: token.amount,
        balance: token.balance,
        imgSrc: token.imgSrc
    }))]);

    useEffect(() => {
        let getBalances;

        if (activeAddress) {
            setIsBalancesLoading(true);
        }

        if (activeAddress && isPricesLoaded) {
            let mounted = true;

            setIsBalancesLoading(true);

            getBalances = async function () {
                const [fudAmount, fomoAmount, alphaAmount, kekAmount, gltrAmount, gshtAmount] = await Promise.all([
                    alchemicaApi.getFudBalance(activeAddress),
                    alchemicaApi.getFomoBalance(activeAddress),
                    alchemicaApi.getAlphaBalance(activeAddress),
                    alchemicaApi.getKekBalance(activeAddress),
                    alchemicaApi.getGltrBalance(activeAddress),
                    ghstApi.getBalanceOf(activeAddress)
                ]);

                const tokens = [
                    {
                        key: TokenTypes.Fud,
                        icon: <FudTokenIcon height={14} width={14} />,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(fudAmount),
                        pricePerToken: tokensPrices[TokenTypes.Fud].toFixed(3),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Fud] * fudAmount),
                        swapUrl: generateSwapUrl(FUD_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: TokenTypes.Fomo,
                        icon: <FomoTokenIcon height={14} width={14} />,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(fomoAmount),
                        pricePerToken: tokensPrices[TokenTypes.Fomo].toFixed(3),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Fomo] * fomoAmount),
                        swapUrl: generateSwapUrl(FOMO_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: TokenTypes.Alpha,
                        icon: <AlphaTokenIcon height={14} width={14} />,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(alphaAmount),
                        pricePerToken: tokensPrices[TokenTypes.Alpha].toFixed(3),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Alpha] * alphaAmount),
                        swapUrl: generateSwapUrl(ALPHA_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: TokenTypes.Kek,
                        icon: <KekTokenIcon height={14} width={14} />,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(kekAmount),
                        pricePerToken: tokensPrices[TokenTypes.Kek].toFixed(2),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Kek] * kekAmount),
                        swapUrl: generateSwapUrl(KEK_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: TokenTypes.Gltr,
                        icon: <GltrTokenIcon height={14} width={14} />,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(gltrAmount),
                        pricePerToken: tokensPrices[TokenTypes.Gltr].toFixed(5),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Gltr] * gltrAmount),
                        swapUrl: generateSwapUrl(GLTR_CONTRACT, GHST_CONTRACT)
                    },
                    {
                        key: TokenTypes.Ghst,
                        icon: <GhstTokenIcon height={14} width={14} />,
                        amount: commonUtils.convertFloatNumberToSuffixNumber(gshtAmount),
                        pricePerToken: tokensPrices[TokenTypes.Ghst].toFixed(2),
                        balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Ghst] * gshtAmount),
                        swapUrl: generateSwapUrl(GHST_CONTRACT, DAI_CONTRACT)
                    }
                ];

                if (mounted) {
                    setTokens(tokens);
                    setIsBalancesLoading(false);
                }
            };

            getBalances();

            return () => mounted = false;
        }
    }, [activeAddress, isPricesLoaded]);

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
