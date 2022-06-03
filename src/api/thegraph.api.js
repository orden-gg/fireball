import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { gql } from '@apollo/client';
import fetch from 'cross-fetch';

import ethersApi from './ethers.api';
import graphUtils from 'utils/graphUtils';

import {
    gotchiByIdQuery,
    gotchiesQuery,
    svgQuery,
    activeListingQeury,
    erc1155Query,
    erc721ListingsBySeller,
    erc721SalesHistory,
    erc1155ListingsBySeller,
    userQuery,
    realmQuery,
    auctionQuery,
    raffleQuery,
    raffleEntrantsQuery,
    raffleWinsQuery,
    listedParcelsQuery,
    parselQuery,
    lendingsQuery,
    lendingsByAddressQuery,
    incomeQuery,
    getParcelOrderDirectionQuery,
    gotchisGotchiverseQuery,
    parcelsGotchiverseQuery,
    realmQueryByDistrict
} from './common/queries';

const coreAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic';
const raffleAPI = 'https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-raffles';
const gotchiSvgAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg';
const realmAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-realm-matic';
const gotchiverseAPI = 'https://api.thegraph.com/subgraphs/name/aavegotchi/gotchiverse-matic';
const incomeAPI = 'https://api.thegraph.com/subgraphs/name/nicolasnin/gotchiincome';

// TODO: temporary lend graph
const lendAPI = 'https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-lending';

