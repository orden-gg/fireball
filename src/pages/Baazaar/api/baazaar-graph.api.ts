import { GRAPH_CORE_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

import { BaazaarGotchiListingDTO } from '../models/baazaar-gotchi-listing.model';

export class BaazaarGraphApi {
    public static async getBaazaarGotchis(query: string): Promise<BaazaarGotchiListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: BaazaarGotchiListingDTO[] }>) => res.data.erc721Listings);
    }
}
