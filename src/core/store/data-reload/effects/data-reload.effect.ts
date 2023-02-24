import { AppThunk } from 'core/store/store';

import { setLastUpdatedTimestamp } from '../slices/data-reload.slice';

export const onSetLastUpdatedTimestamp = (something: number): AppThunk => (dispatch) => {
  dispatch(setLastUpdatedTimestamp(something));
};
