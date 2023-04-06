import { TheGraphCoreApi } from 'api';

import { Erc721Categories, GRAPH_CORE_API } from 'shared/constants';
import { Erc721ListingsBatch, TheGraphResponse } from 'shared/models';

import { getErc721ListingsByCategoriesQuery } from '../../Client/queries';

export class ThePortalApi {
  public static async getErc721ListingsByCategories(
    id: number,
    categories: Erc721Categories[]
  ): Promise<Erc721ListingsBatch> {
    const getQuery = (id: number): string => {
      const queries: string = getErc721ListingsByCategoriesQuery(id, categories);
  
      return `{${queries}}`;
    };
  
    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, getQuery(id)).then(
      (response: TheGraphResponse<Erc721ListingsBatch>) => response.data
    );
  }
}
