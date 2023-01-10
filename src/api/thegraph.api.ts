import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, DefaultOptions } from '@apollo/client';
import { gql } from '@apollo/client';
import fetch from 'cross-fetch';

import { Erc1155ListingsBatch, SalesHistoryModel, TheGraphResponse } from 'shared/models';
import { InstallationsUtils, ItemUtils } from 'utils';

import { EthersApi } from './ethers.api';
import {
    gotchiByIdQuery,
    gotchiesQuery,
    svgQuery,
    activeListingQeury,
    erc1155Query,
    erc1155ListingsBatchQuery,
    erc721ListingsBySeller,
    erc721SalesHistory,
    erc1155ListingsBySeller,
    userQuery,
    userOwnedGotchisQuery,
    realmQuery,
    auctionQuery,
    raffleQuery,
    raffleEntrantsQuery,
    raffleWinsQuery,
    listedParcelsQuery,
    parcelQuery,
    lendingsQuery,
    lendingsByAddressQuery,
    borrowedByAddressQuery,
    incomeQuery,
    getParcelOrderDirectionQuery,
    gotchisGotchiverseQuery,
    parcelsGotchiverseQuery,
    parcelsOwnerGotchiverseQuery,
    realmQueryByDistrict
} from './common/queries';
import { TheGraphCoreApi } from './the-graph-core.api';
import { GRAPH_CORE_API, GRAPH_FIREBALL_API } from 'shared/constants';

const coreAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic';
const raffleAPI = 'https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-raffles';
const gotchiSvgAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg';
const realmAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-realm-matic';
const gotchiverseAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/gotchiverse-matic';
const incomeAPI = 'https://api.thegraph.com/subgraphs/name/nicolasnin/gotchiincome';

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
    const createClient = (url: string): ApolloClient<NormalizedCacheObject> => {
        return new ApolloClient({
            link: new HttpLink({ uri: url, fetch }),
            cache: new InMemoryCache(),
            defaultOptions: defaultOptions
        });
    };

    return {
        client: createClient(coreAPI),
        raffleClient: createClient(raffleAPI),
        svgsClient: createClient(gotchiSvgAPI),
        realmClient: createClient(realmAPI),
        gotchiverseClient: createClient(gotchiverseAPI),
        incomeClient: createClient(incomeAPI),
        fireballClient: createClient(GRAPH_FIREBALL_API)
    };
})();

