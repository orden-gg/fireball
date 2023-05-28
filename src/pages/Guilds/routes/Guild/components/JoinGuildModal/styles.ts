import { createStyles, makeStyles } from '@mui/styles';

export const joinGuildModaStyles = makeStyles(() =>
  createStyles({
    joinGuildModalContainer: {
      maxWidth: 320,
      padding: '4px 12px'
    },
    joinGuildModalHeader: {
      padding: '8px 0',
      textAlign: 'center'
    },
    joinGuildModalBody: {
      margin: '12px 0px',
      textAlign: 'center',
      color: 'orange'
    },
    joinGuildModalFooter: {
      padding: '8px 0',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    joinGuildModalCancelButton: {
      marginRight: 8
    }
  })
);
