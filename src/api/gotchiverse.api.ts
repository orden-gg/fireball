import { setup } from 'axios-cache-adapter';

import { GRAPH_FB_GOTCHIVERSE_API } from 'shared/constants';
import { GraphUtils } from 'utils';
import { realmSurveyQuery } from './common/queries';

const api = setup({
    baseURL: 'https://api.gotchiverse.io',

    cache: {
        maxAge: 10 * 60 * 1000, // caching for 10 mins
        exclude: { query: false }
    }
});

const noCacheOptions = {
    cache: { maxAge: 0 }
};

export class GotchiverseApi {
    public static getOnlineCount(disableCache: any): Promise<any> {
        return api.get('/users/online', disableCache && noCacheOptions)
            .then(res => res.data.count)
            .catch(e => console.log(e));
    }

    public static getParcelImage(id: any, imageSize: any, disableCache: any): Promise<any> {
        return api.get(`/realm/map/load?map=citaadel&format=rgba-buffer-integers&parcel=${id},${imageSize}`, disableCache && noCacheOptions)
            .then(res => res.data)
            .catch(e => console.log(e));
    }

    public static getSurveysByAddress(address: string): Promise<any> {
        function getQueries() {
            const queries: any[] = [];

            for (let i = 0; i < 5; i++) {
                queries.push(realmSurveyQuery(address.toLowerCase(), i * 1000));
            }

            return queries;
        }

        return GraphUtils.graphJoin(GRAPH_FB_GOTCHIVERSE_API, getQueries()).then((response) => {
            return GraphUtils.filterCombinedGraphData(response, ['parcels'], 'id');
        });
    }
}
