import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { SortingItem } from 'shared/models';

import { Warehouse } from 'pages/Client/models';

import { GuildWearablesState } from '../slices';

const guildWearablesStateSelector = createSelector(
  (state: RootState) => state.guilds.guildWearables,
  (guildWearablesState: GuildWearablesState): GuildWearablesState => guildWearablesState
);

export const getGuildWearables = createSelector(
  guildWearablesStateSelector,
  (state: GuildWearablesState): Warehouse[] => state.guildWearables.data
);

export const getIsGuildWearablesLoading = createSelector(
  guildWearablesStateSelector,
  (state: GuildWearablesState): boolean => state.guildWearables.isLoading
);

export const getGuildWearablesSorting = createSelector(
  guildWearablesStateSelector,
  (state: GuildWearablesState): SortingItem => state.guildWearablesSorting
);
