import { useContext, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';

import { ethers } from 'ethers';
import { useMetamask } from 'use-metamask';

import { SnackbarContext } from 'contexts/SnackbarContext';

import { modalStyles } from '../styles';

export function ConnectModal() {
    const classes = modalStyles();

    const { metaState, connect } = useMetamask();

    const [isWalletConnecting, setIsWalletConnecting] = useState<boolean>(false);
    const { showSnackbar } = useContext<any>(SnackbarContext);

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
            .catch(error => console.log(error))
            .finally(() => setIsWalletConnecting(false));
    };

    const connectMetamask = async (): Promise<any> => {
        if (metaState.isAvailable && !metaState.isConnected) {
            try {
                await connect(ethers.providers.Web3Provider, 'any');

                return true;
            } catch (error) {
                return false;
            }
        }
    };

    return (
        <div className={classes.content}>
            <Typography variant='h5' className={classes.title}>Please connect wallet</Typography>
            <Button
                size='large'
                variant="contained"
                className={classes.button}
                onClick={connectWallet}
                disabled={isWalletConnecting}
            >
                Connect {isWalletConnecting && <CircularProgress size={20} className={classes.progress} />}
            </Button>
        </div>
    );
}
