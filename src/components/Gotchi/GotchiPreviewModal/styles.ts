import { createStyles, makeStyles } from '@mui/styles';

export const gotchiPreviewModalStyles = makeStyles((theme) =>
  createStyles({
    previewModal: {
      width: 1000,
      padding: theme.spacing(1.5),
      '&.emptyState': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 32px)'
      }
    },
    identityBlock: {
      maxWidth: 300,
      margin: theme.spacing(1, 'auto', 0)
    },
    listings: {
      textAlign: 'center',
      margin: theme.spacing(4, 'auto', 0)
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
    },
    identityTooltip: {
      padding: theme.spacing(1, 0)
    },
    inventory: {
      marginTop: theme.spacing(5)
    },
    list: {
      marginTop: theme.spacing(2)
    },
    salesHeader: {
      marginTop: theme.spacing(2)
    },
    price: {
      flexBasis: '10%'
    },
    date: {
      flexBasis: '15%'
    },
    address: {
      flexBasis: 200
    },
    wearables: {
      flexBasis: 450
    },
    button: {
      width: 'auto',
      margin: theme.spacing(0, 1),
      minWidth: 200
    }
  })
);
