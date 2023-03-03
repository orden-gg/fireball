import { RootState } from 'core/store/store';

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
