import { TheGraphCoreApi } from 'api/the-graph-core.api';

import { MembberGuild, TheGraphResponse } from 'shared/models';

import { GUIlD_GRAPH_API } from 'pages/Guilds/constants';

import { getMemberByIdQuery } from './guilds-core.query';

export class GuildsGraphCoreApi {
  public static getMemberById(address: string): Promise<MembberGuild[]> {
    return TheGraphCoreApi.getGraphData(GUIlD_GRAPH_API, getMemberByIdQuery(address)).then(
      (res: TheGraphResponse<{ members: MembberGuild[] }>) => res.data.members
    );
  }
}
