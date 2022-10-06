import { GRAPH_CORE_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

import { BaazaarGotchiListingDTO, ClosedPortalListingDTO } from '../models';

export class BaazaarGraphApi {
    public static async getBaazaarGotchis(query: string): Promise<BaazaarGotchiListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: BaazaarGotchiListingDTO[] }>) => res.data.erc721Listings);
    }

    public static async getClosedPortalsListings(query: string): Promise<ClosedPortalListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: ClosedPortalListingDTO[] }>) => res.data.erc721Listings);
    }
}
