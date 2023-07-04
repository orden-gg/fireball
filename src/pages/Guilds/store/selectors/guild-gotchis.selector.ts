import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { SortingItem } from 'shared/models';

import { GuildGotchi } from 'pages/Guilds/models';

import { GuildGotchisState } from '../slices/guild-gotchis.slice';

const guildGotchisStateSelector = createSelector(
  (state: RootState) => state.guilds.guildGotchis,
  (guildGotchisState: GuildGotchisState) => guildGotchisState
);

export const getGuildGotchis = createSelector(
  guildGotchisStateSelector,
  (state: GuildGotchisState): GuildGotchi[] => state.guildGotchis.data
);

export const getGuildGotchisCount = createSelector(
  guildGotchisStateSelector,
  (state: GuildGotchisState): number => state.guildGotchis.data.length
);

export const getGuildGotchisSorting = createSelector(
  guildGotchisStateSelector,
  (state: GuildGotchisState): SortingItem => state.guildGotchisSorting
);

export const getIsGuildGotchisLoading = createSelector(
  guildGotchisStateSelector,
  (state: GuildGotchisState): boolean => state.guildGotchis.isLoading
);
