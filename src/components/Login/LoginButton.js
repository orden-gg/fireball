import React, { useEffect, useState } from 'react';
import { Backdrop, Typography } from '@mui/material';
import { useMetamask } from 'use-metamask';

import useStyles from './styles';
import commonUtils from '../../utils/commonUtils';
import metamaskIcon from '../../assets/images/metamask-icon.png';
import classNames from 'classnames';
import LoginNavigation from './LoginNavigation';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function LoginButton() {
    const classes = useStyles();
    const { metaState } = useMetamask();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loggedAddress, setLoggedAddress] = useLocalStorage('LOGGED_ADDRESSES', JSON.parse(localStorage.getItem('LOGGED_ADDRESSES')));
    const metamaskAddress = metaState.account[0];

    useEffect(() => {
        console.log('loggedAddress');
        console.log(loggedAddress);
    }, [])

    const dropdownClose = () => {
        setDropdownOpen(false);
    };

    const dropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <div className={classNames(classes.button, dropdownOpen ? 'opened' : 'closed')}>

                <div className={classes.buttonInner} onClick={dropdownToggle}>
                    <div className={classes.caption}>
                        { metamaskAddress ? (
                            <Typography className={classes.captionText}>Custom</Typography>
                        ) : (
                            <Typography className={classes.captionText}>Account</Typography>
                        )}
                    </div>

                    { metamaskAddress ? (
                        <div className={classes.address}>
                            <Typography variant='subtitle2'>
                                {commonUtils.cutAddress(metamaskAddress)}
                            </Typography>
                        </div> 
                    ) : (
                        null
                    )}
                </div>

                <div className={classes.buttonDropdown}>
                    <LoginNavigation setDropdownOpen={setDropdownOpen} />
                </div>

            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(3px)' }}
                open={dropdownOpen}
                onClick={dropdownClose}
            ></Backdrop>
        </>
    );
}
