import { ApolloClient, gql, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import axios, { AxiosResponse } from 'axios';

import { CollateralData } from 'shared/models';
import { collaterals } from 'data/collaterals.data';
import { tokens } from 'data/tokens.data';

export class GraphUtils {
    public static calculateRewards(position: any, type: any): any {
        const BRSformula = { y: 0.94, k: 84857.04 };
        const KINformula = { y: 0.76, k: 9416.93 };
        const EXPformula = { y: 0.65, k: 2396.69 };

        if (position > 7500 || position === -1) {
            return { reward: 0 };
        }

        switch (type) {
            case 'BRS':
                return {
                    name: type,
                    position: position + 1,
                    reward: +((Math.pow(1 / (position + 1), BRSformula.y)) * BRSformula.k).toFixed(0)
                };
            case 'KIN':
                return {
                    name: type,
                    position: position + 1,
                    reward: +((Math.pow(1 / (position + 1), KINformula.y)) * KINformula.k).toFixed(0)
                };
            case 'EXP':
                return {
                    name: type,
                    position: position + 1,
                    reward: +((Math.pow(1 / (position + 1), EXPformula.y)) * EXPformula.k).toFixed(0)
                };
            default:
                return { reward: 0 };
        }
    }

    public static getCollateralName(address: any): any {
        const index = collaterals.findIndex((collateral: CollateralData) => collateral.address === address);

        return collaterals[index]?.name;
    }

    public static getCollateralImg(name: any): any {
        try {
            return require(`../assets/images/collaterals/${name.replace(/^.{2}/g, 'a')}.svg`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static getTokenName(address: any): any {
        const index = tokens.findIndex(coll => coll.address.toLowerCase() === address.toLowerCase());

        return tokens[index]?.name;
    }

    public static getTokenImg(name: any): any {
        try {
            return require(`../assets/images/tokens/${name}-token.svg`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static async getGraphData(url: string, query: string): Promise<AxiosResponse> {
        return await axios.post(url, { query: query });
    }

    public static createClient(url: string): ApolloClient<NormalizedCacheObject> {
        return new ApolloClient({
            link: new HttpLink({ uri: url, fetch }),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'ignore'
                },
                query: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all'
                }
            }
        });
    }

    public static filterCombinedGraphData(response: any, datasetRoute: any, uniqueIdentifier: any): any[] {
        let responseArray: any[] = [];

        const getProperChild = (item: any, route: any): any => {
            const routeCache = [...route];

            const getNestedChild = (item: any, routeCache: any): any => {
                const current = routeCache[0];

                if (routeCache.length > 1) {
                    routeCache.splice(0,1);

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
    }

    public static async graphJoin(apiUrl: any, queries: any[]): Promise<any> {
        try {
            return await new Promise((resolve) => {
                const queriesCounter = queries.length;
                let requestCounter: number = 0;
                const responseArray: any[] = [];


                for (let i = 0; i < queriesCounter; i++) {
                    raiseCounter();
                    responseArray.push(
                        GraphUtils.createClient(apiUrl).query({
                            query: gql`${queries[i]}`
                        }).then((response) => {
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
    }
}
