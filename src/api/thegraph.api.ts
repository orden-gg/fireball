import { ApolloClient, DefaultOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { gql } from '@apollo/client';

import { EthersApi } from './ethers.api';
import { TheGraphCoreApi } from './the-graph-core.api';

import { GRAPH_CORE_API, GRAPH_FIREBALL_API, GRAPH_FIREBALL_MAIN_API } from 'shared/constants';
import {
  Erc1155ListingsBatch,
  FireballErc1155Item,
  FireballGotchi,
  Gotchi,
  SalesHistoryModel,
  TheGraphResponse
} from 'shared/models';

import { ItemUtils } from 'utils';

import { gotchiQuery, playerInventoryQuery } from './common/fireballMain.queries';
import {
  activeListingQeury,
  auctionQuery,
  borrowedByAddressQuery,
  erc721SalesHistory,
  erc1155ListingsBatchQuery,
  erc1155Query,
  getParcelOrderDirectionQuery,
  gotchiByIdBatchQuery,
  gotchiByIdQuery,
  gotchiesQuery,
  gotchisGotchiverseQuery,
  lendingsByAddressQuery,
  lendingsQuery,
  listedParcelsQuery,
  parcelQuery,
  parcelsGotchiverseQuery,
  parcelsOwnerGotchiverseQuery,
  portalsQueryByAddress,
  raffleEntrantsQuery,
  raffleQuery,
  raffleWinsQuery,
  realmQuery,
  realmQueryByDistrict,
  svgQuery,
  userOwnedGotchisQuery,
  userQuery
} from './common/queries';

const raffleAPI = 'https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-raffles';
const gotchiSvgAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg';
const realmAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-realm-matic';
const gotchiverseAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/gotchiverse-matic';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
};

const clientFactory = (() => {
  const createClient = (uri: string): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
      uri,
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions
    });
  };

  return {
    client: createClient(GRAPH_CORE_API),
    raffleClient: createClient(raffleAPI),
    svgsClient: createClient(gotchiSvgAPI),
    realmClient: createClient(realmAPI),
    gotchiverseClient: createClient(gotchiverseAPI),
    fireballClient: createClient(GRAPH_FIREBALL_API),
    fireballMainClient: createClient(GRAPH_FIREBALL_MAIN_API)
  };
})();

// single query requests
const getGraphData = async (client: CustomAny, query: string): Promise<CustomAny> => {
  try {
    return await client.query({
      query: gql`
        ${query}
      `
    });
  } catch (error) {
    console.error(error);

    return [];
  }
};

// multi query requests
const graphJoin = async (client: CustomAny, queries: CustomAny[]): Promise<CustomAny> => {
  try {
    return await new Promise((resolve) => {
      const queriesCounter = queries.length;
      let requestCounter: number = 0;
      const responseArray: CustomAny[] = [];

      for (let i = 0; i < queriesCounter; i++) {
        raiseCounter();
        responseArray.push(
          client
            .query({
              query: gql`
                ${queries[i]}
              `
            })
            .then((response: CustomAny) => {
              responseArray[i] = response;
              lowerCounter();
              checkRequestsResult();
            })
        );
      }

      function checkRequestsResult() {
        if (requestCounter === 0 && responseArray.length === queries.length) {
          resolve(responseArray);
        }
      }

      function raiseCounter() {
        requestCounter++;
      }

      function lowerCounter() {
        requestCounter--;
      }
    });
  } catch (error) {
    console.error(error);

    return [];
  }
};

// filtering of combined graph data from duplicates
const filterCombinedGraphData = (
  response: CustomAny,
  datasetRoute: CustomAny,
  uniqueIdentifier: CustomAny
): CustomAny[] => {
  let responseArray: CustomAny[] = [];

  const getProperChild = (item: CustomAny, route: CustomAny): CustomAny => {
    const routeCache = [...route];

    const getNestedChild = (item: CustomAny, routeCache: CustomAny): CustomAny => {
      const current = routeCache[0];

      if (routeCache.length > 1) {
        routeCache.splice(0, 1);

        return getNestedChild(item[current], routeCache);
      } else {
        return item[current];
      }
    };

    return getNestedChild(item, routeCache);
  };

  for (let i = 0; i < response.length; i++) {
    responseArray = [...getProperChild(response[i].data, datasetRoute), ...responseArray];
  }

  return responseArray.reduce((unique, item) => {
    const index: number = unique.findIndex((el: CustomAny) => el[uniqueIdentifier] === item[uniqueIdentifier]);

    if (index === -1) {
      unique.push(item);
    }

    return unique;
  }, []);
};

