import { AppThunk } from 'core/store/store';

import { onLoadBorrowedGotchis } from './borrowed-gotchis.effect';
import { onLoadLentGotchis } from './lent-gotchis.effect';

export const onLoadClientData =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(onLoadLentGotchis(address));
    dispatch(onLoadBorrowedGotchis(address));
  };
