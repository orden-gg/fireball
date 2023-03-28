import { createStyles, makeStyles } from '@mui/styles';

export const fieldTextStyles = makeStyles((theme) =>
  createStyles({
    formFieldText: {
      margin: theme.spacing(0.5),
      fontSize: 12,
      '&.warning': {
        color: theme.palette.warning.main
      },

      '&.error': {
        color: theme.palette.error.main
      },

      '&.success': {
        color: theme.palette.success.main
      }
    }
  })
);