// NOTE: Temporary solution to resolve subgraph issue with withSetsNumericTraits data (it's not correct)
const modifyTraits = (gotchis: CustomAny): CustomAny => {
  const gotchisCache: CustomAny[] = [...gotchis];

  return gotchisCache.map((gotchi) => {
    const gotchiCache = { ...gotchi };

    if (gotchiCache.equippedSetID && ItemUtils.isExistingSetId(gotchiCache.equippedSetID)) {
      const modifiers = ItemUtils.getSetModifiers(gotchiCache.equippedSetID);
      const brsBoots = modifiers.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);

      gotchiCache.modifiedRarityScore = +gotchiCache.modifiedRarityScore + brsBoots;
      gotchiCache.modifiedNumericTraits = gotchiCache.modifiedNumericTraits.map((item: CustomAny, index: number) => {
        return index > 3 ? item : item + modifiers[index + 1];
      });
    }

    return gotchiCache;
  });
};

export class TheGraphApi {
  public static async getData(query: CustomAny, api?: string): Promise<CustomAny> {
    return await TheGraphCoreApi.getGraphData(api ? api : GRAPH_CORE_API, query);
  }

  public static async getJoinedData(queries: CustomAny): Promise<CustomAny> {
    return await graphJoin(clientFactory.client, queries);
  }

  public static async getAllGotchies(): Promise<CustomAny> {
    return await graphJoin(clientFactory.client, TheGraphApi.getGotchiQueries()).then((response) => {
      const filteredArray = filterCombinedGraphData(response, ['aavegotchis'], 'id');

      return modifyTraits(filteredArray);
    });
  }

  public static getGotchiById(id: number): Promise<CustomAny> {
    return this.getData(gotchiByIdQuery(id)).then((response: CustomAny) => {
      return modifyTraits([response.data.aavegotchi])[0];
    });
  }

  public static getGotchiesByIds(ids: number[]): Promise<Gotchi[]> {
    const getQuery = (ids: number[]): string => {
      const queries: string[] = ids.map((id: number) => gotchiByIdBatchQuery(id));

      return `{${queries.join(',')}}`;
    };

    return TheGraphApi.getData(getQuery(ids)).then((response: TheGraphResponse<Gotchi[]>) => response.data);
  }

  private static getGotchiQueries(): CustomAny[] {
    const maxPossibleSkips = 6; // TODO: 12000 limitation per haunt
    const queries: CustomAny[] = [];

    for (let i = 0; i < maxPossibleSkips; i++) {
      queries.push(gotchiesQuery(i * 1000, 'asc', 1));
      queries.push(gotchiesQuery(i * 1000, 'desc', 1));
      queries.push(gotchiesQuery(i * 1000, 'asc', 2));
      queries.push(gotchiesQuery(i * 1000, 'desc', 2));
    }

    return queries;
  }

  public static getOwnedGotchis(address: string): Promise<CustomAny> {
    const getQueries = () => {
      const queries: CustomAny = [];

      for (let i = 0; i < 5; i++) {
        queries.push(userOwnedGotchisQuery(address.toLowerCase(), i * 1000));
      }

      return queries;
    };

    return graphJoin(clientFactory.client, getQueries()).then((response) => {
      if (!response[0].data.user) {
        return []; // terminate if thegraph has no data about address
      }

      const filteredArray: CustomAny[] = filterCombinedGraphData(response, ['user', 'gotchisOwned'], 'id');

      return modifyTraits(filteredArray);
    });
  }

  public static async getGotchisByAddress(address: string): Promise<CustomAny> {
    const getQueries = () => {
      const queries: CustomAny = [];

      for (let i = 0; i < 5; i++) {
        queries.push(userQuery(address.toLowerCase(), i * 1000));
      }

      return queries;
    };

    return await graphJoin(clientFactory.client, getQueries()).then((response) => {
      if (!response[0].data.user) {
        return []; // terminate if thegraph has no data about address
      }

      const filteredArray: CustomAny[] = filterCombinedGraphData(response, ['user', 'gotchisOriginalOwned'], 'id');

      return modifyTraits(filteredArray);
    });
  }

