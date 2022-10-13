import { combineReducers } from '@reduxjs/toolkit';

import { gotchisListingsReducer } from './gotchis-listings.slice';
import { closedPortalsListingsReducer } from './closed-portals-listings.slice';
import { consumablesListingsReducer } from './consumables-listings.slice';
import { parcelsListingsReducer } from './parcels-listings.slice';
import { wearablesListingsReducer } from './wearables-listings.slice';

export const baazarReducers = combineReducers({
    gotchis: gotchisListingsReducer,
    closedPortals: closedPortalsListingsReducer,
    consumables: consumablesListingsReducer,
    parcels: parcelsListingsReducer,
    wearables: wearablesListingsReducer
});
