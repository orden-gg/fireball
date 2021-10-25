import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { gotchiesQuery, svgQuery, erc1155Query, userQuery } from './common/queries';

var baseUrl = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic';
var raffleUrl = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-matic-raffle';
var gotchiSVGs = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg';

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

            return filteredArray;
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

    async getGotchiesByAddress(address) {
        return await this.getData(userQuery(address.toLowerCase()));
    },

    async getErc1155Price(id, sold, category, orderBy, orderDireciton) {
        return await this.getData(erc1155Query(id, sold, category, orderBy, orderDireciton)).then((response) => {
            let erc1155 = response.data.erc1155Listings;

            return {
                listing: erc1155[0]?.id || null,
                price: erc1155[0]?.priceInWei / 10**18 || 0,
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
}