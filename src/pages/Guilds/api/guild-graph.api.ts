import { TheGraphCoreApi } from 'api';

import { GRAPH_CORE_API, GRAPH_FIREBALL_MAIN_API, GRAPH_GOTCHIVERSE_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';

import { GotchiUtils, GraphUtils } from 'utils';

import { GUIlD_GRAPH_API, GUIlD_GRAPH_REALM_STATS_API, GUIlD_GRAPH_STATS_API } from '../constants';
import { GuildChannelingActivity, GuildPlayerBestGotchi, GuildPortal, GuildRealm, GuildWearable } from '../models';
import { Guild, GuildPlayerRealmStats, GuildPlayerStats } from '../models/guild.model';
import {
  channelingByAddressesQuery,
  guildGotchisQuery,
  guildMemberBestGotchiQuery,
  portalsByAddressesQuery,
  realmByAddressesQuery,
  wearablesByAddressesQuery
} from '../queries';
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

  public static getGuildWearables(first: number, skip: number, playersAddresses: string[]): Promise<GuildWearable[]> {
    return TheGraphCoreApi.getGraphData(
      GRAPH_FIREBALL_MAIN_API,
      wearablesByAddressesQuery(first, skip, playersAddresses)
    ).then((res: TheGraphResponse<{ erc1155Items: GuildWearable[] }>) => res.data.erc1155Items);
  }

  public static getGuildPortals(first: number, skip: number, playersAddresses: string[]): Promise<GuildPortal[]> {
    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, portalsByAddressesQuery(first, skip, playersAddresses)).then(
      (res: TheGraphResponse<{ portals: GuildPortal[] }>) => res.data.portals
    );
  }

  public static getGuildRealm(first: number, skip: number, playersAddresses: string[]): Promise<GuildRealm[]> {
    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, realmByAddressesQuery(first, skip, playersAddresses)).then(
      (res: TheGraphResponse<{ parcels: GuildRealm[] }>) => res.data.parcels
    );
  }

  public static getPlayerBestGotchis(playersAddresses: string[]): CustomAny {
    return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, guildMemberBestGotchiQuery(playersAddresses)).then(
      (res: TheGraphResponse<{ users: GuildPlayerBestGotchi[] }>) => res.data.users
    );
  }

  public static getGuildChannelingActivity(
    first: number,
    skip: number,
    playersAddresses: string[]
  ): Promise<GuildChannelingActivity[]> {
    return TheGraphCoreApi.getGraphData(
      GRAPH_GOTCHIVERSE_API,
      channelingByAddressesQuery(first, skip, playersAddresses)
    ).then(
      (res: TheGraphResponse<{ channelAlchemicaEvents: GuildChannelingActivity[] }>) => res.data.channelAlchemicaEvents
    );
  }
}
