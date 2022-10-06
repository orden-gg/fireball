import { combineReducers } from '@reduxjs/toolkit';

import { baazaar } from './baazaar.slice';
import { closedPortalsListingsReducer } from './closed-portals-listings.slice';

export const baazarReducers = combineReducers({
    baazaar,
    closedPortals: closedPortalsListingsReducer
});
