import { AppThunk } from 'core/store/store';

import * as guildEffects from '.';
import * as guildSelectors from '../selectors';
import * as guildSlices from '../slices';

export const onLoadGuildData =
  (addresses: string[]): AppThunk =>
  (dispatch, getState) => {
    const isLoaded: boolean = guildSelectors.getIsGuildDataLoaded(getState());

    if (isLoaded) {
      // dispatch(guildSlices.resetWarehouseItems());
      // dispatch(guildSlices.resetFakeGotchis());
    }

    dispatch(guildEffects.onLoadOwnedGotchis(addresses));
    // dispatch(guildEffects.onLoadLentGotchis(address));
    // dispatch(guildEffects.onLoadBorrowedGotchis(address));
    // dispatch(guildEffects.onLoadPortals(address));
    // dispatch(guildEffects.onLoadWarehouse(address));
    // dispatch(guildEffects.onLoadTickets(address));
    // dispatch(guildEffects.onLoadInstallations(address));
    // dispatch(guildEffects.onLoadTiles(address));
    // dispatch(guildEffects.onLoadRealm(address));
    // dispatch(guildEffects.onLoadFakeGotchis(address));
    // dispatch(guildEffects.onLoadItemsForSale(address));
  };

export const onUpdateGuildLoadingStates = (): AppThunk => (dispatch, getState) => {
  const isLoaded: boolean = guildSelectors.getIsGuildDataLoaded(getState());

  if (isLoaded) {
    dispatch(guildSlices.setIsInitialOwnedGotchisLoading(true));
    // dispatch(guildSlices.setIsInitialBorrowedGotchisLoading(true));
    // dispatch(guildSlices.setIsInitialFakeGotchisLoading(true));
    // dispatch(guildSlices.setIsInitialInstallationsLoading(true));
    // dispatch(guildSlices.setIsInitialItemsForSaleLoading(true));
    // dispatch(guildSlices.setIsInitialLentGotchisLoading(true));
    // dispatch(guildSlices.setIsInitialPortalsLoading(true));
    // dispatch(guildSlices.setIsInitialRealmLoading(true));
    // dispatch(guildSlices.setIsInitialTicketsLoading(true));
    // dispatch(guildSlices.setIsInitialTilesLoading(true));
    // dispatch(guildSlices.setIsInitialWarehouseLoading(true));
  }
};
