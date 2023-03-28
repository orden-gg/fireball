import { useContext, useEffect, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material';

import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

import { InstallationsApi } from 'api';

import { SnackbarContext } from 'contexts/SnackbarContext';

import { actionStyles } from '../styles';

export function ClientRealmActions({ claimableList }: { claimableList: CustomAny[] }) {
  const classes = actionStyles();

  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>('default');

  const { metaState } = useMetamask();
  const { showSnackbar } = useContext<CustomAny>(SnackbarContext);

  const isTransactionProcessing: boolean = transactionStatus === 'processing';
  const isTransactionCompleted: boolean = transactionStatus === 'completed';

  useEffect(() => {
    const accounts: CustomAny[] = metaState.account;
    const walletConnected: boolean = accounts.length > 0;

    setIsUserConnected(walletConnected);
  }, [metaState]);

  const onUpgradesFinish = (ids: CustomAny[]): void => {
    const succesMessage: string = `successfully finished ${ids.length} upgrades`;
    const errorMessage: string = 'finishing upgrades went wrong :(';

    setTransactionStatus('processing');

    InstallationsApi.finalizeUpgrades(ids)
      .then((completed: boolean) => {
        if (completed) {
          showSnackbar('success', succesMessage);
          setTransactionStatus('completed');
        } else {
          showSnackbar('error', errorMessage);
          setTransactionStatus('failed');
        }
      })
      .catch((e: CustomAny) => {
        console.log(e);
        setTransactionStatus('failed');
      });
  };

  const renderButtonNode = (state: string): JSX.Element => {
    switch (state) {
      case 'completed':
        return (
          <>
            {/*@ts-ignore */}
            Completed! <CheckIcon size='small' />
          </>
        );
      case 'processing':
        return (
          <>
            Finishing
            <CircularProgress size={20} color='secondary' className={classes.buttonSpinner} />
          </>
        );
      default:
        return <>Finish upgrades ({claimableList.length})</>;
    }
  };

  return (
    <div>
      <Button
        variant='contained'
        color={isTransactionCompleted ? 'success' : 'info'}
        fullWidth
        onClick={() => onUpgradesFinish(claimableList)}
        disabled={!claimableList.length || !isUserConnected || isTransactionProcessing}
        className={classNames(classes.marginBottom, isTransactionCompleted ? classes.buttonCompleted : null)}
      >
        {renderButtonNode(transactionStatus)}
      </Button>

      {!isUserConnected && (
        <Alert severity='error' className={classes.marginBottom}>
          Please connect to metamask!
        </Alert>
      )}

      <Alert severity='warning' icon={false}>
        <AlertTitle>Use with caution!</AlertTitle>
        Could not display upgrades since getAllUpgradeQueue contract function sometimes doesn't work
      </Alert>
    </div>
  );
}
