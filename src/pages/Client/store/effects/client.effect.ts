import { AppThunk } from 'core/store/store';

import * as clientEffects from '../effects';
import * as clientSelectors from '../selectors';
import * as clientSlices from '../slices';

export const onLoadClientData = (address: string): AppThunk => (dispatch, getState) => {
  const isLoaded: boolean = clientSelectors.getIsClientDataLoaded(getState());

  if (isLoaded) {
    dispatch(clientSlices.resetWarehouseItems());
    dispatch(clientSlices.resetFakeGotchis());
  }

  dispatch(clientEffects.onLoadOwnedGotchis(address));
  dispatch(clientEffects.onLoadLentGotchis(address));
  dispatch(clientEffects.onLoadBorrowedGotchis(address));
  dispatch(clientEffects.onLoadPortals(address));
  dispatch(clientEffects.onLoadWarehouse(address));
  dispatch(clientEffects.onLoadTickets(address));
  dispatch(clientEffects.onLoadInstallations(address));
  dispatch(clientEffects.onLoadTiles(address));
  dispatch(clientEffects.onLoadRealm(address));
  dispatch(clientEffects.onLoadFakeGotchis(address));
  dispatch(clientEffects.onLoadItemsForSale(address));
};

export const onUpdateClientLoadingStates = (): AppThunk => (dispatch, getState) => {
  const isLoaded: boolean = clientSelectors.getIsClientDataLoaded(getState());

  if (isLoaded) {
    dispatch(clientSlices.setIsInitialBorrowedGotchisLoading(true));
    dispatch(clientSlices.setIsInitialFakeGotchisLoading(true));
    dispatch(clientSlices.setIsInitialInstallationsLoading(true));
    dispatch(clientSlices.setIsInitialItemsForSaleLoading(true));
    dispatch(clientSlices.setIsInitialLentGotchisLoading(true));
    dispatch(clientSlices.setIsInitialOwnedGotchisLoading(true));
    dispatch(clientSlices.setIsInitialPortalsLoading(true));
    dispatch(clientSlices.setIsInitialRealmLoading(true));
    dispatch(clientSlices.setIsInitialTicketsLoading(true));
    dispatch(clientSlices.setIsInitialTilesLoading(true));
    dispatch(clientSlices.setIsInitialWarehouseLoading(true));
  }
};
