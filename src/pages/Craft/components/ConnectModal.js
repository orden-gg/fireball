import { useContext, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';

import { LoginContext } from 'contexts/LoginContext';
import { SnackbarContext } from 'contexts/SnackbarContext';

import { modalStyles } from '../styles';

export default function ConnectModal() {
    const [isWalletConnecting, setIsWalletConnecting] = useState(false);
    const { connectMetamask } = useContext(LoginContext);
    const { showSnackbar } = useContext(SnackbarContext);
    const classes = modalStyles();

    const connectWallet = async () => {
        setIsWalletConnecting(true);

        const response = await connectMetamask();

        setIsWalletConnecting(false);

        if (response) {
            showSnackbar('success', 'Wallet connected!');
        } else {
            showSnackbar('error', 'Wallet connect failed :(');
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
