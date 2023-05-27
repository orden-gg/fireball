import { EthersApi } from 'api';
import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { GeneralGuildStats, GuildPlayerRealmStats, GuildPlayerStats } from 'pages/Guilds/models';

import * as guildHomeSlices from '../slices/guild-home.slice';

export const onLoadGuildHomeInfo =
  (members: string[]): AppThunk =>
  (dispatch) => {
    dispatch(guildHomeSlices.loadHomeInfo());

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
              (playerStat) => playerStat.id === playerStat.id
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

        dispatch(guildHomeSlices.loadHomeInfoSucceded(generalStats));
      })
      .catch(() => dispatch(guildHomeSlices.loadHomeInfoFailed()));
  };
