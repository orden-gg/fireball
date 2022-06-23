import { createContext, useContext, useEffect, useState } from 'react';

import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, GhstTokenIcon, GltrTokenIcon, KekTokenIcon } from 'components/Icons/Icons';
import alchemicaApi from 'api/alchemica.api';
import ghstApi from 'api/ghst.api';
import { ALPHA_CONTRACT, DAI_CONTRACT, FOMO_CONTRACT, FUD_CONTRACT, GHST_CONTRACT, GLTR_CONTRACT, KEK_CONTRACT } from 'api/common/constants';
import commonUtils from 'utils/commonUtils';
import { TokenTypes } from 'data/types';

import { LoginContext } from './LoginContext';
import { TokensPricesContext } from './TokensPricesContext';

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

    const [isAmountsLoaded, setIsAmountsLoaded] = useState(false);
    const [isBalancesLoading, setIsBalancesLoading] = useState(false);
    const [amounts, setAmounts] = useState({});
    const [tokens, setTokens] = useState([...initialTokensValues.map(token => ({
        icon: token.icon,
        amount: token.amount,
        balance: token.balance,
        imgSrc: token.imgSrc
    }))]);

    const fetchInterval = 60; // seconds

    useEffect(() => {
        let mounted = true;
        let getAmounts;
        let interval;

        if (activeAddress) {
            getAmounts = async function () {
                setIsAmountsLoaded(false);

                const [fudAmount, fomoAmount, alphaAmount, kekAmount, gltrAmount, gshtAmount] = await getTokensAmounts(activeAddress);

                if (mounted) {
                    setAmounts({
                        [TokenTypes.Fud]: fudAmount,
                        [TokenTypes.Fomo]: fomoAmount,
                        [TokenTypes.Alpha]: alphaAmount,
                        [TokenTypes.Kek]: kekAmount,
                        [TokenTypes.Gltr]: gltrAmount,
                        [TokenTypes.Ghst]: gshtAmount
                    });
                    setIsAmountsLoaded(true);
                }
            };

            getAmounts();

            interval = setInterval(() => {
                getAmounts();
            }, fetchInterval * 1000);
        }

        return () => {
            mounted = false;

            clearInterval(interval);
        };
    }, [activeAddress]);

    useEffect(() => {
        let mounted = true;

        setIsBalancesLoading(!(isAmountsLoaded && isPricesLoaded));

        if (isAmountsLoaded && isPricesLoaded) {
            const tokens = [
                {
                    key: TokenTypes.Fud,
                    icon: <FudTokenIcon height={14} width={14} />,
                    amount: amounts[TokenTypes.Fud],
                    pricePerToken: tokensPrices[TokenTypes.Fud].toFixed(3),
                    balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Fud] * amounts[TokenTypes.Fud]),
                    swapUrl: generateSwapUrl(FUD_CONTRACT, GHST_CONTRACT)
                },
                {
                    key: TokenTypes.Fomo,
                    icon: <FomoTokenIcon height={14} width={14} />,
                    amount: amounts[TokenTypes.Fomo],
                    pricePerToken: tokensPrices[TokenTypes.Fomo].toFixed(3),
                    balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Fomo] * amounts[TokenTypes.Fomo]),
                    swapUrl: generateSwapUrl(FOMO_CONTRACT, GHST_CONTRACT)
                },
                {
                    key: TokenTypes.Alpha,
                    icon: <AlphaTokenIcon height={14} width={14} />,
                    amount: amounts[TokenTypes.Alpha],
                    pricePerToken: tokensPrices[TokenTypes.Alpha].toFixed(3),
                    balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Alpha] * amounts[TokenTypes.Alpha]),
                    swapUrl: generateSwapUrl(ALPHA_CONTRACT, GHST_CONTRACT)
                },
                {
                    key: TokenTypes.Kek,
                    icon: <KekTokenIcon height={14} width={14} />,
                    amount: amounts[TokenTypes.Kek],
                    pricePerToken: tokensPrices[TokenTypes.Kek].toFixed(2),
                    balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Kek] * amounts[TokenTypes.Kek]),
                    swapUrl: generateSwapUrl(KEK_CONTRACT, GHST_CONTRACT)
                },
                {
                    key: TokenTypes.Gltr,
                    icon: <GltrTokenIcon height={14} width={14} />,
                    amount: amounts[TokenTypes.Gltr],
                    pricePerToken: tokensPrices[TokenTypes.Gltr].toFixed(5),
                    balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Gltr] * amounts[TokenTypes.Gltr]),
                    swapUrl: generateSwapUrl(GLTR_CONTRACT, GHST_CONTRACT)
                },
                {
                    key: TokenTypes.Ghst,
                    icon: <GhstTokenIcon height={14} width={14} />,
                    amount: amounts[TokenTypes.Ghst],
                    pricePerToken: tokensPrices[TokenTypes.Ghst].toFixed(2),
                    balance: commonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Ghst] * amounts[TokenTypes.Ghst]),
                    swapUrl: generateSwapUrl(GHST_CONTRACT, DAI_CONTRACT)
                }
            ];

            if (mounted) {
                setTokens(tokens);
                setIsBalancesLoading(false);
            }
        }

        return () => mounted = false;
    }, [isAmountsLoaded, isPricesLoaded]);

    const getTokensAmounts = (address) => {
        return Promise.all([
            alchemicaApi.getFudBalance(address),
            alchemicaApi.getFomoBalance(address),
            alchemicaApi.getAlphaBalance(address),
            alchemicaApi.getKekBalance(address),
            alchemicaApi.getGltrBalance(address),
            ghstApi.getBalanceOf(address)
        ]);
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
