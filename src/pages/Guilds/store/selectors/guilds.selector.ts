import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { GuildsState } from '../slices/guilds.slice';

const guildsStateSelector = createSelector(
  (state: RootState) => state.guilds.guilds,
  (guildsState: GuildsState) => guildsState
);

export const getGuilds = createSelector(guildsStateSelector, (state: GuildsState) => state.guilds.data);

export const getIsGuildsLoading = createSelector(guildsStateSelector, (state: GuildsState) => state.guilds.isLoading);

export const getGuildsCount = createSelector(guildsStateSelector, (state: GuildsState) => state.guilds.data.length);

export const getCurrentGuild = createSelector(guildsStateSelector, (state: GuildsState) => state.currentGuild.data);

export const getIsCurrentGuildLoaded = createSelector(
  guildsStateSelector,
  (state: GuildsState) => state.currentGuild.isLoaded
);
