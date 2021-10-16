import React, { useCallback, useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMetamask } from 'use-metamask';
import Web3 from 'web3';

import useStyles from './styles';
import metamaskIcon from '../../assets/images/metamask-icon.png';
import useLocalStorage from '../../hooks/useLocalStorage';
import LoginModal from './LoginModal';

export default function LoginNavigation({setDropdownOpen}) {
    const classes = useStyles();
    const { connect, getAccounts, metaState } = useMetamask();
    const [modalOpened, setModalOpened] = useState(false);

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

    const onButtonClick = () => {
        connectWallet();
        console.log(metaState.account[0])
    };

    const onModalOpen = () => {
        setModalOpened(true);
        setDropdownOpen(false);
    };

    const onModalClose = () => setModalOpened(false);

    return (
        <Box display='flex' alignItems='center'>
            <Button variant='contained' color='primary' onClick={onButtonClick} fullWidth>
                Connect <img src={metamaskIcon} alt='metamask icon' width={20} style={{ margin: '0 6px' }} />
            </Button>

            <Typography className={classes.dropdownDivider}>or</Typography>

            <Button color='primary' onClick={onModalOpen} fullWidth className={classes.customButton}>Add custom</Button>

            {modalOpened ? <LoginModal modalOpened={modalOpened} onModalClose={onModalClose} /> : null}
        </Box>
    );
}