const clientFactory = (() => {
    const createClient = (url) => {
        return new ApolloClient({
            link: new HttpLink({ uri: url, fetch }),
            cache: new InMemoryCache()
        })
    };

    return {
        client: createClient(coreAPI),
        raffleClient: createClient(raffleAPI),
        svgsClient: createClient(gotchiSvgAPI),
        realmClient: createClient(realmAPI),
        gotchiverseClient: createClient(gotchiverseAPI),
        lendClient: createClient(lendAPI),
        incomeClient: createClient(incomeAPI)
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
                raiseCounter();
                responseArray.push(
                    client.query({
                            query: gql`${queries[i]}`
                        }).then((response) => {
                        responseArray[i] = response;
                        lowerCounter();
                        checkRequestsResult();
                    })
                )
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

        if (gotchiCache.equippedSetID && graphUtils.isExistingSetId(gotchiCache.equippedSetID)) {
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

    getGotchiesByIds(ids) {
        return this.getJoinedData([...ids.map(id => gotchiByIdQuery(id))]);
    },

    getGotchiQueries() {
        const maxPossibleSkips = 6; // TODO: 12000 limitation per haunt
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
            if (!response[0].data.user) return []; // terminate if thegraph has no data about address

            let filteredArray = filterCombinedGraphData(response, ['user', 'gotchisOwned'], 'id');

            return modifyTraits(filteredArray);

        });
    },

    getGotchisByAddresses(addresses) {
        const promises = addresses.map(address => this.getGotchisByAddress(address));

        return Promise.all(promises).then(response =>
            response.reduce((result, current) => result.concat(current), [])
        )
    },

    async getErc1155Price(id, sold, category, orderBy, orderDireciton) {
        return await this.getData(erc1155Query(id, sold, category, orderBy, orderDireciton)).then((response) => {
            let erc1155 = response.data.erc1155Listings;

            return {
                listing: erc1155[0]?.id || null,
                price: erc1155[0]?.priceInWei ? +ethersApi.fromWei(erc1155[0].priceInWei) : 0,
                lastSale: erc1155[0]?.timeLastPurchased || null
            };
        }).catch((error) => console.log(error));
    },

    async getErc721ListingsBySeller(seller) {
        return await this.getData(erc721ListingsBySeller(seller))
            .then(response => response.data.erc721Listings)
            .catch(error => console.log(error));
    },

    async getErc1155ListingsBySeller(seller) {
        return await this.getData(erc1155ListingsBySeller(seller))
            .then(response => response.data.erc1155Listings)
            .catch(error => console.log(error));
    },

    async getRaffleData(query) {
        return await getGraphData(clientFactory.raffleClient, query);
    },

    async getRaffle(id) {
        return await this.getRaffleData(raffleQuery(id)).then((response) => {
            let data = [];
            let total = response.data.raffles[0].stats;
            let prizes = response.data.raffles[0].ticketPools;

            prizes.forEach((pool) => {
                data.push({
                    id: pool.id,
                    items: pool.prizes.reduce((a, b) => a + +b.quantity, 0),
                    prizes: pool.prizes.map((item) => ({
                        id: (item.id).substring(2),
                        quantity: item.quantity
                    }))
                });
            });

            return [data, total];
        });
    },

    async getRaffleEntered(address, raffle) {
        return await this.getRaffleData(raffleEntrantsQuery(address.toLowerCase())).then((response) => {
            let data = [];
            let received = JSON.parse(JSON.stringify(response.data.raffleEntrants));

            let filtered = received.filter((item) => +item.raffle.id === raffle);

            let merged = filtered.reduce((items, current) => {
                let duplicated = items.find(item => item.ticketId === current.ticketId);

                if (duplicated) {
                    duplicated.quantity = +duplicated.quantity + +current.quantity;
                    return items;
                }

                return items.concat(current);
            }, []);

            merged.forEach((item) => {
                data.push({
                    ticketId: item.ticketId,
                    quantity: item.quantity,
                });
            });

            return data;
        });
    },

    async getRaffleWins(address, raffle) {
        return await this.getRaffleData(raffleWinsQuery(address.toLowerCase())).then((response) => {
            const data = [];

            let received = JSON.parse(JSON.stringify(response.data.raffleWinners));
            let filtered = received.filter((item) => +item.raffle.id === raffle);

            filtered.forEach((item) => {
                data.push({
                    itemId: (item.item.id).substring(2),
                    quantity: item.quantity,
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

        return await graphJoin(clientFactory.client, getQueries()).then((response) => {
            return filterCombinedGraphData(response, ['parcels'], 'tokenId');
        });
    },

    getRealmByAddresses(addresses) {
        const promises = addresses.map(address => this.getRealmByAddress(address));

        return Promise.all(promises).then(response =>
            response.reduce((result, current) => result.concat(current), [])
        )
    },

    async getRealmByDistrict(district) {
        function getQueries() {
            const queries = [];

            for (let i = 0; i < 5; i++) {
                queries.push(realmQueryByDistrict(i * 1000, district))
            }

            return queries;
        }

        return await graphJoin(clientFactory.client, getQueries()).then(response => {
            return filterCombinedGraphData(response, ['parcels'], 'tokenId');
        });
    },

    async getRealmById(id) {
        return await this.getData(parselQuery(id)).then((response) => {
            return response.data.parcel;
        });
    },

    async getErc721SalesHistory(id, category) {
        return await this.getData(erc721SalesHistory(id, category)).then((response) => {
            return response.data.erc721Listings;
        })
    },

    async getActiveListing(erc, id, type, category) {
        return await this.getData(activeListingQeury(erc, id, type, category)).then((response) => {
            return response.data.erc721Listings[0];
        })
    },

    getParcelPriceByDirection(data) {
        return this.getData(getParcelOrderDirectionQuery(data)).then(response => {
            return ethersApi.fromWei(response.data.erc721Listings[0].priceInWei);
        })
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
    },

    async getLendings() {
        function getQueries() {
            const queries = [];

            for (let i = 0; i < 6; i++) {
                queries.push(lendingsQuery(i * 1000, 'asc'))
                queries.push(lendingsQuery(i * 1000, 'desc'))
            }

            return queries;
        }

        return await graphJoin(clientFactory.lendClient, getQueries()).then((response) => {
            const filteredArray = filterCombinedGraphData(response, ['gotchiLendings'], 'id').map(item => ({
                ...item,
                ...item.gotchi,
                lendingId: item.id
            }));

            return filteredArray;
        }).catch(e => console.log(e));
    },

    async getLendingsByAddress(address) {
        function getQueries() {
            const queries = [];

            for (let i = 0; i < 1; i++) {
                queries.push(lendingsByAddressQuery(address.toLowerCase(), i * 1000))
            }

            return queries;
        }

        return await graphJoin(clientFactory.lendClient, getQueries()).then((response) => {
            const filteredArray = filterCombinedGraphData(response, ['gotchiLendings'], 'id').map(item => ({
                ...item,
                ...item.gotchi,
                lendingId: item.id
            }));

            return filteredArray;
        });
    },

    async getIncomeById(id, timestamp) {
        return await getGraphData(clientFactory.incomeClient, incomeQuery(id, timestamp)).then((response) => {
            const data = response.data.vortexClaims;

            if (!data.length) { // return 0 income if there are no records
                return {
                    FUDAmount: 0,
                    FOMOAmount: 0,
                    ALPHAAmount: 0,
                    KEKAmount: 0
                }
            }

            const combined = data.reduce((acc, x) => {
                for (let key in x) {
                    if (key === 'gotchiId' || key === '__typename') {
                        break;
                    }

                    acc[key] = acc[key] ? (
                        acc[key] + ethersApi.fromWei(x[key].toString())
                    ) : (
                        ethersApi.fromWei(x[key].toString())
                    )
                }

                return acc;
            }, {});

            return combined;
        }).catch(e => console.log(e));
    },

    // ! GOTCHIVERSE

    getGotchisGotchiverseInfo(gotchiIds) {
        return getGraphData(clientFactory.gotchiverseClient, gotchisGotchiverseQuery(gotchiIds))
            .then(res => {
                const dataArr = res.data.gotchis;

                // * gotchiverse return empty data if gotchi never channeled alchemica!
                return gotchiIds.map((id, i) => ({
                    id: id,
                    lastChanneled: Number(dataArr[i]?.lastChanneledAlchemica) || 0
                }))
            })
    },

    getParcelsGotchiverseInfo(parcelsIds) {
        return getGraphData(clientFactory.gotchiverseClient, parcelsGotchiverseQuery(parcelsIds))
            .then(res => {
                const dataArr = res.data.parcels;

                // * gotchiverse return empty data if parcel was never channeled!
                return parcelsIds.map((id, i) => ({
                    id: dataArr[i]?.id || '',
                    lastChanneled: Number(dataArr[i]?.lastChanneledAlchemica) || 0,
                    installations: dataArr[i]?.equippedInstallations || []
                }))
            })
    },
}
