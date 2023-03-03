import { TheGraphCoreApi } from 'api';

import { Erc721Categories, GRAPH_CORE_API, GRAPH_FAKE_GOTCHIS_API } from 'shared/constants';
import { Erc721ListingsBatch, TheGraphResponse } from 'shared/models';

import { FakeItemsDTO } from '../models';
import { getErc721ListingsByCategoriesQuery } from '../queries';

export class ClientApi {
  public static async getFakeGotchis(query: string): Promise<FakeItemsDTO> {
    return TheGraphCoreApi.getGraphData(GRAPH_FAKE_GOTCHIS_API, query).then(
      (res: TheGraphResponse<{ account: FakeItemsDTO }>) => res.data.account
    );
  }

  public static async getErc721ListingsByCategories(
    ids: number[],
    categories: Erc721Categories[]
  ): Promise<Erc721ListingsBatch> {
    const getQuery = (ids: number[]): string => {
      const queries: string[] = ids.map((id: number) => getErc721ListingsByCategoriesQuery(id, categories));

      return `{${queries.join(',')}}`;
    };

    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, getQuery(ids)).then(
      (response: TheGraphResponse<Erc721ListingsBatch>) => response.data
    );
  }
}
