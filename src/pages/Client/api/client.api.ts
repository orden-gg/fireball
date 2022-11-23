import { GRAPH_CORE_API, GRAPH_FAKE_GOTCHIS_API } from 'shared/constants';
import { Erc721ListingsBatch, TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

import { FakeItemsDTO } from '../models';
import { getFakeGotchisListingsQuery } from '../queries';

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

        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, getQuery(ids))
            .then((response: TheGraphResponse<Erc721ListingsBatch>) => response.data);
    }
}
