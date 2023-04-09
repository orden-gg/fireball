import { Button, alpha, lighten } from '@mui/material';
import { createStyles, makeStyles, styled } from '@mui/styles';

export const guildCardStyles = makeStyles((theme) =>
  createStyles({
    guildCard: {
      color: alpha(theme.palette.common.white, 0.7)
    },
    guildCardInner: {
      border: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
      backgroundColor: `${alpha(theme.palette.common.black, 0.2)}`,
      position: 'relative',
      transition: 'background .3s',
      '&:hover': {
        backgroundColor: `${alpha(theme.palette.common.black, 0.25)}`
      }
    },
    guildTop: {
      display: 'flex'
    },
    guildLogo: {
      maxWidth: '30%',
      minWidth: '30%',
      minHeight: '100%',
      position: 'relative',
      paddingBottom: '30%',
      zIndex: 1
    },
    guildLogoImage: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '80%',
      maxHeight: '80%',
      '&.placeholder': {
        color: alpha(theme.palette.secondary.dark, 0.7)
      }
    },
    guildBody: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      padding: theme.spacing(1),
      position: 'relative',
      zIndex: 1
    },
    guildName: {
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
    },
    guildAssetsList: {
      listStyle: 'none',
      padding: 0,
      textTransform: 'none',
      margin: theme.spacing(0, 0, 1, 0),
      display: 'flex',
      flexWrap: 'wrap'
    },
    guildWearables: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    divider: {
      opacity: 0.5,
      margin: theme.spacing(0, 1)
    },
    guildContent: {
      paddingBottom: theme.spacing(2)
    },
    guildDescription: {
      textAlign: 'left',
      fontWeight: 300,
      lineHeight: 1.6,
      margin: theme.spacing(1)
    },
    guildFooter: {
      display: 'flex',
      justifyContent: 'center'
    },
    guildButton: {
      display: 'block',
      margin: theme.spacing(1, 1, 0),
      width: 150
    }
  })
);

export const GuildCardButton = styled(Button)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.5),
  borderColor: lighten(theme.palette.background.default, 0.25),
  '&:hover': {
    borderColor: lighten(theme.palette.background.default, 0.25),
    backgroundColor: alpha(theme.palette.background.default, 0.35)
  }
}));
