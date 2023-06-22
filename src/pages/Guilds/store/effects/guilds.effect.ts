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
import { GuildUtils } from 'pages/Guilds/utils';

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
          const guildStats: GuildStats = GuildUtils.mapPlayersStats(playersStats);
          const guildRealmStats: GuildRealmStats = GuildUtils.mapPlayersRealmStats(playersRealmStats);

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
            message: 'Guild was successfully created! It will appear in the list in a few seconds.',
            severity: 'success',
            horizontal: 'center',
            vertical: 'bottom'
          };

          dispatch(guildsSlices.setIsGuildCreationSucceeded(true));
          dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
        } else {
          snackbarData = {
            message: 'Error occured!',
            severity: 'error',
            horizontal: 'center',
            vertical: 'bottom'
          };
        }
      })
      .catch(() => {
        const snackbarData: SnackbarData = {
          message: 'Error occured!',
          severity: 'error',
          horizontal: 'center',
          vertical: 'bottom'
        };

        dispatch(guildsSlices.setIsGuildCreationSucceeded(false));
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
            vertical: 'bottom'
          };

          dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
        } else {
          snackbarData = {
            message: 'Error occured!',
            severity: 'error',
            horizontal: 'center',
            vertical: 'bottom'
          };
        }
      })
      .catch(() => {
        const snackbarData: SnackbarData = {
          message: 'Error occured!',
          severity: 'error',
          horizontal: 'center',
          vertical: 'bottom'
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
            vertical: 'bottom'
          };
          dispatch(guildsSlices.addGuildMember({ id: memberAddress }));
        } else {
          snackbarData = {
            message: 'Error occured!',
            severity: 'error',
            horizontal: 'center',
            vertical: 'bottom'
          };
        }

        dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
      })
      .catch(() => {
        const snackbarData: SnackbarData = {
          message: 'Error occured!',
          severity: 'error',
          horizontal: 'center',
          vertical: 'bottom'
        };

        dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
      })
      .finally(() => {
        dispatch(guildsSlices.setIsContractRequestInProgress(false));
      });
  };

export const onLeaveGuild =
  (memberAddress: string): AppThunk =>
  (dispatch) => {
    dispatch(guildsSlices.setIsContractRequestInProgress(true));

    GuildContractApi.leaveGuild()
      .then((res: boolean) => {
        let snackbarData: SnackbarData;

        if (res) {
          snackbarData = {
            message: `You've successfully leave the guild!`,
            severity: 'success',
            horizontal: 'center',
            vertical: 'bottom'
          };
          dispatch(guildsSlices.removeGuildMember({ id: memberAddress }));
        } else {
          snackbarData = {
            message: 'Error occured!',
            severity: 'error',
            horizontal: 'center',
            vertical: 'bottom'
          };
        }

        dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
      })
      .catch(() => {
        const snackbarData: SnackbarData = {
          message: 'Error occured!',
          severity: 'error',
          horizontal: 'center',
          vertical: 'bottom'
        };

        dispatch(fromSnackbarStore.onOpenSnackbar(snackbarData));
      })
      .finally(() => {
        dispatch(guildsSlices.setIsContractRequestInProgress(false));
      });
  };