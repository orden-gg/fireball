import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    gotchiTraits: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      minHeight: 26,
      fontSize: 13
    },
    gotchiTrait: {
      flexBasis: '49%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '2px 3px 2px 2px',
      margin: '1px 0',
      minHeight: 26,
      '&.common': {
        backgroundColor: theme.palette.rarity.common
      },
      '&.uncommon': {
        backgroundColor: theme.palette.rarity.uncommon
      },
      '&.rare': {
        backgroundColor: theme.palette.rarity.rare
      },
      '&.legendary': {
        backgroundColor: theme.palette.rarity.legendary
      },
      '&.mythical': {
        backgroundColor: theme.palette.rarity.mythical
      },
      '&.godlike': {
        backgroundColor: theme.palette.rarity.godlike
      },
      '.horizontal &': {
        margin: theme.spacing(0.5, 0)
      },
      '&:hover $defaultVal': {
        display: 'inline-block'
      }
    },
    gotchiTraitIcon: {
      width: 21
    },
    mainVal: {
      color: '#000',
      fontWeight: 600,
      margin: 0,
      whiteSpace: 'nowrap'
    },
    defaultVal: {
      display: 'none',
      color: '#fff',
      fontWeight: 500
    }
  })
);
