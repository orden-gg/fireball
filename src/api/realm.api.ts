import REALM_ABI from 'data/abi/realm.abi.json';

import { GRAPH_FIREBALL_API, REALM_CONTRACT } from 'shared/constants';
import { ParcelSurveyAlchemica, TheGraphResponse } from 'shared/models';
import { GraphUtils } from 'utils';
import { parcelSurveyById } from './common/queries';
import { EthersApi } from './ethers.api';
import { TheGraphCoreApi } from './the-graph-core.api';


const realmContract = EthersApi.makeContract(REALM_CONTRACT, REALM_ABI, 'polygon');

export class RealmApi {
    public static getGotchiLastChanneled(id: any): any {
        // !TODO: find a better solution for BigNumber parcing (default method doesn't work)
        return realmContract.getLastChanneled(id).then((response: any) => response - 0);
    }

    public static async getParcelsSurvey(ids: number[]): Promise<ParcelSurveyAlchemica[]> {
        const queries = GraphUtils.getСombinedQueriesByIds(ids, parcelSurveyById);

        return TheGraphCoreApi.getGraphData(GRAPH_FIREBALL_API, queries).then((res: TheGraphResponse<{
            [key: string]: ParcelSurveyAlchemica[]}>
        ) => Object.values(res.data).map((item: ParcelSurveyAlchemica[]) => item[0]));
    }
}
