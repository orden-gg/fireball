import { makeStyles, createStyles } from '@mui/styles';
import { alpha } from '@mui/material';

export const styles = makeStyles(theme =>
  createStyles({
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 1.5,
      background: alpha(theme.palette.rarity.rare, 0.2),
      border: `3px solid ${alpha(theme.palette.rarity.rare, 0.5)}`,
      color: '#fff',
      borderRadius: 0,
      '&:hover': {
        borderColor: theme.palette.rarity.rare,
        background: theme.palette.rarity.mythical,
        color: '#000'
      },
      '& img': {
        marginLeft: 4
      }
    }
  })
);