  public static getGotchisByAddresses(addresses: string[]): Promise<CustomAny[]> {
    const promises: Promise<CustomAny>[] = addresses.map((address) => TheGraphApi.getGotchisByAddress(address));
    const ownedPromises: Promise<CustomAny>[] = addresses.map((address) => TheGraphApi.getOwnedGotchis(address));

    return Promise.all(promises.concat(ownedPromises)).then((response: CustomAny[]) =>
      response.reduce((result, current) => result.concat(current), [])
    );
  }

  public static async getErc1155Price(
    id: CustomAny,
    sold: CustomAny,
    category: CustomAny,
    orderBy: CustomAny,
    orderDireciton: CustomAny
  ): Promise<CustomAny> {
    return await TheGraphApi.getData(erc1155Query(id, sold, category, orderBy, orderDireciton))
      .then((response: CustomAny) => {
        const erc1155: CustomAny = response.data.erc1155Listings;

        return {
          listing: erc1155[0]?.id || null,
          price: erc1155[0]?.priceInWei ? +EthersApi.fromWei(erc1155[0].priceInWei) : 0,
          lastSale: erc1155[0]?.timeLastPurchased || null
        };
      })
      .catch((error) => console.log(error));
  }

  public static async getErc1155ListingsBatchQuery(
    ids: number[],
    category: string,
    isSold: boolean,
    orderBy: string,
    orderDireciton: string
  ): Promise<Erc1155ListingsBatch> {
    const getQuery = (ids: number[], category: string): string => {
      const queries: string[] = ids.map((id: number) =>
        erc1155ListingsBatchQuery(id, category, isSold, orderBy, orderDireciton)
      );

      return `{${queries.join(',')}}`;
    };

    return TheGraphApi.getData(getQuery(ids, category)).then(
      (response: TheGraphResponse<Erc1155ListingsBatch>) => response.data
    );
  }

  private static async getRaffleData(query: string): Promise<CustomAny> {
    return await getGraphData(clientFactory.raffleClient, query);
  }

  public static async getRaffle(id: string): Promise<CustomAny> {
    return await TheGraphApi.getRaffleData(raffleQuery(id)).then((response) => {
      const data: CustomAny[] = [];
      const total: CustomAny = response.data.raffles[0].stats;
      const prizes: CustomAny = response.data.raffles[0].ticketPools;

      prizes.forEach((pool: CustomAny) => {
        data.push({
          id: pool.id,
          items: pool.prizes.reduce((a: CustomAny, b: CustomAny) => a + +b.quantity, 0),
          prizes: pool.prizes.map((item: CustomAny) => ({
            id: item.id.split('-')[1],
            quantity: item.quantity
          }))
        });
      });

      return [data, total];
    });
  }

  public static async getRaffleEntered(address: string, raffle: CustomAny): Promise<CustomAny> {
    return await TheGraphApi.getRaffleData(raffleEntrantsQuery(address.toLowerCase())).then((response: CustomAny) => {
      const data: CustomAny[] = [];
      const received: CustomAny = JSON.parse(JSON.stringify(response.data.raffleEntrants));

      const filtered: CustomAny[] = received.filter((item: CustomAny) => +item.raffle.id === raffle);

      const merged: CustomAny = filtered.reduce((items, current) => {
        const duplicated: CustomAny = items.find((item: CustomAny) => item.ticketId === current.ticketId);

        if (duplicated) {
          duplicated.quantity = +duplicated.quantity + +current.quantity;

          return items;
        }

        return items.concat(current);
      }, []);

      merged.forEach((item: CustomAny) => {
        data.push({
          ticketId: item.ticketId,
          quantity: item.quantity
        });
      });

      return data;
    });
  }

  public static async getRaffleWins(address: string, raffle: CustomAny): Promise<CustomAny> {
    return await TheGraphApi.getRaffleData(raffleWinsQuery(address.toLowerCase())).then((response: CustomAny) => {
      const data: CustomAny[] = [];

      const received: CustomAny = JSON.parse(JSON.stringify(response.data.raffleWinners));
      const filtered: CustomAny = received.filter((item: CustomAny) => +item.raffle.id === raffle);

      filtered.forEach((item: CustomAny) => {
        data.push({
          itemId: item.item.id.substring(2),
          quantity: item.quantity
        });
      });

      return data;
    });
  }

