import { combineReducers } from '@reduxjs/toolkit';

import { gotchisListingsReducer } from './gotchis-listings.slice';
import { closedPortalsListingsReducer } from './closed-portals-listings.slice';
import { consumablesListingsReducer } from './consumables-listings.slice';
import { installationsListingsReducer } from './installations-listings.slice';
import { parcelsListingsReducer } from './parcels-listings.slice';
import { tilesListingsReducer } from './tiles-listings.slice';
import { wearablesListingsReducer } from './wearables-listings.slice';
// activity
import { activityPortalsListingsReducer } from './activity-portals-listings.slice';
import { activityGotchisListingsReducer } from './activity-gotchis-listings.slice';

export const activityReducers = combineReducers({
    portals: activityPortalsListingsReducer,
    gotchis: activityGotchisListingsReducer
});

export const baazarReducers = combineReducers({
    gotchis: gotchisListingsReducer,
    closedPortals: closedPortalsListingsReducer,
    consumables: consumablesListingsReducer,
    installations: installationsListingsReducer,
    parcels: parcelsListingsReducer,
    tiles: tilesListingsReducer,
    wearables: wearablesListingsReducer,
    // activity
    activity: activityReducers
});
