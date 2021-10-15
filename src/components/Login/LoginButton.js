import React, { useEffect, useState, useCallback } from 'react';
import { Backdrop, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMetamask } from 'use-metamask';
import Web3 from 'web3';

import useStyles from './styles';
import commonUtils from '../../utils/commonUtils';
import metamaskIcon from '../../assets/images/metamask-icon.png';
import classNames from 'classnames';

export default function LoginButton() {
    const classes = useStyles();
    const { connect, getAccounts, metaState } = useMetamask();
    const [dropdownOpen, setDropdownOpen] = useState(true);

    const dropdownClose = () => {
        setDropdownOpen(false);
    };

    const dropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const onButtonClick = () => {
        if(!metaState.isConnected) {
            connectWallet();
        } 
        // else {
        //     handleOpen();
        // }
    };

    const connectWallet = useCallback(() => {
        if (!metaState.isConnected) {
            (async () => {
                try {
                    await connect(Web3);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [connect, metaState]);

    return (
        <>
            <div className={classNames(classes.button, dropdownOpen ? 'opened' : 'closed')}>

                <div className={classes.buttonInner} onClick={dropdownToggle}>
                    <div className={classes.caption}>
                        <Typography className={classes.captionText}>Primary</Typography>
                    </div>

                    <div className={classes.address}>
                        <Typography variant='subtitle2'>
                            {commonUtils.cutAddress('0x1315B9510Cd7f75A63BB59bA7d9D1FAd083d0667')}
                        </Typography>
                    </div>
                </div>

                <div className={classes.buttonDropdown}>
                    <Button variant='contained' color='primary' fullWidth>
                        Connect <img src={metamaskIcon} alt='metamask icon' width={20} style={{ margin: '0 6px' }} /> wallet
                    </Button>

                    <Typography className={classes.dropdownDivider}>or</Typography>

                    <Button variant='outlined' color='primary' fullWidth>Add custom address</Button>
                </div>
                {/* <Button className={classes.button} variant='contained' color='primary' onClick={onButtonClick} size='small'>
                    Connect Wallet
                </Button> */}
                {/* <ModalWrapper modalOpen={modalOpen} handleClose={handleClose} width={700}>
                    <Typography variant='h5' paragraph={true}>Account</Typography>
                    <Typography variant='body1' paragraph={true}>Connected via MetaMask</Typography>
                    <Typography className={classes.address} variant='body1'>{metaState.account[0]}</Typography>
                    <AddressImportForm />
                </ModalWrapper> */}
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(3px)' }}
                open={dropdownOpen}
                onClick={dropdownClose}
            ></Backdrop>
        </>
    );
}
