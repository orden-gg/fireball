import { TheGraphCoreApi } from 'api';

import { TheGraphResponse } from 'shared/models';

import { GUIlD_GRAPH_API } from '../constants';
import { Guild } from '../models/guild.model';
import { guildsQuery } from '../queries/guild.queries';

export class GuildGraphApi {
  public static getGuilds(): Promise<Guild[]> {
    return TheGraphCoreApi.getGraphData(GUIlD_GRAPH_API, guildsQuery()).then(
      (res: TheGraphResponse<{ guilds: Guild[] }>) => res.data.guilds
    );
  }
}
