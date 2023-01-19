import { GRAPH_CORE_API, GRAPH_FIREBALL_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

export class BaazaarGraphApi {
    public static async getErc721Listings<T>(query: string): Promise<T[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: T[] }>) => res.data.erc721Listings);
    }

    public static async getParcelListings<T>(query: string): Promise<T[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_FIREBALL_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: T[] }>) => res.data.erc721Listings);
    }

    public static async getErc1155Listings<T>(query: string): Promise<T[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc1155Listings: T[] }>) => res.data.erc1155Listings);
    }

    public static async getErc1155Purchases<T>(query: string): Promise<T[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc1155Purchases: T[] }>) => res.data.erc1155Purchases);
    }
}
