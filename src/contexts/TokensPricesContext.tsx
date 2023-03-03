import { createContext, useEffect, useState } from 'react';

import {
  ALLOY_TOKENID,
  ALPHA_CONTRACT,
  ESSENCE_TOKENID,
  Erc1155Categories,
  FOMO_CONTRACT,
  FUD_CONTRACT,
  GHST_CONTRACT,
  GLTR_CONTRACT,
  KEK_CONTRACT,
  TokenTypes,
  USDC_CONTRACT,
  WMATIC_CONTRACT
} from 'shared/constants';
import { EthersApi, QuickswapApi, TheGraphApi } from 'api';
import { Erc1155ListingsBatch } from 'shared/models';
import { ForgeItems } from 'shared/models/forgeItems.model';

export const TokensPricesContext = createContext({});

// TODO add types
export const TokensPricesContextProvider = (props) => {
  const [isPricesLoaded, setIsPricesLoaded] = useState(false);
  const [tokensPrices, setTokensPrices] = useState({});
  const [ERC1155Ids, setERC1155Ids] = useState<number[]>([0]);
  const fetchInterval = 300; // seconds

  useEffect(() => {
    const getTokensPrices = async function () {
      setIsPricesLoaded(false);
      const alloyPrice = await getAlloyAndPriceToToken();
      const essencePrice = await getAlloyAndPriceToToken();
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
      setTokensPrices({
        [TokenTypes.Fud]: fudPrice,
        [TokenTypes.Fomo]: fomoPrice,
        [TokenTypes.Alpha]: alphaPrice,
        [TokenTypes.Kek]: kekPrice,
        [TokenTypes.Gltr]: gltrPrice,
        [TokenTypes.Alloy]: alloyPrice,
        [TokenTypes.Essence]: essencePrice,
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

    return [ghstPriceToToken, ghst];
  };

  const getAlloyAndPriceToToken = async () => {
    setERC1155Ids([ALLOY_TOKENID, ESSENCE_TOKENID]);
    const forgeItems = Promise.all([
      TheGraphApi.getErc1155ListingsBatchQuery(
        ERC1155Ids,
        Erc1155Categories.ForgeItems,
        true,
        'timeLastPurchased',
        'desc'
      ),
      TheGraphApi.getErc1155ListingsBatchQuery(ERC1155Ids, Erc1155Categories.ForgeItems, false, 'priceInWei', 'asc')
    ])
      .then(([lastSoldListings, currentListings]: [Erc1155ListingsBatch, Erc1155ListingsBatch]) => {
        const listingPrices: number[] = [];

        Object.keys(lastSoldListings).forEach((key: string, index: number) => {
          const listingPrice: number = currentListings[key][0]
            ? Number(EthersApi.fromWei(currentListings[key][0]?.priceInWei))
            : 0;

          listingPrices.push(listingPrice);

          forgeItems[index] = {
            ...forgeItems[index],
            lastSoldListing: {
              id: lastSoldListings[key][0] ? Number(lastSoldListings[key][0].id) : null,
              price: lastSoldListings[key][0] ? Number(EthersApi.fromWei(lastSoldListings[key][0].priceInWei)) : 0,
              soldDate: lastSoldListings[key][0]?.timeLastPurchased
                ? new Date(Number(lastSoldListings[key][0].timeLastPurchased) * 1000).toJSON()
                : null
            },
            currentListing: {
              id: currentListings[key][0] ? Number(currentListings[key][0].id) : null,
              price: currentListings[key][0] ? Number(EthersApi.fromWei(currentListings[key][0].priceInWei)) : 0
            },
            listingPrice: currentListings[key][0] ? Number(EthersApi.fromWei(currentListings[key][0]?.priceInWei)) : 0
          };
        });

        const maxListingPrice: number = Math.max(...listingPrices);

        dispatch(setMaxForgeItemsPrice(maxListingPrice));
        dispatch(setForgeItemsPrices(forgeItemsCopy));
      })
      .catch((error) => console.log(error));

    // todo - get price of alloy from best effective and cheapest smelted wearable alloy forge cost 100%*0.9
    const GhstPriceToToken = 0.051;

    return GhstPriceToToken;
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
