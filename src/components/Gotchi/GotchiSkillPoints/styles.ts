import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
  createStyles({
    skillpoints: {
      fontSize: 11,
      fontWeight: 400,
      marginTop: -1
    },
    skillpointsHighlight: {
      color: '#00FFFF',
      '&:before': {
        content: '"+"'
      }
    }
  })
);
