import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import graphUtils from '../utils/graphUtils';
import { gotchiesQuery, svgQuery, erc1155Query, userQuery, realmQuery, auctionQuery,
    raffleQuery, raffleEnteredQuery, listedParcelsQuery } from './common/queries';
import Web3 from 'web3';

const web3 = new Web3();

const baseUrl = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic';
const raffleOfficial = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-matic-raffle';
const raffle = 'https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-raffles';
const gotchiSVGs = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg';
const realm = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-realm-matic';

const clientFactory = (() => {
    const createClient = (url) => {
        return new ApolloClient({
        uri: url,
        cache: new InMemoryCache()
    })};

    return {
        client: createClient(baseUrl),
        raffleOfficialClient: createClient(raffleOfficial),
        raffleClient: createClient(raffle),
        svgsClient: createClient(gotchiSVGs),
        realmClient: createClient(realm)
    }
})();

// single query requests
const getGraphData = async (client, query) => {
    try {
        return await client.query({
            query: gql`${query}`
        });
    } catch (error) {
        console.error(error);
        return []
    }
};

// multi query requests
const graphJoin = async (client, queries) => {
    try {
        return await new Promise((resolve, reject) => {
            const queriesCounter = queries.length;
            let requestCounter = 0;
            let responseArray = [];

            for (let i = 0; i < queriesCounter; i++) {
                requestCounter++;
                responseArray.push(
                    client.query({
                            query: gql`${queries[i]}`
                        }).then((response) => {
                        responseArray[i] = response;
                        requestCounter--;
                        checkRequestsResult();
                    })
                )
            }

            function checkRequestsResult() {
                if (requestCounter === 0 && responseArray.length === queries.length) {
                    resolve(responseArray);
                }
            }
        });
    } catch (error) {
        console.error(error);
        return [];
    }
};

// filtering of combined graph data from duplicates
const filterCombinedGraphData = (response, datasetRoute, uniqueIdentifier) => {
    let responseArray = [];

    const getProperChild = (item, route) => {
        let routeCache = [...route];

        const getNestedChild = (item, routeCache) => {
            const current = routeCache[0];

            if (routeCache.length > 1) {
                routeCache.splice(0,1)
                return getNestedChild(item[current], routeCache);
            } else {
                return item[current];
            }
        }

        return getNestedChild(item, routeCache);
    };

    for (let i = 0; i < response.length; i++) {
        responseArray = [...getProperChild(response[i].data, datasetRoute), ...responseArray];
    }

    return responseArray.reduce((unique, item) => {
        const index = unique.findIndex(el => el[uniqueIdentifier] === item[uniqueIdentifier]);

        if (index === -1) {
            unique.push(item);
        }

        return unique;
    }, []);
};

