import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    button: {
      background: alpha(theme.palette.rarity.mythical, 0.2),
      border: `2px solid ${alpha(theme.palette.rarity.rare, 0.5)}`,
      color: '#fff',
      borderRadius: 0,
      '&:hover': {
        borderColor: theme.palette.rarity.rare,
        background: theme.palette.rarity.mythical,
        color: '#000'
      }
    }
  })
);
