import { AppThunk } from 'core/store/store';

import { onLoadLentGotchis } from './lent-gotchis.effect';

export const onLoadClientData =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(onLoadLentGotchis(address));
  };
