import { combineReducers } from '@reduxjs/toolkit';

import * as fromBorrowedGotchis from './borrowed-gotchis.slice';
import * as fromFakeGotchis from './fake-gotchis.slice';
import * as fromInstallations from './installations.slice';
import * as fromItemsForSale from './items-for-sale.slice';
import * as fromLentGotchis from './lent-gotchis.slice';
import * as fromOwnedGotchis from './owned-gotchis.slice';
import * as fromPortals from './portals.slice';
import * as fromRealm from './realm.slice';
import * as fromTickets from './tickets.slice';
import * as fromTiles from './tiles.slice';
import * as fromWarehouse from './warehouse.slice';

export interface ClientModuleState {
  borrowedGotchis: fromBorrowedGotchis.BorrowedGotchisState;
  fakeGotchis: fromFakeGotchis.ClientFakeGotchisState;
  itemsForSale: fromItemsForSale.ItemsForSaleState;
  installations: fromInstallations.InstallationsState;
  lentGotchis: fromLentGotchis.LentGotchisState;
  ownedGotchis: fromOwnedGotchis.OwnedGotchisState;
  portals: fromPortals.PortalsState;
  realm: fromRealm.RealmState;
  tickets: fromTickets.TicketsState;
  tiles: fromTiles.TilesState;
  warehouse: fromWarehouse.WarehouseState;
}

export const clientReducers = combineReducers({
  borrowedGotchis: fromBorrowedGotchis.borrowedGotchisReducer,
  fakeGotchis: fromFakeGotchis.fakeGotchisReducer,
  itemsForSale: fromItemsForSale.itemsForSaleReducer,
  installations: fromInstallations.installationsReducer,
  lentGotchis: fromLentGotchis.lentGotchisReducer,
  ownedGotchis: fromOwnedGotchis.ownedGotchisReducer,
  portals: fromPortals.portalsReducer,
  realm: fromRealm.realmReducer,
  tickets: fromTickets.ticketsReducer,
  tiles: fromTiles.tilesReducer,
  warehouse: fromWarehouse.warehouseReducer
});

export * from './borrowed-gotchis.slice';
export * from './fake-gotchis.slice';
export * from './items-for-sale.slice';
export * from './installations.slice';
export * from './lent-gotchis.slice';
export * from './owned-gotchis.slice';
export * from './portals.slice';
export * from './realm.slice';
export * from './tickets.slice';
export * from './tiles.slice';
export * from './warehouse.slice';
