import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildCardNameStyles = makeStyles((theme) =>
  createStyles({
    guildCardName: {
      fontWeight: 700,
      fontFamily: 'Amatic SC, cursive',
      transition: 'color .2s linear',
      fontSize: 26,
      lineHeight: 1.2,
      padding: theme.spacing(0.5, 0, 1),
      borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
      margin: 0,
      [theme.breakpoints.down('md')]: {
        fontSize: 14
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 12
      }
    }
  })
);