  public static async getGotchiSvgById(id: CustomAny): Promise<CustomAny> {
    return await getGraphData(clientFactory.svgsClient, svgQuery(id));
  }

  private static async getRealmData(query: CustomAny): Promise<CustomAny> {
    return await getGraphData(clientFactory.realmClient, query);
  }

  public static async getRealmByAddress(address: string): Promise<CustomAny> {
    function getQueries() {
      const queries: CustomAny[] = [];

      for (let i = 0; i < 5; i++) {
        queries.push(realmQuery(address.toLowerCase(), i * 1000));
      }

      return queries;
    }

    return await graphJoin(clientFactory.fireballClient, getQueries()).then((response) => {
      return filterCombinedGraphData(response, ['parcels'], 'id');
    });
  }

  public static getRealmByAddresses(addresses: string[]): Promise<CustomAny[]> {
    const promises: Promise<CustomAny>[] = addresses.map((address) => TheGraphApi.getRealmByAddress(address));

    return Promise.all(promises).then((response: CustomAny) =>
      response.reduce((result: CustomAny, current: CustomAny) => result.concat(current), [])
    );
  }

  // TODO check if needed
  public static async getRealmByDistrict(district: CustomAny): Promise<CustomAny> {
    function getQueries() {
      const queries: CustomAny[] = [];

      for (let i = 0; i < 5; i++) {
        queries.push(realmQueryByDistrict(i * 1000, district));
      }

      return queries;
    }

    return await graphJoin(clientFactory.client, getQueries()).then((response: CustomAny) => {
      return filterCombinedGraphData(response, ['parcels'], 'tokenId');
    });
  }

  public static async getRealmById(id: string): Promise<CustomAny> {
    return await TheGraphApi.getData(parcelQuery(id), GRAPH_FIREBALL_API).then((response: CustomAny) => {
      return response.data.parcel;
    });
  }

  public static async getErc721SalesHistory(id: number, category: string): Promise<SalesHistoryModel[]> {
    return await TheGraphApi.getData(erc721SalesHistory(id, category)).then((response: CustomAny) => {
      return response.data.erc721Listings;
    });
  }

  public static async getActiveListing(
    erc: CustomAny,
    id: string,
    type: CustomAny,
    category: CustomAny
  ): Promise<CustomAny> {
    return await TheGraphApi.getData(activeListingQeury(erc, id, type, category)).then((response: CustomAny) => {
      return response.data.erc721Listings[0];
    });
  }

  public static getParcelPriceByDirection(data: CustomAny): Promise<CustomAny> {
    return TheGraphApi.getData(getParcelOrderDirectionQuery(data)).then((response: CustomAny) => {
      return EthersApi.fromWei(response.data.erc721Listings[0].priceInWei);
    });
  }

  // TODO check if needed
  public static async getRealmAuctionPrice(id: string): Promise<CustomAny> {
    return await TheGraphApi.getRealmData(auctionQuery(id)).then((response: CustomAny) => {
      const erc721: CustomAny = response.data.auctions;

      return {
        price: erc721[0]?.highestBid / 10 ** 18 || 0
      };
    });
  }

  public static async getAllListedParcels(): Promise<CustomAny> {
    return await graphJoin(clientFactory.client, TheGraphApi.getListedParcelsQueries()).then((response: CustomAny) => {
      return filterCombinedGraphData(response, ['erc721Listings'], 'id');
    });
  }

  private static getListedParcelsQueries() {
    const sizes: number[] = [0, 1, 2, 3];
    const queries: CustomAny[] = [];

    sizes.forEach((size) => {
      for (let i = 0; i < 5; i++) {
        queries.push(listedParcelsQuery(i * 1000, 'asc', size));
        queries.push(listedParcelsQuery(i * 1000, 'desc', size));
      }
    });

    return queries;
  }

