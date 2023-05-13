import { AppThunk } from 'core/store/store';

import { SnackbarData } from 'shared/models';

// slices
import * as snackbarSlices from '../slices/snackbar.slice';

export const onOpenSnackbar =
  (data: SnackbarData): AppThunk =>
  (dispatch) => {
    dispatch(snackbarSlices.setIsSnackbarOpen(true));
    dispatch(snackbarSlices.setSnackbarData(data));
  };
