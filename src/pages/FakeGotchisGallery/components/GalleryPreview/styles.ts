import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    galleryPreview: {
      minWidth: 300,
      position: 'relative'
    },
    galleryImage: {
      display: 'block',
      maxWidth: '90vw',
      maxHeight: '85vh'
    },
    galleryDescr: {
      background: theme.palette.secondary.main,
      position: 'absolute',
      top: '100%',
      right: -2,
      left: -2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      minHeight: 30,
      padding: 4,
      '& > div': {
        minWidth: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
      },
      '& span': {
        fontStyle: 'italic',
        fontWeight: 700,
        color: '#06b6b6',
        marginRight: 4
      }
    },
    galleryDescTitle: {
      width: '100%',
      padding: '0 4px',
      '& span': {
        fontSize: 16,
        color: '#cbac1c',
        fontStyle: 'normal'
      },
      '& a': {
        color: 'cornflowerblue',
        marginLeft: 8,
        fontSize: 13,
        fontStyle: 'italic',
        '&:hover': {
          textDecoration: 'none'
        }
      }
    }
  })
);
