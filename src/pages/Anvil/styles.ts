import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    anvilWrapper: {
      padding: theme.spacing(3),
      maxWidth: 1400,
      margin: 'auto',
      width: '100%',
      minHeight: 'calc(100vh - 177px)'
    },
    anvilTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& h1': {
        marginRight: 20
      }
    },
    anvilSelectWrapper: {
      '& .MuiSelect-select': {
        display: 'flex !important',
        alignItems: 'center'
      }
    },
    anvilSelect: {
      display: 'flex',
      alignItems: 'center'
    },
    anvilSelectImage: {
      width: '20px !important',
      height: 20,
      padding: '0 !important',
      margin: '0 12px 0 0 !important'
    }
  })
);
