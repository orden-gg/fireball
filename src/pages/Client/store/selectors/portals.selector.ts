import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { PortalsState } from '../slices';

const portalsStateSelector = createSelector(
  (state: RootState) => state.client.portals,
  (portalsState: PortalsState) => portalsState
);

export const getPortals = createSelector(portalsStateSelector, (state: PortalsState) => state.portals.data);

export const getPortalsCount = createSelector(portalsStateSelector, (state: PortalsState) => state.portals.data.length);

export const getIsInitialPortalsLoading = createSelector(
  portalsStateSelector,
  (state: PortalsState) => state.isInitialPortalsLoading
);

export const getPortalsSorting = createSelector(portalsStateSelector, (state: PortalsState) => state.portalsSorting);
