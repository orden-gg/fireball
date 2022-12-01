
import { GRAPH_FAKE_GOTCHIS_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

import { GalleryFakeGotchi } from '../models';

export class FakeGotchisGalleryApi {
    public static async getGalleryFakeGotchis(query: string): Promise<GalleryFakeGotchi[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_FAKE_GOTCHIS_API, query).then(
            (res: TheGraphResponse<{ metadataActionLogs: GalleryFakeGotchi[] }>) => res.data.metadataActionLogs
        );
    }
}
