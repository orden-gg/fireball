import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    gotchiIdentity: {
      position: 'absolute',
      right: 0,
      top: 5,
      zIndex: 1,
      backgroundColor: alpha('#000', 0.5),
      textShadow: `0 0 4px ${theme.palette.common.black}`,
      padding: theme.spacing(0, 0.5),
      lineHeight: 1.45,
      fontSize: 13,
      '&.common': {
        backgroundColor: alpha(theme.palette.rarity.common, 0.8)
      },
      '&.uncommon': {
        backgroundColor: alpha(theme.palette.rarity.uncommon, 0.8)
      },
      '&.rare': {
        backgroundColor: alpha(theme.palette.rarity.rare, 0.8)
      },
      '&.mythical': {
        backgroundColor: alpha(theme.palette.rarity.mythical, 0.8)
      },
      '&.godlike': {
        backgroundColor: alpha(theme.palette.rarity.godlike, 0.8)
      },
      '& span': {
        fontWeight: 500
      }
    },
    tooltipText: {
      fontWeight: 300,
      margin: theme.spacing(1, 0),
      display: 'block'
    }
  })
);
