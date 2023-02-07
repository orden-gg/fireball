import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
  createStyles({
    sidebar: {
      maxHeight: 'calc(100vh - 177px)',
      overflowY: 'auto'
    },
    section: {
      '& + $section': {
        marginTop: 12
      }
    },
    filtersWrapper: {
      paddingBottom: 12
    },
    buttonsWrapper: {
      padding: 12,
      display: 'flex',
      justifyContent: 'space-between'
    },
    results: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 8,
      fontWeight: 'bold',
      background: alpha('#000', 0.2),
      borderRadius: '4px 4px 0 0'
    },
    placeholder: {
      marginLeft: 4,
      '& img': {
        display: 'block'
      }
    },
    history: {
      marginTop: 4
    }
  })
);
