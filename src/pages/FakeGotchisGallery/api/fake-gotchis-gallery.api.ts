import { GRAPH_FAKE_GOTCHIS_API } from 'shared/constants';
import { FakeGotchi, TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

export class FakeGotchisGalleryApi {
    public static async getGalleryFakeGotchis(query: string): Promise<FakeGotchi[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_FAKE_GOTCHIS_API, query).then(
            (res: TheGraphResponse<{ metadataActionLogs: FakeGotchi[] }>) => res.data.metadataActionLogs
        );
    }
}
