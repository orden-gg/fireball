import { combineReducers } from '@reduxjs/toolkit';

import { gotchisListingsReducer } from './gotchis-listings.slice';
import { closedPortalsListingsReducer } from './closed-portals-listings.slice';
import { wearablesListingsReducer } from './wearables-listings.slice';

export const baazarReducers = combineReducers({
    gotchis: gotchisListingsReducer,
    closedPortals: closedPortalsListingsReducer,
    wearables: wearablesListingsReducer
});
