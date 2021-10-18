import React, { useContext, useEffect, useState } from 'react';
import { Backdrop, Typography, Box } from '@mui/material';
import useStyles from './styles';

import classNames from 'classnames';
import { useMetamask } from 'use-metamask';
import commonUtils from '../../utils/commonUtils';

import { LoginContext } from '../../contexts/LoginContext';
import LoginNavigation from './LoginNavigation';
import LoginAddress from './LoginAddress';
import LoginModal from './LoginModal';

import PersonIcon from '@mui/icons-material/Person';

export default function LoginButton() {
    const classes = useStyles();
    const { metaState } = useMetamask();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

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

                {dropdownOpen ? (
                    <div className={classes.buttonDropdown}>
                        {storageAddresses.length ? (
                            <Box className={classes.listWrapper} margin='-18px -18px 18px -18px' >
                                {storageAddresses.map((item, index) => {
                                    return <LoginAddress address={item} key={index} />
                                })}
                            </Box>
                        ) : (
                            null
                        )}
                        <LoginNavigation setDropdownOpen={setDropdownOpen} setModalOpen={setModalOpen} />
                    </div>
                ) : (
                    null
                )}

            </div>

            {modalOpen ? <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} /> : null}

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(3px)' }}
                open={dropdownOpen}
                onClick={dropdownClose}
            ></Backdrop>
        </>
    );
}
