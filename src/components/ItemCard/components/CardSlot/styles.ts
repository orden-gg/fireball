import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    slot: {
      margin: 'auto auto auto 0',
      minWidth: 34,
      color: theme.palette.common.white,
      opacity: 0.5,
      fontSize: 12,
      lineHeight: 1,
      fontWeight: 600,
      padding: '2px 6px',
      transition: 'opacity .2s ease-in-out',
      '& span': {
        display: 'inline-block'
      }
    },
    divider: {
      marginRight: 4
    }
  })
);
