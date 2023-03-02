import { GRAPH_CORE_API, GRAPH_FAKE_GOTCHIS_API, Erc721Categories } from 'shared/constants';
import { Erc721ListingsBatch, TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

import { FakeItemsDTO } from '../models';
import { getFakeGotchisListingsQuery, getErc721ListingsByCategoriesQuery } from '../queries';

export class ClientApi {
  public static async getFakeGotchis(query: string): Promise<FakeItemsDTO> {
    return TheGraphCoreApi.getGraphData(GRAPH_FAKE_GOTCHIS_API, query).then(
      (res: TheGraphResponse<{ account: FakeItemsDTO }>) => res.data.account
    );
  }

  public static async getFakeGotchisListings(ids: number[]): Promise<Erc721ListingsBatch> {
    const getQuery = (ids: number[]): string => {
      const queries: string[] = ids.map((id: number) => getFakeGotchisListingsQuery(id));

      return `{${queries.join(',')}}`;
    };

    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, getQuery(ids)).then(
      (response: TheGraphResponse<Erc721ListingsBatch>) => response.data
    );
  }

  public static async getErc721ListingsByCategories(ids: number[], categories: Erc721Categories[]): Promise<Erc721ListingsBatch> {
    const getQuery = (ids: number[]): string => {
      const queries: string[] = ids.map((id: number) => getErc721ListingsByCategoriesQuery(id, categories));

      return `{${queries.join(',')}}`;
    };

    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, getQuery(ids)).then(
      (response: TheGraphResponse<Erc721ListingsBatch>) => response.data
    );
  }

  public static async getFakeGotchiCardListing<T>(query: string): Promise<T[]> {
    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query).then(
      (res: TheGraphResponse<{ erc1155Listings: T[] }>) => res.data.erc1155Listings
    );
  }
}
