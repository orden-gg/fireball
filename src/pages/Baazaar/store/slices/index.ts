import { combineReducers } from '@reduxjs/toolkit';

import * as fromActivityConsumablesListings from './activity-consumables-listings.slice';
import * as fromActivityGotchisListings from './activity-gotchis-listings.slice';
import * as fromActivityInstallationsListings from './activity-installations-listings.slice';
import * as fromActivityParcelsListings from './activity-parcels-listings.slice';
import * as fromActivityPortalsListings from './activity-portals-listings.slice';
import * as fromActivityTilesListingsfrom from './activity-tiles-listings.slice';
import * as fromActivityWearablesListings from './activity-wearables-listings.slice';
import * as fromClosedPortalsListings from './closed-portals-listings.slice';
import * as fromConsumablesListings from './consumables-listings.slice';
import * as fromGotchisListings from './gotchis-listings.slice';
import * as fromInstallationsListings from './installations-listings.slice';
import * as fromOpenedPortalsListings from './opened-portals-listings.slice';
import * as fromParcelsListings from './parcels-listings.slice';
import * as fromTilesListings from './tiles-listings.slice';
import * as fromWearablesListings from './wearables-listings.slice';

export const activityReducers = combineReducers({
  portals: fromActivityPortalsListings.activityPortalsListingsReducer,
  gotchis: fromActivityGotchisListings.activityGotchisListingsReducer,
  parcels: fromActivityParcelsListings.activityParcelsListingsReducer,
  wearables: fromActivityWearablesListings.activityWearablesListingsReducer,
  installations: fromActivityInstallationsListings.activityInstallationsListingsReducer,
  tiles: fromActivityTilesListingsfrom.activityTilesListingsReducer,
  consumables: fromActivityConsumablesListings.activityConsumablesListingsReducer
});

export const baazarReducers = combineReducers({
  gotchis: fromGotchisListings.gotchisListingsReducer,
  closedPortals: fromClosedPortalsListings.closedPortalsListingsReducer,
  consumables: fromConsumablesListings.consumablesListingsReducer,
  installations: fromInstallationsListings.installationsListingsReducer,
  openedPortals: fromOpenedPortalsListings.openedPortalsListingsReducer,
  parcels: fromParcelsListings.parcelsListingsReducer,
  tiles: fromTilesListings.tilesListingsReducer,
  wearables: fromWearablesListings.wearablesListingsReducer,
  // activity
  activity: activityReducers
});

export * from './activity-consumables-listings.slice';
export * from './activity-gotchis-listings.slice';
export * from './activity-installations-listings.slice';
export * from './activity-parcels-listings.slice';
export * from './activity-portals-listings.slice';
export * from './activity-tiles-listings.slice';
export * from './activity-wearables-listings.slice';
export * from './closed-portals-listings.slice';
export * from './consumables-listings.slice';
export * from './gotchis-listings.slice';
export * from './installations-listings.slice';
export * from './opened-portals-listings.slice';
export * from './parcels-listings.slice';
export * from './tiles-listings.slice';
export * from './wearables-listings.slice';
