import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache, NormalizedCacheObject, gql } from '@apollo/client';
import fetch from 'cross-fetch';

// import {
//     GRAPH_CORE_API,
//     GRAPH_GOTCHIVERSE_API,
//     GRAPH_GOTCHI_SVG_API,
//     GRAPH_INCOME_API,
//     GRAPH_RAFFLE_API,
//     GRAPH_REALM_API
// } from 'shared/constants';

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

// enum GraphApiTypes {
//     Core = 'Core',
//     GotchiSvg = 'GotchiSvg',
//     Gotchiverse = 'Gotchiverse',
//     Income = 'Income',
//     Raffle = 'Raffle',
//     Realm = 'Realm'
// }

// const getGraphApiUrlByType = (type: GraphApiTypes): string => {
//     switch (type) {
//         case GraphApiTypes.Core:
//             return GRAPH_CORE_API;
//         case GraphApiTypes.GotchiSvg:
//             return GRAPH_GOTCHI_SVG_API;
//         case GraphApiTypes.Gotchiverse:
//             return GRAPH_GOTCHIVERSE_API;
//         case GraphApiTypes.Income:
//             return GRAPH_INCOME_API;
//         case GraphApiTypes.Raffle:
//             return GRAPH_RAFFLE_API;
//         case GraphApiTypes.Realm:
//             return GRAPH_REALM_API;
//         default:
//             return GRAPH_CORE_API;
//     }
// };

export class TheGraphCoreApi {
    public static async getGraphData(url: string, query: string): Promise<any> {
        const client: ApolloClient<NormalizedCacheObject> = TheGraphCoreApi.getClient(url);

        try {
            return await client.query({
                query: gql`${query}`
            });
        } catch (error) {
            console.error(error);

            return [];
        }
    }

    private static getClient(url: string): ApolloClient<NormalizedCacheObject> {
        return new ApolloClient({
            link: new HttpLink({ uri: url, fetch }),
            cache: new InMemoryCache(),
            defaultOptions: defaultOptions
        });
    }
}
