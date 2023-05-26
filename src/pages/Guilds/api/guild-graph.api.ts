import { TheGraphCoreApi } from 'api';

import { GRAPH_CORE_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';

import { GotchiUtils, GraphUtils } from 'utils';

import { GUIlD_GRAPH_API, GUIlD_GRAPH_REALM_STATS_API, GUIlD_GRAPH_STATS_API } from '../constants';
import { Guild, GuildPlayerRealmStats, GuildPlayerStats } from '../models/guild.model';
import { borrowedByAddressQuery, guildGotchisQuery, lentByAddressQuery } from '../queries';
import {
  guildByIdQuery,
  guildPlayersStatsQuery,
  guildPlayersStatsRealmQuery,
  guildsQuery
} from '../queries/guild.query';

export class GuildGraphApi {
  public static getGuilds(): Promise<Guild[]> {
    return TheGraphCoreApi.getGraphData(GUIlD_GRAPH_API, guildsQuery()).then(
      (res: TheGraphResponse<{ guilds: Guild[] }>) => res.data.guilds
    );
  }

  public static getGuildPlayerStats(playersAddresses: string[]): Promise<GuildPlayerStats[]> {
    return TheGraphCoreApi.getGraphData(GUIlD_GRAPH_STATS_API, guildPlayersStatsQuery(playersAddresses)).then(
      (res: TheGraphResponse<{ players: GuildPlayerStats[] }>) => res.data.players
    );
  }

  public static getGuildPlayerRealmStats(playersAddresses: string[]): Promise<GuildPlayerRealmStats[]> {
    return TheGraphCoreApi.getGraphData(
      GUIlD_GRAPH_REALM_STATS_API,
      guildPlayersStatsRealmQuery(playersAddresses)
    ).then((res: TheGraphResponse<{ players: GuildPlayerRealmStats[] }>) => res.data.players);
  }

  public static getGuildById(id: string): Promise<Guild> {
    return TheGraphCoreApi.getGraphData(GUIlD_GRAPH_API, guildByIdQuery(id)).then(
      (res: TheGraphResponse<{ guilds: Guild[] }>) => res.data.guilds[0]
    );
  }

  public static getMemberOwnedGotchis(address: string): CustomAny {
    return TheGraphCoreApi.getJoinedGraphData(
      GRAPH_CORE_API,
      GraphUtils.getQueriesByAddress(guildGotchisQuery, address.toLocaleLowerCase())
    ).then((responses: CustomAny) => {
      if (!responses[0].data.aavegotchis) {
        return [];
      }

      return GotchiUtils.modifyTraits(GraphUtils.flatGraphItems(responses, ['aavegotchis']));
    });
  }

  public static getMemberLentGotchis(address: string): Promise<CustomAny> {
    return TheGraphCoreApi.getJoinedGraphData(
      GRAPH_CORE_API,
      GraphUtils.getQueriesByAddress(lentByAddressQuery, address.toLocaleLowerCase())
    ).then((responses: CustomAny) => {
      if (!responses[0].data.aavegotchis) {
        return [];
      }

      return GraphUtils.flatGraphItems(responses, ['gotchiLendings']).map((item: CustomAny) => ({
        ...item,
        ...item.gotchi,
        lendingId: item.id
      }));
    });
  }

  public static async getMemberBorrowedGotchis(address: string): Promise<CustomAny> {
    return TheGraphCoreApi.getJoinedGraphData(
      GRAPH_CORE_API,
      GraphUtils.getQueriesByAddress(borrowedByAddressQuery, address.toLocaleLowerCase())
    ).then((responses: CustomAny) => {
      if (!responses[0].data.aavegotchis) {
        return [];
      }

      return GraphUtils.flatGraphItems(responses, ['gotchiLendings']).map((item: CustomAny) => ({
        ...item,
        ...item.gotchi,
        lendingId: item.id
      }));
    });
  }
}
