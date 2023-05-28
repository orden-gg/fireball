import { Button } from '@mui/material';

import { joinGuildModaStyles } from './styles';

interface JoinGuildModalProps {
  onHandleCancel: () => void;
  onHandleSubmit: () => void;
}

export function JoinGuildModal({ onHandleCancel, onHandleSubmit }: JoinGuildModalProps) {
  const classes = joinGuildModaStyles();

  return (
    <div className={classes.joinGuildModalContainer}>
      <div className={classes.joinGuildModalHeader}>Join Guild</div>
      <div className={classes.joinGuildModalBody}>
        Please note, if you join this guild, you will be dropped from your current guild.
      </div>
      <div className={classes.joinGuildModalFooter}>
        <Button
          className={classes.joinGuildModalCancelButton}
          variant='contained'
          color='secondary'
          onClick={onHandleCancel}
        >
          Cancel
        </Button>
        <Button variant='contained' onClick={onHandleSubmit}>
          Join
        </Button>
      </div>
    </div>
  );
}