  public static async getLendings(): Promise<CustomAny> {
    function getQueries() {
      const queries: CustomAny[] = [];

      for (let i = 0; i < 6; i++) {
        queries.push(lendingsQuery(i * 1000, 'asc'));
        queries.push(lendingsQuery(i * 1000, 'desc'));
      }

      return queries;
    }

    return await graphJoin(clientFactory.client, getQueries())
      .then((response: CustomAny) => {
        const filteredArray: CustomAny[] = filterCombinedGraphData(response, ['gotchiLendings'], 'id').map(
          (item: CustomAny) => ({
            ...item,
            ...item.gotchi,
            lendingId: item.id
          })
        );

        return filteredArray;
      })
      .catch((e) => console.log(e));
  }

  public static async getLendingsByAddress(address: string): Promise<CustomAny> {
    function getQueries() {
      const queries: CustomAny[] = [];

      for (let i = 0; i < 6; i++) {
        queries.push(lendingsByAddressQuery(address.toLowerCase(), i * 1000));
      }

      return queries;
    }

    return await graphJoin(clientFactory.client, getQueries()).then((response: CustomAny) => {
      const filteredArray: CustomAny[] = filterCombinedGraphData(response, ['gotchiLendings'], 'id').map(
        (item: CustomAny) => ({
          ...item,
          ...item.gotchi,
          lendingId: item.id
        })
      );

      return filteredArray;
    });
  }

  public static async getBorrowedByAddress(address: string): Promise<CustomAny> {
    function getQueries() {
      const queries: CustomAny[] = [];

      for (let i = 0; i < 1; i++) {
        queries.push(borrowedByAddressQuery(address.toLowerCase(), i * 1000));
      }

      return queries;
    }

    return await graphJoin(clientFactory.client, getQueries()).then((response: CustomAny) => {
      const filteredArray: CustomAny[] = filterCombinedGraphData(response, ['gotchiLendings'], 'id').map(
        (item: CustomAny) => ({
          ...item,
          ...item.gotchi,
          lendingId: item.id
        })
      );

      return filteredArray;
    });
  }

  public static async getPortalsByAddress(seller: string): Promise<CustomAny> {
    return await TheGraphApi.getData(portalsQueryByAddress(seller))
      .then((response: CustomAny) => response.data.portals)
      .catch((error: CustomAny) => console.log(error));
  }

  // ! GOTCHIVERSE

  // TODO check if needed
  public static getGotchisGotchiverseInfoByIds(gotchiIds: string[]): Promise<CustomAny> {
    return getGraphData(clientFactory.gotchiverseClient, gotchisGotchiverseQuery(gotchiIds)).then((res: CustomAny) => {
      const dataArr = res.data.gotchis;

      // * gotchiverse return empty data if gotchi never channeled alchemica!
      return gotchiIds.map((id, i) => ({
        id: id,
        lastChanneled: Number(dataArr[i]?.lastChanneledAlchemica) || 0
      }));
    });
  }

  // TODO check if needed
  public static getParcelsGotchiverseInfoByIds(parcelsIds: CustomAny[]): Promise<CustomAny> {
    return getGraphData(clientFactory.gotchiverseClient, parcelsGotchiverseQuery(parcelsIds)).then((res: CustomAny) => {
      const dataArr: CustomAny = res.data.parcels;

      // * gotchiverse return empty data if parcel was never channeled!
      const modified: CustomAny = parcelsIds.map((id: CustomAny, i: number) => ({
        id: dataArr[i]?.id || '',
        lastChanneled: Number(dataArr[i]?.lastChanneledAlchemica) || 0,
        installations: dataArr[i]?.equippedInstallations || []
      }));

      return modified;
    });
  }

  public static getParcelsGotchiverseInfoByOwner(owner: string): Promise<CustomAny> {
    return getGraphData(clientFactory.gotchiverseClient, parcelsOwnerGotchiverseQuery(owner)).then(
      (res: CustomAny) => res.data.parcels
    );
  }

  // Will be used more than once
  public static getIventoryByAddress(address: string): Promise<FireballErc1155Item[]> {
    return getGraphData(clientFactory.fireballMainClient, playerInventoryQuery(address)).then(
      (res: TheGraphResponse<{ player: { items: FireballErc1155Item[] } }>) => res.data.player.items
    );
  }

  public static getFireballGotchiById(id: number): Promise<FireballGotchi> {
    return getGraphData(clientFactory.fireballMainClient, gotchiQuery(id)).then(
      (res: TheGraphResponse<{ gotchi: FireballGotchi }>) => modifyTraits([res.data.gotchi])[0]
    );
  }
}
