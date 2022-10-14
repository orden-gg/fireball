import { GRAPH_CORE_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

import {
    GotchiListingDTO,
    ClosedPortalListingDTO,
    WearableListingDTO,
    ConsumableListingDTO,
    InstallationListingDTO,
    TileListingDTO
} from '../models';

export class BaazaarGraphApi {
    public static async getBaazaarGotchis(query: string): Promise<GotchiListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: GotchiListingDTO[] }>) => res.data.erc721Listings);
    }

    public static async getParcelsListings(query: string): Promise<any[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: any[] }>) => res.data.erc721Listings);
    }

    public static async getClosedPortalsListings(query: string): Promise<ClosedPortalListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: ClosedPortalListingDTO[] }>) => res.data.erc721Listings);
    }

    public static async getWearablesListings(query: string): Promise<WearableListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc1155Listings: WearableListingDTO[] }>) => res.data.erc1155Listings);
    }

    public static async getConsumablesListings(query: string): Promise<ConsumableListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc1155Listings: ConsumableListingDTO[] }>) => res.data.erc1155Listings);
    }

    public static async getInstallationsListings(query: string): Promise<InstallationListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc1155Listings: InstallationListingDTO[] }>) => res.data.erc1155Listings);
    }

    public static async getTilesListings(query: string): Promise<TileListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc1155Listings: TileListingDTO[] }>) => res.data.erc1155Listings);
    }
}
