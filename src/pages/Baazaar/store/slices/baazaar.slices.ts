import { combineReducers } from '@reduxjs/toolkit';

import { activityConsumablesListingsReducer } from './activity-consumables-listings.slice';
import { activityGotchisListingsReducer } from './activity-gotchis-listings.slice';
import { activityInstallationsListingsReducer } from './activity-installations-listings.slice';
import { activityParcelsListingsReducer } from './activity-parcels-listings.slice';
// activity
import { activityPortalsListingsReducer } from './activity-portals-listings.slice';
import { activityTilesListingsReducer } from './activity-tiles-listings.slice';
import { activityWearablesListingsReducer } from './activity-wearables-listings.slice';
import { closedPortalsListingsReducer } from './closed-portals-listings.slice';
import { consumablesListingsReducer } from './consumables-listings.slice';
import { gotchisListingsReducer } from './gotchis-listings.slice';
import { installationsListingsReducer } from './installations-listings.slice';
import { openedPortalsListingsReducer } from './opened-portals-listings.slice';
import { parcelsListingsReducer } from './parcels-listings.slice';
import { tilesListingsReducer } from './tiles-listings.slice';
import { wearablesListingsReducer } from './wearables-listings.slice';

export const activityReducers = combineReducers({
  portals: activityPortalsListingsReducer,
  gotchis: activityGotchisListingsReducer,
  parcels: activityParcelsListingsReducer,
  wearables: activityWearablesListingsReducer,
  installations: activityInstallationsListingsReducer,
  tiles: activityTilesListingsReducer,
  consumables: activityConsumablesListingsReducer
});

export const baazarReducers = combineReducers({
  gotchis: gotchisListingsReducer,
  closedPortals: closedPortalsListingsReducer,
  consumables: consumablesListingsReducer,
  installations: installationsListingsReducer,
  openedPortals: openedPortalsListingsReducer,
  parcels: parcelsListingsReducer,
  tiles: tilesListingsReducer,
  wearables: wearablesListingsReducer,
  // activity
  activity: activityReducers
});
