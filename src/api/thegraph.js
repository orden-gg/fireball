import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { gotchiesQuery, svgQuery, userQuery } from './common/queries';

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
        debugger
        // NOTE: to reduce loading speed current gotchies max amount is 7000
        // We should add new queries when there will be more than 7000 unique gotchies
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