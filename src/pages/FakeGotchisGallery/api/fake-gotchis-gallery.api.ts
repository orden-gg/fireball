
import { GRAPH_FAKE_GOTCHIS_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

import { MintedFakeGotchi } from '../models';

export class FakeGotchisGalleryApi {
    public static async getMintedFakeGotchis(query: string): Promise<MintedFakeGotchi[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_FAKE_GOTCHIS_API, query).then(
            (res: TheGraphResponse<{ metadataActionLogs: MintedFakeGotchi[] }>) => res.data.metadataActionLogs
        );
    }
}
