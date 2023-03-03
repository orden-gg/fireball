import { combineReducers } from '@reduxjs/toolkit';

import { borrowedGotchisReducer } from './borrowed-gotchis.slice';
import { fakeGotchisReducer } from './fake-gotchis.slice';
import { lentGotchisReducer } from './lent-gotchis.slice';
import { ownedGotchisReducer } from './owned-gotchis.slice';
import { portalsReducer } from './portals.slice';
import { ticketsReducer } from './tickets.slice';
import { warehouseReducer } from './warehouse.slice';

export const clientReducers = combineReducers({
  borrowedGotchis: borrowedGotchisReducer,
  fakeGotchis: fakeGotchisReducer,
  lentGotchis: lentGotchisReducer,
  ownedGotchis: ownedGotchisReducer,
  portals: portalsReducer,
  tickets: ticketsReducer,
  warehouse: warehouseReducer
});
