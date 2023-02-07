import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: -4
    },
    title: {
      lineHeight: 1,
      marginBottom: 8
    },
    items: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    item: {
      marginRight: 4,
      marginBottom: 4,
      padding: '4px 8px',
      textTransform: 'none',
      background: alpha('#fff', 0.05),
      color: '#fff',
      minWidth: 40,
      '&.selected': {
        background: alpha('#000', 0.4),
        '&:hover': {
          background: alpha('#000', 0.3)
        }
      },
      '&:hover': {
        background: alpha('#000', 0.15)
      }
    }
  })
);
