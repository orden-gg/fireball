import { EthersApi } from 'api';
import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import {
  GeneralGuildStats,
  GuildPlayerRealmStats,
  GuildPlayerStats,
  GuildRealmStats,
  GuildStats
} from 'pages/Guilds/models';
import { GuildUtils } from 'pages/Guilds/utils';

import * as guildSlices from '../slices/guild.slice';

export const onLoadGuildInfo =
  (members: string[]): AppThunk =>
  (dispatch) => {
    dispatch(guildSlices.loadGuildInfo());

    Promise.all([GuildGraphApi.getGuildPlayerStats(members), GuildGraphApi.getGuildPlayerRealmStats(members)])
      .then(([playersStats, playersRealmStats]: [GuildPlayerStats[], GuildPlayerRealmStats[]]) => {
        let generalStats: GeneralGuildStats[];

        if (playersStats.length > playersRealmStats.length) {
          generalStats = playersStats.map((playerStat) => {
            const playerRealmStat: GuildPlayerRealmStats | undefined = playersRealmStats.find(
              (playerRealmStat) => playerRealmStat.id === playerStat.id
            );

            return {
              id: playerStat.id,
              gotchisCount: playerStat.gotchisOriginalOwnedAmount,
              portalsCount: playerStat.portalsAmount,
              itemsCount: playerStat.itemsAmount,
              realmCount: playerRealmStat?.parcelsCount || 0,
              installationsCount: playerRealmStat?.installationsCount || 0,
              tilesCount: playerRealmStat?.tilesCount || 0,
              votingPower:
                EthersApi.fromWei(playerStat.gotchisVP) +
                EthersApi.fromWei(playerStat.portalsVP) +
                EthersApi.fromWei(playerStat.itemsVP) +
                EthersApi.fromWei(playerRealmStat?.parcelsVP || 0)
            };
          });
        } else {
          generalStats = playersRealmStats.map((playerRealmStat) => {
            const playerStat: GuildPlayerStats | undefined = playersStats.find(
              (playerStat) => playerRealmStat.id === playerStat.id
            );

            return {
              id: playerRealmStat.id,
              gotchisCount: playerStat?.gotchisOriginalOwnedAmount || 0,
              portalsCount: playerStat?.portalsAmount || 0,
              itemsCount: playerStat?.itemsAmount || 0,
              realmCount: playerRealmStat.parcelsCount,
              installationsCount: playerRealmStat.installationsCount,
              tilesCount: playerRealmStat.tilesCount,
              votingPower:
                EthersApi.fromWei(playerRealmStat.parcelsVP) +
                EthersApi.fromWei(playerStat?.gotchisVP || 0) +
                EthersApi.fromWei(playerStat?.portalsVP || 0) +
                EthersApi.fromWei(playerStat?.itemsVP || 0)
            };
          });
        }

        dispatch(guildSlices.setGuildPlayersStats(generalStats));

        const guildStats: GuildStats = GuildUtils.mapPlayersStats(playersStats);
        const guildRealmStats: GuildRealmStats = GuildUtils.mapPlayersRealmStats(playersRealmStats);

        dispatch(
          guildSlices.loadGuildInfoSucceded({
            ...guildStats,
            ...guildRealmStats,
            votingPower: guildStats.votingPower + guildRealmStats.votingPower
          })
        );
      })
      .catch(() => dispatch(guildSlices.loadGuildInfoFailed()));
  };
