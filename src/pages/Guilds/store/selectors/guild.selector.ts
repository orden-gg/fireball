import { CombinedState, createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { GuildsModuleState } from '../slices';

const guildsStateSelector = createSelector(
  (state: RootState) => state.guilds,
  (GuildsModuleState: CombinedState<GuildsModuleState>) => GuildsModuleState
);

export const getIsGuildDataLoading = createSelector(guildsStateSelector, (state: CombinedState<GuildsModuleState>) => {
  const isLoading: boolean = state.ownedGotchis.ownedGotchis.isLoading;

  return isLoading;
});

export const getIsGuildDataLoaded = createSelector(guildsStateSelector, (state: CombinedState<GuildsModuleState>) => {
  const isLoaded: boolean = state.ownedGotchis.ownedGotchis.isLoaded;

  return isLoaded;
});