// NOTE: Temporary solution to resolve subgraph issue with withSetsNumericTraits data (it's not correct)
const modifyTraits = (gotchis) => {
    let gotchisCache = [...gotchis];

    return gotchisCache.map((gotchi) => {
        let gotchiCache = {...gotchi};

        if (gotchiCache.equippedSetID) {
            let modifiers = graphUtils.getSetModifiers(gotchiCache.equippedSetID);
            let brsBoots = modifiers.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);

            gotchiCache.modifiedRarityScore = +gotchiCache.modifiedRarityScore + brsBoots;
            gotchiCache.modifiedNumericTraits = gotchiCache.modifiedNumericTraits.map((item, index) => {
                return index > 3 ? item : item + modifiers[index + 1];
            });
        }

        return gotchiCache;
    });
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getData(query) {
        return await getGraphData(clientFactory.client, query);
    },

    async getJoinedData(queries) {
        return await graphJoin(clientFactory.client, queries);
    },

    async getAllGotchies() {
        return await graphJoin(clientFactory.client, this.getGotchiQueries()).then((response)=> {
            let filteredArray = filterCombinedGraphData(response, ['aavegotchis'], 'id');

            return modifyTraits(filteredArray);
        });
    },

    getGotchiQueries() {
        const maxPossibleSkips = 5;
        let queries = [];

        for (let i = 0; i < maxPossibleSkips; i++) {
            queries.push(gotchiesQuery(i*1000, 'asc', 1));
            queries.push(gotchiesQuery(i*1000, 'desc', 1));
            queries.push(gotchiesQuery(i*1000, 'asc', 2));
            queries.push(gotchiesQuery(i*1000, 'desc', 2));
        }

        return queries;
    },

    async getGotchisByAddress(address) {
        function getQueries() {
            let queries = [];

            for (let i = 0; i < 5; i++) {
                queries.push(userQuery(address.toLowerCase(), i * 1000))
            }

            return queries;
        }

        return await graphJoin(clientFactory.client, getQueries()).then((response) => {
            let filteredArray = filterCombinedGraphData(response, ['user', 'gotchisOwned'], 'id');

            return modifyTraits(filteredArray);
        });
    },

    async getErc1155Price(id, sold, category, orderBy, orderDireciton) {
        return await this.getData(erc1155Query(id, sold, category, orderBy, orderDireciton)).then((response) => {
            let erc1155 = response.data.erc1155Listings;

            return {
                listing: erc1155[0]?.id || null,
                price: erc1155[0]?.priceInWei ? +web3.utils.fromWei(erc1155[0].priceInWei) : 0,
                lastSale: erc1155[0]?.timeLastPurchased || null
            };
        }).catch((error) => console.log(error));
    },

    async getRaffleOffData(query) {
        return await getGraphData(clientFactory.raffleOfficialClient, query);
    },

    async getRaffleData(query) {
        return await getGraphData(clientFactory.raffleClient, query);
    },

    async getRaffle(id) {
        return await this.getRaffleData(raffleQuery(id)).then((response) => {
            let data = [];

            response.data.raffleTicketPools.forEach((pool) => {
                data.push({
                    id: pool.id,
                    items: pool.prizes.reduce((a, b) => a + +b.prizeQuantity, 0),
                    prizes: pool.prizes
                });
            });

            return data;
        });
    },

    async getRaffleEntered(address, raffle) {
        return await this.getRaffleData(raffleEnteredQuery(address.toLowerCase())).then((response) => {
            let data = [];
            let received = response.data.raffleTicketPoolEntrants;

            let filtered = received.filter((item) => +item.pool.id.charAt(0) === raffle);

            filtered.forEach((item) => {
                data.push({
                    ticketId: item.ticketId,
                    quantity: item.tickets,
                });
            });

            return data;
        });
    },

    async getGotchiSvgById(id) {
        return await getGraphData(clientFactory.svgsClient, svgQuery(id));
    },

    async getRealmData(query) {
        return await getGraphData(clientFactory.realmClient, query);
    },

    async getRealmByAddress(address) {
        function getQueries() {
            let queries = [];

            for (let i = 0; i < 5; i++) {
                queries.push(realmQuery(address.toLowerCase(), i * 1000))
            }

            return queries;
        }

        return await graphJoin(clientFactory.realmClient, getQueries()).then((response) => {
            return filterCombinedGraphData(response, ['parcels'], 'parcelId');
        });
    },

    async getRealmAuctionPrice(id) {
        return await this.getRealmData(auctionQuery(id)).then((response) => {
            let erc721 = response.data.auctions;

            return {
                price: erc721[0]?.highestBid / 10**18 || 0
            };
        });
    },

    async getAllListedParcels() {
        return await graphJoin(clientFactory.client, this.getListedParcelsQueries()).then((response)=> {
            return filterCombinedGraphData(response, ['erc721Listings'], 'id');
        });
    },

    getListedParcelsQueries() {
        const sizes = [0,1,2,3];
        let queries = [];

        sizes.forEach((size, ) => {
            for (let i = 0; i < 5; i++) {
                queries.push(listedParcelsQuery(i*1000, 'asc', size));
                queries.push(listedParcelsQuery(i*1000, 'desc', size));
            }
        });

        return queries;
    }
}