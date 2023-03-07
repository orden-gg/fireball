import { RootState } from 'core/store/store';

export const getIsClientDataLoading = (state: RootState): boolean => {
  const isLoaded: boolean =
    state.client.ownedGotchis.ownedGotchis.isLoading ||
    state.client.lentGotchis.lentGotchis.isLoading ||
    state.client.borrowedGotchis.borrowedGotchis.isLoading ||
    state.client.portals.portals.isLoading ||
    state.client.warehouse.warehouse.isLoading ||
    state.client.installations.installations.isLoading ||
    state.client.tiles.tiles.isLoading ||
    state.client.tickets.tickets.isLoading;

  return isLoaded;
};

export const getIsClientDataLoaded = (state: RootState): boolean => {
  const isLoaded: boolean =
    state.client.ownedGotchis.ownedGotchis.isLoaded ||
    state.client.lentGotchis.lentGotchis.isLoaded ||
    state.client.borrowedGotchis.borrowedGotchis.isLoaded ||
    state.client.portals.portals.isLoaded ||
    state.client.warehouse.warehouse.isLoaded ||
    state.client.installations.installations.isLoaded ||
    state.client.tiles.tiles.isLoaded ||
    state.client.tickets.tickets.isLoaded;

  return isLoaded;
};
