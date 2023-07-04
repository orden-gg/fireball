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
      <h2 className={classes.joinGuildModalHeader}>Join Guild</h2>
      <div className={classes.joinGuildModalBody}>
        Please note, if you join this guild, you will be dropped from your current guild.
      </div>
      <div className={classes.joinGuildModalFooter}>
        <Button
          className={classes.joinGuildModalButton}
          variant='contained'
          color='secondary'
          size='large'
          onClick={onHandleCancel}
        >
          Cancel
        </Button>
        <Button className={classes.joinGuildModalButton} variant='contained' onClick={onHandleSubmit} size='large'>
          Join
        </Button>
      </div>
    </div>
  );
}
