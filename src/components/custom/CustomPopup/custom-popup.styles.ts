import { createStyles, makeStyles } from '@mui/styles';

export const customPopupStyles = makeStyles(() =>
  createStyles({
    popupWrapper: {
      position: 'relative',
      zIndex: 1203
    },
    popupBody: {
      position: 'absolute',
      overflowY: 'scroll',
      maxHeight: '150px',
      left: '0%',
      zIndex: 1203,
      background: '#2b2a2a'
    }
  })
);
