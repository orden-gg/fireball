import { createStyles, makeStyles } from '@mui/styles';

export const gotchiFooterStyles = makeStyles(() =>
  createStyles({
    gotchiFooter: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center'
    }
  })
);
