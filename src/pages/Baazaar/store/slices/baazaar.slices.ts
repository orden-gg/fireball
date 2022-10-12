import { combineReducers } from '@reduxjs/toolkit';

import { gotchisListingsReducer } from './gotchis-listings.slice';
import { closedPortalsListingsReducer } from './closed-portals-listings.slice';
import { wearablesListingsReducer } from './wearables-listings.slice';
import { consumablesListingsReducer } from './consumables-listings.slice';

export const baazarReducers = combineReducers({
    gotchis: gotchisListingsReducer,
    closedPortals: closedPortalsListingsReducer,
    consumables: consumablesListingsReducer,
    wearables: wearablesListingsReducer
});
