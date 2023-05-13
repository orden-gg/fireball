export type SnackbarSeverity = 'error' | 'success' | 'info' | 'warning';

export type SnackbarVerticalOrigin = 'top' | 'bottom';

export type SnackbarHorizontalOrigin = 'left' | 'center' | 'right';

export interface SnackbarData {
  message: string;
  severity: SnackbarSeverity;
  vertical: SnackbarVerticalOrigin;
  horizontal: SnackbarHorizontalOrigin;
}
