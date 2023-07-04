import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { GeneralGuildStats, Guild, GuildFormValuesResult } from 'pages/Guilds/models';

import { GuildsState } from '../slices/guilds.slice';

const guildsStateSelector = createSelector(
  (state: RootState) => state.guilds.guilds,
  (guildsState: GuildsState) => guildsState
);

export const getGuilds = createSelector(guildsStateSelector, (state: GuildsState) => state.guilds.data);

export const getIsGuildsLoading = createSelector(guildsStateSelector, (state: GuildsState) => state.guilds.isLoading);

export const getGuildsCount = createSelector(guildsStateSelector, (state: GuildsState) => state.guilds.data.length);

export const getGuildsStats = createSelector(
  guildsStateSelector,
  (state: GuildsState): Record<string, GeneralGuildStats> => state.guildsStats
);

export const getCurrentGuild = createSelector(guildsStateSelector, (state: GuildsState) => state.currentGuild.data);

export const getIsCurrentGuildLoading = createSelector(
  guildsStateSelector,
  (state: GuildsState) => state.currentGuild.isLoading
);

export const getIsCurrentGuildLoaded = createSelector(
  guildsStateSelector,
  (state: GuildsState) => state.currentGuild.isLoaded
);

export const getIsCurrentGuildError = createSelector(
  guildsStateSelector,
  (state: GuildsState) => state.currentGuild.isError
);

export const getCurrentGuildMembers = createSelector(getCurrentGuild, (guild: Guild | null): string[] => {
  let members: string[];

  if (guild) {
    members = guild.members.map((member) => member.id);
  } else {
    members = [];
  }

  return members;
});

export const getIsGuildOwner = (address: string | null | undefined) =>
  createSelector(guildsStateSelector, (state: GuildsState) => {
    let isGuildOwner: boolean = false;

    if (!address || !state.currentGuild.data) {
      isGuildOwner = false;
    } else {
      isGuildOwner = state.currentGuild.data.owner === address;
    }

    return isGuildOwner;
  });

export const getCanJoinGuild = createSelector(
  (state: RootState) => state,
  (state: RootState) => {
    let canJoinGuild: boolean = false;
    const metamaskAccount = state.login.metamaskLoggedAddress;
    const currentGuildMembers = state.guilds.guilds.currentGuild.data?.members;

    if (!metamaskAccount || !currentGuildMembers) {
      canJoinGuild = false;
    } else {
      canJoinGuild = currentGuildMembers.every((member) => member.id !== metamaskAccount);
    }

    return canJoinGuild;
  }
);

export const getCanLeaveGuild = createSelector(
  (state: RootState) => state,
  (state: RootState) => {
    let canJoinGuild: boolean = false;
    const metamaskAccount = state.login.metamaskLoggedAddress;
    const currentGuildMembers = state.guilds.guilds.currentGuild.data?.members;

    if (!metamaskAccount || !currentGuildMembers) {
      canJoinGuild = false;
    } else {
      canJoinGuild = currentGuildMembers.some((member) => member.id === metamaskAccount.toLowerCase());
    }

    return canJoinGuild;
  }
);

export const getEditGuildData = createSelector(guildsStateSelector, (state: GuildsState): GuildFormValuesResult => {
  let guildData: GuildFormValuesResult;
  const currentGuild = state.currentGuild.data;

  if (currentGuild) {
    guildData = {
      name: currentGuild.name,
      description: currentGuild.description,
      logo: currentGuild.logo
    };
  } else {
    guildData = {
      name: '',
      description: '',
      logo: ''
    };
  }

  return guildData;
});

export const getIsContractRequestInProgress = createSelector(
  guildsStateSelector,
  (state: GuildsState) => state.isContractRequestInProgress
);

export const getIsGuildCreationSucceeded = createSelector(
  guildsStateSelector,
  (state: GuildsState) => state.isGuildCreationSucceeded
);
