import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildCardStyles = makeStyles((theme) =>
  createStyles({
    guildCard: {
      color: alpha(theme.palette.common.white, 0.7)
    },
    guildCardInner: {
      border: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
      backgroundColor: `${alpha(theme.palette.common.black, 0.2)}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      height: '100%',
      transition: 'background .3s',
      paddingBottom: theme.spacing(2),
      '&:hover': {
        backgroundColor: `${alpha(theme.palette.common.black, 0.25)}`
      }
    },
    guildWearables: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  })
);
