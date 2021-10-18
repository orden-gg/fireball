import React, { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMetamask } from 'use-metamask';
import Web3 from 'web3';

import useStyles from './styles';
import metamaskIcon from '../../assets/images/metamask-icon.png';

export default function LoginNavigation({setDropdownOpen, setModalOpen}) {
    const classes = useStyles();
    const { connect, getAccounts, metaState } = useMetamask();

    useEffect(() => {
        if (metaState.isAvailable) {
            (async () => {
                try {
                    let account = await getAccounts();
                    if(account.length) connectWallet();
                } catch (error) {
                    console.log(error);
                }
            })();
          }
    }, []);

    const connectWallet = async () => {
        if (metaState.isAvailable && !metaState.isConnected) {
            try {
                await connect(Web3);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onMetamaskClick = () => {
        connectWallet();
        console.log(metaState.account[0])
    };

    const onCustomClick = () => {
        setModalOpen(true);
        setDropdownOpen(false);
    };

    return (
        <Box display='flex' alignItems='center'>
            <Button variant='contained' color='primary' onClick={onMetamaskClick} fullWidth>
                Connect <img src={metamaskIcon} alt='metamask icon' width={20} style={{ margin: '0 6px' }} />
            </Button>

            <Typography className={classes.dropdownDivider}>or</Typography>

            <Button color='primary' onClick={onCustomClick} fullWidth className={classes.customButton}>
                Add custom
            </Button>
        </Box>
    );
}
