import { createStyles, makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';
import { alpha } from '@mui/system';

export const styles = makeStyles(theme =>
  createStyles({
    card: {
      display: 'flex',
      border: '3px solid gray',
      '&.default': {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.background.secondary
      },
      '&.common': {
        backgroundColor: alpha(theme.palette.rarity.common, 0.15),
        color: theme.palette.rarity.common,
        borderColor: theme.palette.rarity.common
      },
      '&.uncommon': {
        backgroundColor: alpha(theme.palette.rarity.uncommon, 0.15),
        color: theme.palette.rarity.uncommon,
        borderColor: theme.palette.rarity.uncommon
      },
      '&.rare': {
        backgroundColor: alpha(theme.palette.rarity.rare, 0.15),
        color: theme.palette.rarity.rare,
        borderColor: theme.palette.rarity.rare
      },
      '&.legendary': {
        backgroundColor: alpha(theme.palette.rarity.legendary, 0.15),
        color: theme.palette.rarity.legendary,
        borderColor: theme.palette.rarity.legendary
      },
      '&.mythical': {
        backgroundColor: alpha(theme.palette.rarity.mythical, 0.1),
        color: theme.palette.rarity.mythical,
        borderColor: theme.palette.rarity.mythical
      },
      '&.godlike': {
        backgroundColor: alpha(theme.palette.rarity.godlike, 0.1),
        color: theme.palette.rarity.godlike,
        borderColor: theme.palette.rarity.godlike
      },
      '&.drop': {
        backgroundColor: alpha(theme.palette.rarity.drop, 0.1),
        color: lighten(theme.palette.rarity.drop, 0.4),
        borderColor: theme.palette.rarity.drop
      },
      '&.golden': {
        backgroundColor: alpha(theme.palette.rarity.golden, 0.15),
        color: theme.palette.rarity.golden,
        borderColor: theme.palette.rarity.golden
      },
      '&.partner': {
        backgroundColor: alpha(theme.palette.realm.partner, 0.15),
        color: theme.palette.realm.partner,
        borderColor: theme.palette.realm.partner
      },
      '&.haunt1': {
        backgroundColor: alpha(theme.palette.haunts.h1, 0.15),
        color: lighten(theme.palette.haunts.h1, 0.2),
        borderColor: theme.palette.haunts.h1
      },
      '&.haunt2': {
        backgroundColor: alpha(theme.palette.haunts.h2, 0.15),
        color: lighten(theme.palette.haunts.h2, 0.2),
        borderColor: theme.palette.haunts.h2
      },
      '&.unknown': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: lighten(theme.palette.primary.main, 0.2)
      }
    },
    cardVertical: {
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(1),
      overflow: 'hidden'
    },
    cardHorizontal: {
      minHeight: 200,
      padding: theme.spacing(0, 1)
    }
  })
);
