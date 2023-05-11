import { TheGraphCoreApi } from 'api/the-graph-core.api';

import { MemberGuild, TheGraphResponse } from 'shared/models';

import { GUIlD_GRAPH_API } from 'pages/Guilds/constants';

import { getMemberByIdQuery } from './guilds-core.query';

export class GuildsGraphCoreApi {
  public static getMemberById(address: string): Promise<MemberGuild[]> {
    return TheGraphCoreApi.getGraphData(GUIlD_GRAPH_API, getMemberByIdQuery(address)).then(
      (res: TheGraphResponse<{ members: MemberGuild[] }>) => res.data.members
    );
  }
}
