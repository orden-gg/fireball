import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'core/store/store';
import { PortalState } from '../slices/portal.slice';

export const portalSelector = createSelector(
  (state: RootState) => state.portal,
  (portalState: PortalState) => portalState
);

export const getPortal = createSelector(
  portalSelector,
  (state: PortalState) => state.portal.data
);

export const getIsPortalLoaded = createSelector(
  portalSelector,
  (state: PortalState) => state.isInitialPortalLoading
);

