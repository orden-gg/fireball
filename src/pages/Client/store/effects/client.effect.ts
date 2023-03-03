import { AppThunk } from 'core/store/store';

// slices
import { resetWarehouseItems } from '../slices';
// effects
import { onLoadBorrowedGotchis } from './borrowed-gotchis.effect';
import { onLoadLentGotchis } from './lent-gotchis.effect';
import { onLoadOwnedGotchis } from './owned-gotchis.effect';
import { onLoadPortals } from './portals.effect';
import { onLoadTickets } from './tickets.effect';
import { onLoadWarehouse } from './warehouse.effect';

export const onLoadClientData =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(resetWarehouseItems());

    dispatch(onLoadOwnedGotchis(address));
    dispatch(onLoadLentGotchis(address));
    dispatch(onLoadBorrowedGotchis(address));
    dispatch(onLoadPortals(address));
    dispatch(onLoadWarehouse(address));
    dispatch(onLoadTickets(address));
  };
