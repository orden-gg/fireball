import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import graphUtils from '../utils/graphUtils';
import { gotchiesQuery, svgQuery, erc1155Query, userQuery, realmQuery, auctionQuery } from './common/queries';
import Web3 from 'web3';

const web3 = new Web3();

var baseUrl = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic';
var raffleUrl = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-matic-raffle';
var gotchiSVGs = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg';
var realm = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-realm-matic';

var client = new ApolloClient({
    uri: baseUrl,
    cache: new InMemoryCache()
});

var raffleClient = new ApolloClient({
    uri: raffleUrl,
    cache: new InMemoryCache()
});

var svgsClient = new ApolloClient({
    uri: gotchiSVGs,
    cache: new InMemoryCache()
});

var realmClient = new ApolloClient({
    uri: realm,
    cache: new InMemoryCache()
});


async function graphJoin(queries) {
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
        return [];
    }
}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getData(query) {
        return await client
            .query({
                query: gql`${query}`
            });
    },

    async getJoinedData(queries) {
        return await graphJoin(queries);
    },

    async getAllGotchies() {
        return await graphJoin(this.getGotchiQueries()).then((response)=> {
            let responseArray = [];

            for (let i = 0; i < response.length; i++) {
                responseArray = [...response[i].data.aavegotchis, ...responseArray];
            }

            let filteredArray = responseArray.reduce((unique, item) => {
                const index = unique.findIndex(el => el.id === item.id);

                if (index === -1) {
                    unique.push(item);
                }

                return unique;
            }, []);

            let gotchis = JSON.parse(JSON.stringify(filteredArray));

            gotchis.forEach((gotchi, index) => { // NOTE: Temporary solution to resolve subgraph issue with withSetsNumericTraits data (it's not correct)
                if(gotchi.equippedSetID) {
                    let modifiers = graphUtils.getSetModifiers(gotchi.equippedSetID);
                    let brsBoots = modifiers.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);

                    gotchis[index].modifiedRarityScore = +gotchis[index].modifiedRarityScore + brsBoots;
                    gotchis[index].modifiedNumericTraits[0] += modifiers[1];
                    gotchis[index].modifiedNumericTraits[1] += modifiers[2];
                    gotchis[index].modifiedNumericTraits[2] += modifiers[3];
                    gotchis[index].modifiedNumericTraits[3] += modifiers[4];
                };
            });

            return gotchis;
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
        let data = [];

        for(let i = 0; i < 5; i++) {
            let queryData = await this.getData(userQuery(address.toLowerCase(), i * 1000)).then((response) => {
                let gotchis = JSON.parse(JSON.stringify([...response.data.user.gotchisOwned]));
    
                gotchis.forEach((gotchi, index) => { // NOTE: Temporary solution to resolve subgraph issue with withSetsNumericTraits data (it's not correct)
                    if(gotchi.equippedSetID) {
                        let modifiers = graphUtils.getSetModifiers(gotchi.equippedSetID);
                        let brsBoots = modifiers.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);
    
                        gotchis[index].modifiedRarityScore = +gotchis[index].modifiedRarityScore + brsBoots;
                        gotchis[index].modifiedNumericTraits[0] += modifiers[1];
                        gotchis[index].modifiedNumericTraits[1] += modifiers[2];
                        gotchis[index].modifiedNumericTraits[2] += modifiers[3];
                        gotchis[index].modifiedNumericTraits[3] += modifiers[4];
                    };
                });
    
                return gotchis;
            });
    
            data.push(...queryData);
    
            if(queryData.length < 1000) { // break loop if there is less than 1000 items comes from query
                break;
            }
        }

        return data;
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

    async getRaffleData(query) {
        return await raffleClient
            .query({
                query: gql`${query}`
            });
    },

    async getGotchiSvgById(id) {
        return await svgsClient
            .query({
                query: gql`${svgQuery(id)}`
            });
    },

    async getRealmData(query) {
        return await realmClient
            .query({
                query: gql`${query}`
            });
    },

    async getRealmByAddress(address) {
        let data = [];

        for(let i = 0; i < 6; i++) {
            let queryData = await this.getRealmData(realmQuery(address.toLowerCase(), i * 1000)).then((response) => {
                return [...response.data.parcels];
            });
    
            data.push(...queryData);
    
            if(queryData.length < 1000) { // break loop if there is less than 1000 items comes from query
                break;
            }
        }

        return data;
    },

    async getRealmAuctionPrice(id) {
        return await this.getRealmData(auctionQuery(id)).then((response) => {
            let erc721 = response.data.auctions;

            return {
                price: erc721[0]?.highestBid / 10**18 || 0
            };
        });
    },
}