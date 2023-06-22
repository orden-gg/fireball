import { Button } from '@mui/material';

import { leaveGuildModaStyles } from './styles';

interface LeaveGuildModalProps {
  onHandleCancel: () => void;
  onHandleSubmit: () => void;
}

export function LeaveGuildModal({ onHandleCancel, onHandleSubmit }: LeaveGuildModalProps) {
  const classes = leaveGuildModaStyles();

  return (
    <div className={classes.leaveGuildModalContainer}>
      <h2 className={classes.leaveGuildModalHeader}>Leave Guild</h2>
      <div className={classes.leaveGuildModalBody}>
        Please note, if you leave this guild, your guild member token will be burned
      </div>
      <div className={classes.leaveGuildModalFooter}>
        <Button
          className={classes.leaveGuildModalButton}
          variant='contained'
          color='secondary'
          size='large'
          onClick={onHandleCancel}
        >
          Cancel
        </Button>
        <Button
          className={classes.leaveGuildModalButton}
          variant='contained'
          onClick={onHandleSubmit}
          size='large'
          color='warning'
        >
          Leave
        </Button>
      </div>
    </div>
  );
}