// single query requests
const getGraphData = async (client: any, query: string): Promise<any> => {
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
const graphJoin = async (client: any, queries: any[]): Promise<any> => {
    try {
        return await new Promise(resolve => {
            const queriesCounter = queries.length;
            let requestCounter: number = 0;
            const responseArray: any[] = [];

            for (let i = 0; i < queriesCounter; i++) {
                raiseCounter();
                responseArray.push(
                    client
                        .query({
                            query: gql`
                                ${queries[i]}
                            `
                        })
                        .then(response => {
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
const filterCombinedGraphData = (response: any, datasetRoute: any, uniqueIdentifier: any): any[] => {
    let responseArray: any[] = [];

    const getProperChild = (item: any, route: any): any => {
        const routeCache = [...route];

        const getNestedChild = (item: any, routeCache: any): any => {
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
        const index: number = unique.findIndex((el: any) => el[uniqueIdentifier] === item[uniqueIdentifier]);

        if (index === -1) {
            unique.push(item);
        }

        return unique;
    }, []);
};

// NOTE: Temporary solution to resolve subgraph issue with withSetsNumericTraits data (it's not correct)
const modifyTraits = (gotchis: any): any => {
    const gotchisCache: any[] = [...gotchis];

    return gotchisCache.map(gotchi => {
        const gotchiCache = { ...gotchi };

        if (gotchiCache.equippedSetID && ItemUtils.isExistingSetId(gotchiCache.equippedSetID)) {
            const modifiers = ItemUtils.getSetModifiers(gotchiCache.equippedSetID);
            const brsBoots = modifiers.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);

            gotchiCache.modifiedRarityScore = +gotchiCache.modifiedRarityScore + brsBoots;
            gotchiCache.modifiedNumericTraits = gotchiCache.modifiedNumericTraits.map((item, index) => {
                return index > 3 ? item : item + modifiers[index + 1];
            });
        }

        return gotchiCache;
    });
};

export class TheGraphApi {
    public static async getData(query: any, api?: string): Promise<any> {
        return await TheGraphCoreApi.getGraphData(api ? api : GRAPH_CORE_API, query);
    }

    public static async getJoinedData(queries: any): Promise<any> {
        return await graphJoin(clientFactory.client, queries);
    }

    public static async getAllGotchies(): Promise<any> {
        return await graphJoin(clientFactory.client, TheGraphApi.getGotchiQueries()).then(response => {
            const filteredArray = filterCombinedGraphData(response, ['aavegotchis'], 'id');

            return modifyTraits(filteredArray);
        });
    }

    public static getGotchiById(id: number): Promise<any> {
        return this.getData(gotchiByIdQuery(id)).then((response: any) => {
            return modifyTraits([response.data.aavegotchi])[0];
        });
    }

    public static getGotchiesByIds(ids: number[]): Promise<any> {
        return TheGraphApi.getJoinedData([...ids.map(id => gotchiByIdQuery(id))]);
    }

    private static getGotchiQueries(): any[] {
        const maxPossibleSkips = 6; // TODO: 12000 limitation per haunt
        const queries: any[] = [];

        for (let i = 0; i < maxPossibleSkips; i++) {
            queries.push(gotchiesQuery(i * 1000, 'asc', 1));
            queries.push(gotchiesQuery(i * 1000, 'desc', 1));
            queries.push(gotchiesQuery(i * 1000, 'asc', 2));
            queries.push(gotchiesQuery(i * 1000, 'desc', 2));
        }

        return queries;
    }

    public static getOwnedGotchis(address: string): Promise<any> {
        const getQueries = () => {
            const queries: any = [];

            for (let i = 0; i < 5; i++) {
                queries.push(userOwnedGotchisQuery(address.toLowerCase(), i * 1000));
            }

            return queries;
        };

        return graphJoin(clientFactory.client, getQueries()).then(response => {
            if (!response[0].data.user) {
                return []; // terminate if thegraph has no data about address
            }

            const filteredArray: any[] = filterCombinedGraphData(response, ['user', 'gotchisOwned'], 'id');

            return modifyTraits(filteredArray);
        });
    }

    public static async getGotchisByAddress(address: string): Promise<any> {
        const getQueries = () => {
            const queries: any = [];

            for (let i = 0; i < 5; i++) {
                queries.push(userQuery(address.toLowerCase(), i * 1000));
            }

            return queries;
        };

        return await graphJoin(clientFactory.client, getQueries()).then(response => {
            if (!response[0].data.user) {
                return []; // terminate if thegraph has no data about address
            }

            const filteredArray: any[] = filterCombinedGraphData(response, ['user', 'gotchisOriginalOwned'], 'id');

            return modifyTraits(filteredArray);
        });
    }

    public static getGotchisByAddresses(addresses: string[]): Promise<any[]> {
        const promises: Promise<any>[] = addresses.map(address => TheGraphApi.getGotchisByAddress(address));
        const ownedPromises: Promise<any>[] = addresses.map(address => TheGraphApi.getOwnedGotchis(address));

        return Promise.all(promises.concat(ownedPromises)).then((response: any[]) =>
            response.reduce((result, current) => result.concat(current), [])
        );
    }

    public static async getErc1155Price(
        id: any,
        sold: any,
        category: any,
        orderBy: any,
        orderDireciton: any
    ): Promise<any> {
        return await TheGraphApi.getData(erc1155Query(id, sold, category, orderBy, orderDireciton))
            .then((response: any) => {
                const erc1155: any = response.data.erc1155Listings;

                return {
                    listing: erc1155[0]?.id || null,
                    price: erc1155[0]?.priceInWei ? +EthersApi.fromWei(erc1155[0].priceInWei) : 0,
                    lastSale: erc1155[0]?.timeLastPurchased || null
                };
            })
            .catch(error => console.log(error));
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

    public static async getErc721ListingsBySeller(seller: any): Promise<any> {
        return await TheGraphApi.getData(erc721ListingsBySeller(seller))
            .then((response: any) => response.data.erc721Listings)
            .catch((error: any) => console.log(error));
    }

    public static async getErc1155ListingsBySeller(seller: any): Promise<any> {
        return await TheGraphApi.getData(erc1155ListingsBySeller(seller))
            .then((response: any) => response.data.erc1155Listings)
            .catch((error: any) => console.log(error));
    }

    private static async getRaffleData(query: string): Promise<any> {
        return await getGraphData(clientFactory.raffleClient, query);
    }

    public static async getRaffle(id: string): Promise<any> {
        return await TheGraphApi.getRaffleData(raffleQuery(id)).then(response => {
            const data: any[] = [];
            const total: any = response.data.raffles[0].stats;
            const prizes: any = response.data.raffles[0].ticketPools;

            prizes.forEach((pool: any) => {
                data.push({
                    id: pool.id,
                    items: pool.prizes.reduce((a, b) => a + +b.quantity, 0),
                    prizes: pool.prizes.map(item => ({
                        id: item.id.substring(2),
                        quantity: item.quantity
                    }))
                });
            });

            return [data, total];
        });
    }

    public static async getRaffleEntered(address: string, raffle: any): Promise<any> {
        return await TheGraphApi.getRaffleData(raffleEntrantsQuery(address.toLowerCase())).then((response: any) => {
            const data: any[] = [];
            const received: any = JSON.parse(JSON.stringify(response.data.raffleEntrants));

            const filtered: any[] = received.filter((item: any) => +item.raffle.id === raffle);

            const merged: any = filtered.reduce((items, current) => {
                const duplicated: any = items.find((item: any) => item.ticketId === current.ticketId);

                if (duplicated) {
                    duplicated.quantity = +duplicated.quantity + +current.quantity;

                    return items;
                }

                return items.concat(current);
            }, []);

            merged.forEach((item: any) => {
                data.push({
                    ticketId: item.ticketId,
                    quantity: item.quantity
                });
            });

            return data;
        });
    }

    public static async getRaffleWins(address: string, raffle: any): Promise<any> {
        return await TheGraphApi.getRaffleData(raffleWinsQuery(address.toLowerCase())).then((response: any) => {
            const data: any[] = [];

            const received: any = JSON.parse(JSON.stringify(response.data.raffleWinners));
            const filtered: any = received.filter((item: any) => +item.raffle.id === raffle);

            filtered.forEach((item: any) => {
                data.push({
                    itemId: item.item.id.substring(2),
                    quantity: item.quantity
                });
            });

            return data;
        });
    }

    public static async getGotchiSvgById(id: any): Promise<any> {
        return await getGraphData(clientFactory.svgsClient, svgQuery(id));
    }

    private static async getRealmData(query: any): Promise<any> {
        return await getGraphData(clientFactory.realmClient, query);
    }

    public static async getRealmByAddress(address: string): Promise<any> {
        function getQueries() {
            const queries: any[] = [];

            for (let i = 0; i < 5; i++) {
                queries.push(realmQuery(address.toLowerCase(), i * 1000));
            }

            return queries;
        }

        return await graphJoin(clientFactory.fireballClient, getQueries()).then(response => {
            return filterCombinedGraphData(response, ['parcels'], 'id');
        });
    }

    public static getRealmByAddresses(addresses: string[]): Promise<any[]> {
        const promises: Promise<any>[] = addresses.map(address => TheGraphApi.getRealmByAddress(address));

        return Promise.all(promises).then((response: any) =>
            response.reduce((result: any, current: any) => result.concat(current), [])
        );
    }

    // TODO check if needed
    public static async getRealmByDistrict(district: any): Promise<any> {
        function getQueries() {
            const queries: any[] = [];

            for (let i = 0; i < 5; i++) {
                queries.push(realmQueryByDistrict(i * 1000, district));
            }

            return queries;
        }

        return await graphJoin(clientFactory.client, getQueries()).then((response: any) => {
            return filterCombinedGraphData(response, ['parcels'], 'tokenId');
        });
    }

    public static async getRealmById(id: string): Promise<any> {
        return await TheGraphApi.getData(parcelQuery(id), GRAPH_FIREBALL_API).then((response: any) => {
            const parcel = response.data.parcel;
            if (parcel.installations) {
                parcel.installations = response.data.parcel.installations
                    .filter((item: any) => InstallationsUtils.getIsInstallationExist(item.installationId))
                    .map((inst: any) => ({
                        id: inst.installationId,
                        name: InstallationsUtils.getNameById(inst.installationId),
                        level: InstallationsUtils.getLevelById(inst.installationId),
                        type: InstallationsUtils.getTypeById(inst.installationId)
                    }))
                    .reduce((prev: any, current) => {
                        const duplicated = prev.find(inst => inst.id === current.id);

                        if (duplicated) {
                            duplicated.quantity++;

                            return prev;
                        }

                        return prev.concat({
                            ...current,
                            quantity: 1
                        });
                    }, [])
                    .sort((a, b) => a.id - b.id)
                    .sort((a, b) => b.level - a.level);
            }

            return parcel;
        });
    }

    public static async getErc721SalesHistory(id: number, category: string): Promise<SalesHistoryModel[]> {
        return await TheGraphApi.getData(erc721SalesHistory(id, category)).then((response: any) => {
            return response.data.erc721Listings;
        });
    }

    public static async getActiveListing(erc: any, id: string, type: any, category: any): Promise<any> {
        return await TheGraphApi.getData(activeListingQeury(erc, id, type, category)).then((response: any) => {
            return response.data.erc721Listings[0];
        });
    }

    public static getParcelPriceByDirection(data: any): Promise<any> {
        return TheGraphApi.getData(getParcelOrderDirectionQuery(data)).then((response: any) => {
            return EthersApi.fromWei(response.data.erc721Listings[0].priceInWei);
        });
    }

    // TODO check if needed
    public static async getRealmAuctionPrice(id: string): Promise<any> {
        return await TheGraphApi.getRealmData(auctionQuery(id)).then((response: any) => {
            const erc721: any = response.data.auctions;

            return {
                price: erc721[0]?.highestBid / 10 ** 18 || 0
            };
        });
    }

    public static async getAllListedParcels(): Promise<any> {
        return await graphJoin(clientFactory.client, TheGraphApi.getListedParcelsQueries()).then((response: any) => {
            return filterCombinedGraphData(response, ['erc721Listings'], 'id');
        });
    }

    private static getListedParcelsQueries() {
        const sizes: number[] = [0, 1, 2, 3];
        const queries: any[] = [];

        sizes.forEach(size => {
            for (let i = 0; i < 5; i++) {
                queries.push(listedParcelsQuery(i * 1000, 'asc', size));
                queries.push(listedParcelsQuery(i * 1000, 'desc', size));
            }
        });

        return queries;
    }

    public static async getLendings(): Promise<any> {
        function getQueries() {
            const queries: any[] = [];

            for (let i = 0; i < 6; i++) {
                queries.push(lendingsQuery(i * 1000, 'asc'));
                queries.push(lendingsQuery(i * 1000, 'desc'));
            }

            return queries;
        }

        return await graphJoin(clientFactory.client, getQueries())
            .then((response: any) => {
                const filteredArray: any[] = filterCombinedGraphData(response, ['gotchiLendings'], 'id').map(
                    (item: any) => ({
                        ...item,
                        ...item.gotchi,
                        lendingId: item.id
                    })
                );

                return filteredArray;
            })
            .catch(e => console.log(e));
    }

    public static async getLendingsByAddress(address: string): Promise<any> {
        function getQueries() {
            const queries: any[] = [];

            for (let i = 0; i < 6; i++) {
                queries.push(lendingsByAddressQuery(address.toLowerCase(), i * 1000));
            }

            return queries;
        }

        return await graphJoin(clientFactory.client, getQueries()).then((response: any) => {
            const filteredArray: any[] = filterCombinedGraphData(response, ['gotchiLendings'], 'id').map(
                (item: any) => ({
                    ...item,
                    ...item.gotchi,
                    lendingId: item.id
                })
            );

            return filteredArray;
        });
    }

    public static async getBorrowedByAddress(address: string): Promise<any> {
        function getQueries() {
            const queries: any[] = [];

            for (let i = 0; i < 1; i++) {
                queries.push(borrowedByAddressQuery(address.toLowerCase(), i * 1000));
            }

            return queries;
        }

        return await graphJoin(clientFactory.client, getQueries()).then((response: any) => {
            const filteredArray: any[] = filterCombinedGraphData(response, ['gotchiLendings'], 'id').map(
                (item: any) => ({
                    ...item,
                    ...item.gotchi,
                    lendingId: item.id
                })
            );

            return filteredArray;
        });
    }

    public static async getIncomeById(id: string, timestamp: any): Promise<any> {
        return await getGraphData(clientFactory.incomeClient, incomeQuery(id, timestamp))
            .then((response: any) => {
                const data: any = response.data.vortexClaims;

                if (!data.length) {
                    // return 0 income if there are no records
                    return {
                        FUDAmount: 0,
                        FOMOAmount: 0,
                        ALPHAAmount: 0,
                        KEKAmount: 0
                    };
                }

                const combined: any = data.reduce((acc: any, x: any) => {
                    for (const key in x) {
                        if (key === 'gotchiId' || key === '__typename') {
                            break;
                        }

                        acc[key] = acc[key]
                            ? acc[key] + EthersApi.fromWei(x[key].toString())
                            : EthersApi.fromWei(x[key].toString());
                    }

                    return acc;
                }, {});

                return combined;
            })
            .catch(e => console.log(e));
    }

    // ! GOTCHIVERSE

    // TODO check if needed
    public static getGotchisGotchiverseInfoByIds(gotchiIds: string[]): Promise<any> {
        return getGraphData(clientFactory.gotchiverseClient, gotchisGotchiverseQuery(gotchiIds)).then((res: any) => {
            const dataArr = res.data.gotchis;

            // * gotchiverse return empty data if gotchi never channeled alchemica!
            return gotchiIds.map((id, i) => ({
                id: id,
                lastChanneled: Number(dataArr[i]?.lastChanneledAlchemica) || 0
            }));
        });
    }

    // TODO check if needed
    public static getParcelsGotchiverseInfoByIds(parcelsIds: any[]): Promise<any> {
        return getGraphData(clientFactory.gotchiverseClient, parcelsGotchiverseQuery(parcelsIds)).then((res: any) => {
            const dataArr: any = res.data.parcels;

            // * gotchiverse return empty data if parcel was never channeled!
            const modified: any = parcelsIds.map((id: any, i: number) => ({
                id: dataArr[i]?.id || '',
                lastChanneled: Number(dataArr[i]?.lastChanneledAlchemica) || 0,
                installations: dataArr[i]?.equippedInstallations || []
            }));

            return modified;
        });
    }

    public static getParcelsGotchiverseInfoByOwner(owner: string): Promise<any> {
        return getGraphData(clientFactory.gotchiverseClient, parcelsOwnerGotchiverseQuery(owner)).then(
            (res: any) => res.data.parcels
        );
    }
}
