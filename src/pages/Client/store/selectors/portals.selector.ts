import { RootState } from 'core/store/store';

import { SortingItem } from 'shared/models';

import { ClientPortal } from '../../models';

export const getPortals = (state: RootState): ClientPortal[] => state.client.portals.portals.data;

export const getPortalsCount = (state: RootState): number => state.client.portals.portals.data.length;

export const getIsInitialPortalsLoading = (state: RootState): boolean => state.client.portals.isInitialPortalsLoading;

export const getPortalsSorting = (state: RootState): SortingItem => state.client.portals.portalsSorting;
