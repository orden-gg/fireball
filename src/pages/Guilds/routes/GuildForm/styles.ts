import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const guildFormStyles = makeStyles((theme) =>
  createStyles({
    formWrappper: {
      maxWidth: 1000,
      width: '100%',
      margin: 'auto',
      padding: theme.spacing(4, 0)
    },
    formContent: {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(3, 2),
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      boxShadow: `0 0 10px 10px ${alpha(theme.palette.background.secondary, 0.5)}`,
      width: '100%'
    },
    formTitle: {
      textAlign: 'center'
    },
    formRow: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0),
      alignItems: 'flex-start'
    },
    formRowBody: {
      width: 540
    },
    formInput: {
      backgroundColor: theme.palette.background.secondary,
      width: '100%'
    },
    formLabel: {
      width: 180,
      textAlign: 'right',
      margin: theme.spacing(2.3, 3, 0, 0),
      fontSize: 16,
      whiteSpace: 'nowrap',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    required: {
      '&:after': {
        content: '"*"',
        display: 'inline-block',
        margin: theme.spacing(-1, 0, 0, 0.5),
        color: theme.palette.error.light
      }
    },
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
    },
    formGroup: {
      display: 'flex',
      margin: theme.spacing(0, -1),
      '& $formInput': {
        margin: theme.spacing(1)
      }
    },
    formUploadInput: {
      display: 'none'
    },
    formUploadButton: {
      margin: theme.spacing(1.25, 0, 1),
      minWidth: 160
    },
    formRadio: {
      margin: theme.spacing(0.5, 1, 0.5, 0),
      '& .MuiSvgIcon-root': {
        fontSize: 28
      }
    },
    formSubmitButton: {
      width: 240,
      margin: 'auto'
    },
    formFooter: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center'
    }
  })
);
