import { EthersApi } from 'api';
import { GuildContractApi, GuildGraphApi } from 'pages/Guilds/api';

import * as fromSnackbarStore from 'core/store/snackbar';
import { AppThunk } from 'core/store/store';

import { SnackbarData } from 'shared/models';

import {
  Guild,
  GuildFormValuesResult,
  GuildPlayerRealmStats,
  GuildPlayerStats,
  GuildRealmStats,
  GuildStats
} from 'pages/Guilds/models';

// slices
import * as guildsSlices from '../slices/guilds.slice';

export const onLoadGuilds = (): AppThunk => (dispatch) => {
  dispatch(guildsSlices.loadGuilds());

  GuildGraphApi.getGuilds()
    .then((guilds: Guild[]) => {
      dispatch(guildsSlices.loadGuildsSucceded(guilds));

      if (guilds.length > 0) {
        dispatch(onLoadGuildsPlayersStats(guilds));
      }
    })
    .catch(() => {
      dispatch(guildsSlices.loadGuildsFailed());
    });
};

export const onLoadGuildsPlayersStats =
  (guilds: Guild[]): AppThunk =>
  (dispatch) => {
    const guildsPlayersDictionary: Map<string, string[]> = new Map();

    guilds.forEach((guild: Guild) => {
      const players: string[] = guild.members.map((member) => member.id);

      guildsPlayersDictionary.set(guild.safeAddress, players);
    });

    for (const [key, value] of guildsPlayersDictionary) {
      Promise.all([GuildGraphApi.getGuildPlayerStats(value), GuildGraphApi.getGuildPlayerRealmStats(value)]).then(
        ([playersStats, playersRealmStats]: [GuildPlayerStats[], GuildPlayerRealmStats[]]) => {
          const guildStats: GuildStats = mapPlayersStats(playersStats);
          const guildRealmStats: GuildRealmStats = mapPlayersRealmStats(playersRealmStats);

          dispatch(
            guildsSlices.setGuildStats({
              key,
              stats: {
                ...guildStats,
                ...guildRealmStats,
                votingPower: guildStats.votingPower + guildRealmStats.votingPower
              }
            })
          );
        }
      );
    }
  };

export const onLoadCurrentGuildById =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(guildsSlices.loadCurrentGuildById());

    GuildGraphApi.getGuildById(id)
      .then((guild: Guild) => {
        dispatch(guildsSlices.loadCurrentGuildByIdSucceded(guild));
      })
      .catch(() => {
        dispatch(guildsSlices.loadCurrentGuildByIdFailed());
      });
  };

export const onCreateGuild =
  (guildData: GuildFormValuesResult): AppThunk =>
  (dispatch) => {
    dispatch(guildsSlices.setIsContractRequestInProgress(true));

    GuildContractApi.createGuildSafe(guildData)
      .then((res: boolean) => {
        let snackbarData: SnackbarData;

        if (res) {
          snackbarData = {
            message: 'Guild was successfully created!',
            severity: 'success',
            horizontal: 'center',
            vertical: 'top'
          };

          dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
        } else {
          snackbarData = {
            message: 'Error occured!',
            severity: 'error',
            horizontal: 'center',
            vertical: 'top'
          };
        }
      })
      .catch(() => {
        const snackbarData: SnackbarData = {
          message: 'Error occured!',
          severity: 'error',
          horizontal: 'center',
          vertical: 'top'
        };

        dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
      })
      .finally(() => {
        dispatch(guildsSlices.setIsContractRequestInProgress(false));
      });
  };

export const onUpdateGuild =
  (guildData: GuildFormValuesResult): AppThunk =>
  (dispatch) => {
    dispatch(guildsSlices.setIsContractRequestInProgress(true));

    GuildContractApi.updateGuild(guildData)
      .then((res: boolean) => {
        let snackbarData: SnackbarData;

        if (res) {
          snackbarData = {
            message: 'Guild was successfully updated!',
            severity: 'success',
            horizontal: 'center',
            vertical: 'top'
          };

          dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
        } else {
          snackbarData = {
            message: 'Error occured!',
            severity: 'error',
            horizontal: 'center',
            vertical: 'top'
          };
        }
      })
      .catch(() => {
        const snackbarData: SnackbarData = {
          message: 'Error occured!',
          severity: 'error',
          horizontal: 'center',
          vertical: 'top'
        };

        dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
      })
      .finally(() => {
        dispatch(guildsSlices.setIsContractRequestInProgress(false));
      });
  };

export const onJoinGuild =
  (guildTokenId: string, memberAddress: string): AppThunk =>
  (dispatch) => {
    dispatch(guildsSlices.setIsContractRequestInProgress(true));

    GuildContractApi.joinGuild(guildTokenId)
      .then((res: boolean) => {
        let snackbarData: SnackbarData;

        if (res) {
          snackbarData = {
            message: `You've successfully joined the guild!`,
            severity: 'success',
            horizontal: 'center',
            vertical: 'top'
          };
          dispatch(guildsSlices.addGuildMember({ id: memberAddress }));
        } else {
          snackbarData = {
            message: 'Error occured!',
            severity: 'error',
            horizontal: 'center',
            vertical: 'top'
          };
        }

        dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
      })
      .catch(() => {
        const snackbarData: SnackbarData = {
          message: 'Error occured!',
          severity: 'error',
          horizontal: 'center',
          vertical: 'top'
        };

        dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
      })
      .finally(() => {
        dispatch(guildsSlices.setIsContractRequestInProgress(false));
      });
  };

const mapPlayersStats = (playersStats: GuildPlayerStats[]): GuildStats => {
  return playersStats.reduce(
    (current: GuildStats, previous: GuildPlayerStats) => {
      return {
        gotchisCount: current.gotchisCount + previous.gotchisOriginalOwnedAmount,
        itemsCount: current.itemsCount + previous.itemsAmount,
        portalsCount: current.portalsCount + previous.portalsAmount,
        votingPower:
          current.votingPower +
          EthersApi.fromWei(previous.gotchisVP) +
          EthersApi.fromWei(previous.itemsVP) +
          EthersApi.fromWei(previous.portalsVP)
      };
    },
    {
      gotchisCount: 0,
      itemsCount: 0,
      portalsCount: 0,
      votingPower: 0
    }
  );
};

const mapPlayersRealmStats = (playersRealmStats: GuildPlayerRealmStats[]): GuildRealmStats => {
  return playersRealmStats.reduce(
    (current: GuildRealmStats, previous: GuildPlayerRealmStats) => {
      return {
        realmCount: current.realmCount + previous.parcelsCount,
        installationsCount: current.installationsCount + previous.installationsCount,
        tilesCount: current.tilesCount + previous.tilesCount,
        votingPower: current.votingPower + EthersApi.fromWei(previous.parcelsVP)
      };
    },
    {
      realmCount: 0,
      installationsCount: 0,
      tilesCount: 0,
      votingPower: 0
    }
  );
};
