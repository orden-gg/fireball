import { createContext, useEffect, useState } from 'react';

import { AlchemicaApi, GhstApi, MaticApi } from 'api';
import {
  ALPHA_CONTRACT,
  FOMO_CONTRACT,
  FUD_CONTRACT,
  GHST_CONTRACT,
  GLTR_CONTRACT,
  KEK_CONTRACT,
  USDC_CONTRACT
} from 'shared/constants/api.constants';

import { useAppSelector } from 'core/store/hooks';
import { getActiveAddress } from 'core/store/login';
import * as fromTokensPricesStore from 'core/store/tokens-prices';

import { TokenTypes } from 'shared/constants';

import {
  AlphaTokenIcon,
  FomoTokenIcon,
  FudTokenIcon,
  GhstTokenIcon,
  GltrTokenIcon,
  KekTokenIcon,
  MaticTokenIcon
} from 'components/Icons/Icons';

import { CommonUtils } from 'utils';

import { useAppDispatch } from '../core/store/hooks';

export const BalancesContext = createContext({});

export const BalancesContextProvider = (props: CustomAny) => {
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
    },
    {
      icon: <MaticTokenIcon height={14} width={14} />,
      amount: 0,
      balance: 0
    }
  ];

  const dispatch = useAppDispatch();
  const activeAddress = useAppSelector(getActiveAddress);

  const isPricesLoaded: boolean = useAppSelector(fromTokensPricesStore.getIsPricesLoaded);
  const tokensPrices: {
    [key in TokenTypes]: number;
  } = useAppSelector(fromTokensPricesStore.getTokensPrices);

  const [isAmountsLoaded, setIsAmountsLoaded] = useState<boolean>(false);
  const [isBalancesLoading, setIsBalancesLoading] = useState<boolean>(false);
  const [amounts, setAmounts] = useState<CustomAny>({});
  const [tokens, setTokens] = useState<CustomAny[]>([
    ...initialTokensValues.map((token) => ({
      amount: token.amount,
      balance: token.balance,
      icon: token.icon
    }))
  ]);

  const fetchInterval = 60; // seconds

  useEffect(() => {
    let mounted = true;
    let getAmounts: CustomAny;
    let interval: NodeJS.Timer;

    if (activeAddress) {
      getAmounts = async function() {
        setIsAmountsLoaded(false);

        const [
          fudAmount,
          fomoAmount,
          alphaAmount,
          kekAmount,
          gltrAmount,
          gshtAmount,
          maticAmount
        ] = await getTokensAmounts(activeAddress);

        if (mounted) {
          setAmounts({
            [TokenTypes.Fud]: fudAmount,
            [TokenTypes.Fomo]: fomoAmount,
            [TokenTypes.Alpha]: alphaAmount,
            [TokenTypes.Kek]: kekAmount,
            [TokenTypes.Gltr]: gltrAmount,
            [TokenTypes.Ghst]: gshtAmount,
            [TokenTypes.Matic]: maticAmount
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
    dispatch(fromTokensPricesStore.onLoadTokensPrices());
  }, []);

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
          balance: CommonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Fud] * amounts[TokenTypes.Fud]),
          swapUrl: generateSwapUrl(FUD_CONTRACT, GHST_CONTRACT)
        },
        {
          key: TokenTypes.Fomo,
          icon: <FomoTokenIcon height={14} width={14} />,
          amount: amounts[TokenTypes.Fomo],
          pricePerToken: tokensPrices[TokenTypes.Fomo].toFixed(3),
          balance: CommonUtils.convertFloatNumberToSuffixNumber(
            tokensPrices[TokenTypes.Fomo] * amounts[TokenTypes.Fomo]
          ),
          swapUrl: generateSwapUrl(FOMO_CONTRACT, GHST_CONTRACT)
        },
        {
          key: TokenTypes.Alpha,
          icon: <AlphaTokenIcon height={14} width={14} />,
          amount: amounts[TokenTypes.Alpha],
          pricePerToken: tokensPrices[TokenTypes.Alpha].toFixed(3),
          balance: CommonUtils.convertFloatNumberToSuffixNumber(
            tokensPrices[TokenTypes.Alpha] * amounts[TokenTypes.Alpha]
          ),
          swapUrl: generateSwapUrl(ALPHA_CONTRACT, GHST_CONTRACT)
        },
        {
          key: TokenTypes.Kek,
          icon: <KekTokenIcon height={14} width={14} />,
          amount: amounts[TokenTypes.Kek],
          pricePerToken: tokensPrices[TokenTypes.Kek].toFixed(3),
          balance: CommonUtils.convertFloatNumberToSuffixNumber(tokensPrices[TokenTypes.Kek] * amounts[TokenTypes.Kek]),
          swapUrl: generateSwapUrl(KEK_CONTRACT, GHST_CONTRACT)
        },
        {
          key: TokenTypes.Gltr,
          icon: <GltrTokenIcon height={14} width={14} />,
          amount: amounts[TokenTypes.Gltr],
          pricePerToken: tokensPrices[TokenTypes.Gltr].toFixed(5),
          balance: CommonUtils.convertFloatNumberToSuffixNumber(
            tokensPrices[TokenTypes.Gltr] * amounts[TokenTypes.Gltr]
          ),
          swapUrl: generateSwapUrl(GLTR_CONTRACT, GHST_CONTRACT)
        },
        {
          key: TokenTypes.Ghst,
          icon: <GhstTokenIcon height={14} width={14} />,
          amount: amounts[TokenTypes.Ghst],
          pricePerToken: tokensPrices[TokenTypes.Ghst].toFixed(2),
          balance: CommonUtils.convertFloatNumberToSuffixNumber(
            tokensPrices[TokenTypes.Ghst] * amounts[TokenTypes.Ghst]
          ),
          swapUrl: generateSwapUrl(GHST_CONTRACT, USDC_CONTRACT)
        },
        {
          key: TokenTypes.Matic,
          icon: <MaticTokenIcon height={14} width={14} />,
          amount: amounts[TokenTypes.Matic],
          pricePerToken: tokensPrices[TokenTypes.Matic].toFixed(2),
          balance: CommonUtils.convertFloatNumberToSuffixNumber(
            tokensPrices[TokenTypes.Matic] * amounts[TokenTypes.Matic]
          ),
          swapUrl: generateSwapUrl('ETH', GHST_CONTRACT)
        }
      ];

      if (mounted) {
        setTokens(tokens);
        setIsBalancesLoading(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [isAmountsLoaded, isPricesLoaded]);

  const getTokensAmounts = (address) => {
    return Promise.all([
      AlchemicaApi.getFudBalance(address),
      AlchemicaApi.getFomoBalance(address),
      AlchemicaApi.getAlphaBalance(address),
      AlchemicaApi.getKekBalance(address),
      AlchemicaApi.getGltrBalance(address),
      GhstApi.getBalanceOf(address),
      MaticApi.getBalanceOf(address)
    ]);
  };

  const generateSwapUrl = (inputToken: CustomAny, outputToken: CustomAny): string => {
    return `https://quickswap.exchange/#/swap?currency0=${inputToken}&currency1=${outputToken}`;
  };

  return (
    <BalancesContext.Provider
      value={{
        tokens,
        isBalancesLoading
      }}
    >
      {props.children}
    </BalancesContext.Provider>
  );
};
