import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildCardImageStyles = makeStyles((theme) =>
  createStyles({
    guildCardImageWrap: {
      maxWidth: '30%',
      minWidth: '30%',
      minHeight: '100%',
      position: 'relative',
      paddingBottom: '30%',
      backgroundColor: alpha(theme.palette.common.black, 0.2),
      zIndex: 1,
      '& .guild-card-image': {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80%',
        maxHeight: '80%',
        '&.placeholder': {
          color: alpha(theme.palette.secondary.dark, 0.7)
        }
      }
    }
  })
);
