import { Alert, Snackbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromSnackbarStore from 'core/store/snackbar';

import { SnackbarData } from 'shared/models';

export function CustomSnackbar() {
  const dispatch = useAppDispatch();

  const snackbarData: SnackbarData = useAppSelector(fromSnackbarStore.getSnackbarData);
  const isSnackbarOpen: boolean = useAppSelector(fromSnackbarStore.getIsSnackbarOpen);

  const onSnackbarClose = (): void => {
    dispatch(fromSnackbarStore.setIsSnackbarOpen(false));
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      anchorOrigin={{ vertical: snackbarData.vertical, horizontal: snackbarData.horizontal }}
      autoHideDuration={3000}
      onClose={() => onSnackbarClose()}
    >
      <Alert elevation={6} variant='filled' severity={snackbarData.severity}>
        {snackbarData.message}
      </Alert>
    </Snackbar>
  );
}
