import { createStyles, makeStyles } from '@mui/styles';

export const parcelPreviewModalStyles = makeStyles((theme) =>
  createStyles({
    previewModal: {
      width: 900,
      // padding: theme.spacing(1.5),
      '&.emptyState': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh'
      }
    },
    title: {
      fontSize: 20,
      fontWeight: 500,
      textAlign: 'center'
    },
    titleText: {
      width: '80%',
      margin: 'auto',
      '& span': {
        color: theme.palette.primary.main
      }
    }
  })
);
