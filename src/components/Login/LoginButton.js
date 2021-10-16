import React, { useContext, useEffect, useState } from 'react';
import { Backdrop, Typography, Box } from '@mui/material';
import { useMetamask } from 'use-metamask';

import useStyles from './styles';
import commonUtils from '../../utils/commonUtils';
import metamaskIcon from '../../assets/images/metamask-icon.png';
import classNames from 'classnames';
import LoginNavigation from './LoginNavigation';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LoginContext } from '../../contexts/LoginContext';

import PersonIcon from '@mui/icons-material/Person';

export default function LoginButton() {
    const classes = useStyles();
    const { metaState } = useMetamask();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { activeAddress, storageAddresses } = useContext(LoginContext);
    const metamaskAddress = metaState.account[0];

    useEffect(() => {
        console.log(`active - ${activeAddress}`);
    }, [activeAddress])

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
                        { activeAddress ? (
                            <PersonIcon />
                        ) : (
                            <Typography className={classes.captionText}>Connect account</Typography>
                        )}
                    </div>

                    { activeAddress ? (
                        <div className={classes.address}>
                            <Typography variant='subtitle2'>
                                {commonUtils.cutAddress(activeAddress)}
                            </Typography>
                        </div> 
                    ) : (
                        null
                    )}
                </div>

                <div className={classes.buttonDropdown}>
                    {storageAddresses.map((item, index) => {
                        return <Box display='flex' alignItems='center' key={index}>
                            <Box>
                                <Typography>{item.name}</Typography>
                                <Typography>{commonUtils.cutAddress(item.address)}</Typography>
                            </Box>
                        </Box>    
                    })}
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
