import { ApolloClient, DefaultOptions, InMemoryCache, NormalizedCacheObject, gql } from '@apollo/client';

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

export class TheGraphCoreApi {
  public static async getGraphData(url: string, query: string): Promise<CustomAny> {
    const client: ApolloClient<NormalizedCacheObject> = TheGraphCoreApi.getClient(url);

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
  }

  private static getClient(uri: string): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
      uri,
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions
    });
  }

  public static async getJoinedGraphData(graphUrl: string, queries: string[]): Promise<CustomAny[]> {
    try {
      return await Promise.all(queries.map((query) => TheGraphCoreApi.getGraphData(graphUrl, query)));
    } catch (error) {
      console.error(error);

      return [];
    }
  }
}
