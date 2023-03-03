import { AppThunk } from 'core/store/store';

// slices
import { resetFakeGotchis, resetWarehouseItems } from '../slices';
// effects
import { onLoadBorrowedGotchis } from './borrowed-gotchis.effect';
import { onLoadFakeGotchis } from './fake-gotchis.effect';
import { onLoadInstallations } from './installations.effect';
import { onLoadLentGotchis } from './lent-gotchis.effect';
import { onLoadOwnedGotchis } from './owned-gotchis.effect';
import { onLoadPortals } from './portals.effect';
import { onLoadRealm } from './realm.effect';
import { onLoadTickets } from './tickets.effect';
import { onLoadTiles } from './tiles.effect';
import { onLoadWarehouse } from './warehouse.effect';

export const onLoadClientData =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(resetWarehouseItems());
    dispatch(resetFakeGotchis());

    dispatch(onLoadOwnedGotchis(address));
    dispatch(onLoadLentGotchis(address));
    dispatch(onLoadBorrowedGotchis(address));
    dispatch(onLoadPortals(address));
    dispatch(onLoadWarehouse(address));
    dispatch(onLoadTickets(address));
    dispatch(onLoadInstallations(address));
    dispatch(onLoadTiles(address));
    dispatch(onLoadRealm(address));
    dispatch(onLoadFakeGotchis(address));
  };
