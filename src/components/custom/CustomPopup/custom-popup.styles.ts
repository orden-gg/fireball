import { createStyles, makeStyles } from '@mui/styles';

export const customPopupStyles = makeStyles(() =>
  createStyles({
    popupWrapper: {
      position: 'relative',
      zIndex: 1203
    },
    popupBody: {
      maxHeight: '300px',
      position: 'absolute',
      top: '100%',
      left: '50%',
      zIndex: 1203,
      transform: 'translateX(-50%)',
      overflowY: 'scroll',
      background: '#2b2a2a'
    }
  })
);
