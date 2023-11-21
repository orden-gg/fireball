import { Button } from '@mui/material';

import { styles } from './styles';

export function LendConfirmationModal({
  selectedGotchisIds,
  gotchisForLend,
  onCloseModal,
  onConfirmLend
}: {
  selectedGotchisIds: string[];
  gotchisForLend: CustomAny[];
  onCloseModal: () => void;
  onConfirmLend: () => void;
}): JSX.Element {
  const classes = styles();

  return (
    <div className={classes.lendModalContainer}>
      <h2 className={classes.lendModalHeader}>Lending Confirmation</h2>
      <div className={classes.lendModalBody}>
        <p>You are about to Lend following Gotchis:</p>
        <div className={classes.gotchiNamesColumns}>
          {selectedGotchisIds.map((id) => (
            <span key={id}>{gotchisForLend.find((gotchi) => gotchi.id === id)!.name}</span>
          ))}
        </div>
      </div>
      <div className={classes.lendModalFooter}>
        <Button
          className={classes.lendModalButton}
          variant='contained'
          color='secondary'
          size='large'
          onClick={() => onCloseModal()}
        >
          Cancel
        </Button>
        <Button className={classes.lendModalButton} variant='contained' onClick={() => onConfirmLend()} size='large'>
          Confirm
        </Button>
      </div>
    </div>
  );
}
