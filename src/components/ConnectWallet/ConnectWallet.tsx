import { useCallback, useContext, useState } from 'react';

import { Button, CircularProgress, Typography } from '@mui/material';

import { ethers } from 'ethers';
import { useMetamask } from 'use-metamask';

import { SnackbarContext } from 'contexts/SnackbarContext';

import { connectWalletStyles } from './styles';

export function ConnectWallet() {
  const classes = connectWalletStyles();

  const { metaState, connect } = useMetamask();

  const [isWalletConnecting, setIsWalletConnecting] = useState<boolean>(false);
  const { showSnackbar } = useContext<CustomAny>(SnackbarContext);

  const connectWallet = (): void => {
    setIsWalletConnecting(true);

    connectMetamask()
      .then((isConnected: boolean) => {
        if (isConnected) {
          showSnackbar('success', 'Wallet connected!');
        } else {
          showSnackbar('error', 'Wallet connect failed :( please reload page and try again');
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsWalletConnecting(false));
  };

  const connectMetamask = useCallback(async (): Promise<boolean> => {
    if (metaState.isAvailable && !metaState.isConnected) {
      try {
        if (connect) {
          await connect(ethers.providers.Web3Provider);

          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }, [metaState.isAvailable, metaState.isConnected]);

  return (
    <div className={classes.connectContent}>
      <Typography variant='h5' className={classes.connectTitle}>
        Please connect wallet
      </Typography>
      <Button
        size='large'
        variant='contained'
        className={classes.button}
        onClick={connectWallet}
        disabled={isWalletConnecting}
      >
        Connect {isWalletConnecting && <CircularProgress size={24} className={classes.progress} color='inherit' />}
      </Button>
    </div>
  );
}
