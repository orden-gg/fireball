import { GRAPH_FAKE_GOTCHIS_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

import { FakeItemsDTO } from '../models';
import { getFakeGotchisByAddressQuery } from '../queries/fake-gotchis.query';

export class ClientApi {
    public static async getFakeGotchisByAddress(address: string): Promise<FakeItemsDTO> {
        return TheGraphCoreApi.getGraphData(GRAPH_FAKE_GOTCHIS_API, getFakeGotchisByAddressQuery(address)).then(
            (res: TheGraphResponse<{ account: FakeItemsDTO }>) => res.data.account
        );
    }
}
