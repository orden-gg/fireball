import { TheGraphCoreApi } from 'api';

import {
  Erc721Categories,
  GRAPH_CORE_API,
  GRAPH_FAKE_GOTCHIS_API,
  GRAPH_FIREBALL_API,
  GRAPH_FIREBALL_FORGE_API
} from 'shared/constants';
import { Erc721ListingsBatch, TheGraphResponse } from 'shared/models';

import { Erc721ForSaleDTO, Erc1155ForSaleDTO, FakeItemsDTO, ParcelForSaleDTO } from '../models';
import { getErc721ListingsByCategoriesQuery } from '../queries';
import {
  erc721ListingsBySellerQuery,
  erc1155ListingsBySellerQuery,
  realmListingsBySellerQuery
} from '../queries/items-for-sale.query';

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

  // Items for sale requests
  public static async getErc721ListingsBySeller(seller: string): Promise<Erc721ForSaleDTO[]> {
    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, erc721ListingsBySellerQuery(seller)).then(
      (response: TheGraphResponse<{ erc721Listings: Erc721ForSaleDTO[] }>) => response.data.erc721Listings
    );
  }

  // TODO as we integrate fireball graph for realm it's used here for now.
  // TODO in the future, after full fireball graph integration should be used as general erc721 listings.
  public static async getRealmListingsBySeller(seller: string): Promise<ParcelForSaleDTO[]> {
    return TheGraphCoreApi.getGraphData(GRAPH_FIREBALL_API, realmListingsBySellerQuery(seller)).then(
      (response: TheGraphResponse<{ erc721Listings: ParcelForSaleDTO[] }>) => response.data.erc721Listings
    );
  }

  public static async getErc1155ListingsBySeller(seller: string): Promise<Erc1155ForSaleDTO[]> {
    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, erc1155ListingsBySellerQuery(seller)).then(
      (response: TheGraphResponse<{ erc1155Listings: Erc1155ForSaleDTO[] }>) => response.data.erc1155Listings
    );
  }

  public static async getForgeItems(query: string): Promise<CustomAny> {
    return TheGraphCoreApi.getGraphData(GRAPH_FIREBALL_FORGE_API, query).then(
      (res: TheGraphResponse<CustomAny>) => res
    );
  }
}
