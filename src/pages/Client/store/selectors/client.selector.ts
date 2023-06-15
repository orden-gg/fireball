import { CombinedState, createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { ClientModuleState } from '../slices';

const clientStateSelector = createSelector(
  (state: RootState) => state.client,
  (clientModuleState: CombinedState<ClientModuleState>) => clientModuleState
);

export const getIsClientDataLoading = createSelector(clientStateSelector, (state: CombinedState<ClientModuleState>) => {
  const isLoading: boolean =
    state.ownedGotchis.ownedGotchis.isLoading ||
    state.lentGotchis.lentGotchis.isLoading ||
    state.borrowedGotchis.borrowedGotchis.isLoading ||
    state.portals.portals.isLoading ||
    state.warehouse.warehouse.isLoading ||
    state.installations.installations.isLoading ||
    state.tiles.tiles.isLoading ||
    state.tickets.tickets.isLoading;

  return isLoading;
});

export const getIsClientDataLoaded = createSelector(clientStateSelector, (state: CombinedState<ClientModuleState>) => {
  const isLoaded: boolean =
    state.ownedGotchis.ownedGotchis.isLoaded ||
    state.lentGotchis.lentGotchis.isLoaded ||
    state.borrowedGotchis.borrowedGotchis.isLoaded ||
    state.portals.portals.isLoaded ||
    state.warehouse.warehouse.isLoaded ||
    state.installations.installations.isLoaded ||
    state.tiles.tiles.isLoaded ||
    state.tickets.tickets.isLoaded;

  return isLoaded;
});
