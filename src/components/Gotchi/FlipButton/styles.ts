import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    flipButtonWrapper: {
      margin: '0 -5px -8px'
    },
    flipButton: {
      height: 20,
      border: 'none',
      width: '100%',
      display: 'block',
      cursor: 'pointer',
      position: 'relative',
      marginTop: theme.spacing(0.5),
      '.common &': {
        backgroundColor: theme.palette.rarity.common
      },
      '.rare &': {
        backgroundColor: theme.palette.rarity.rare
      },
      '.mythical &': {
        backgroundColor: theme.palette.rarity.mythical
      },
      '.godlike &': {
        backgroundColor: theme.palette.rarity.godlike
      },
      '&:active': {
        '&:before': {
          left: theme.spacing(2)
        },
        '&:after': {
          right: theme.spacing(2)
        }
      },
      '&:hover': {
        '&:before': {
          left: theme.spacing(1)
        },
        '&:after': {
          right: theme.spacing(1)
        }
      },
      '&:before, &:after': {
        content: '""',
        height: 2,
        backgroundColor: theme.palette.secondary.dark,
        position: 'absolute',
        marginTop: -1,
        top: '50%'
      },
      '&:before': {
        left: '25%',
        right: '50%',
        transition: 'left .2s',
        marginRight: theme.spacing(1.8)
      },
      '&:after': {
        right: '25%',
        left: '50%',
        transition: 'right .2s',
        marginLeft: theme.spacing(1.8)
      }
    },
    flipButtonIcon: {
      margin: 'auto',
      display: 'block'
    }
  })
);
