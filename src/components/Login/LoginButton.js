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
import MetamaskIcon from '../../assets/images/metamask-icon.png';

export default function LoginButton() {
    const classes = useStyles();
    const { getAccounts, metaState } = useMetamask();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const { activeAddress, selectActiveAddress, storageAddresses, connectMetamask, isMetamaskActive } = useContext(LoginContext);

    useEffect(() => { // connect metamask on load
        if (metaState.isAvailable) {
            (async () => {
                try {
                    let account = await getAccounts();
                    if(account.length) connectMetamask();
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, []);

    useEffect(() => { // handle metamask accounts
        if(metaState.account[0]) {
            console.log(metaState.account[0])
            console.log(isMetamaskActive)

            if(metaState.account[0] === activeAddress || isMetamaskActive) {
                selectActiveAddress(metaState.account[0]);
            } else if(!activeAddress.length) {
                selectActiveAddress(metaState.account[0]);
            }
        }
    }, [metaState]);

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
                            isMetamaskActive ? (
                                <img src={MetamaskIcon} alt='Metamask icon' width={16} />
                            ) : (
                                <PersonIcon />
                            )
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
                        <Box className={classes.listWrapper} margin='-12px -12px 12px -12px'>
                                    {metaState.account[0] ? (
                                        <LoginAddress address={{name: 'Metamask', address: metaState.account[0]}} isMetamask={true} />
                                    ) : (
                                        null
                                    )}
                            {storageAddresses.length ? (

                                    storageAddresses.map((item, index) => {
                                        return <LoginAddress address={item} key={index} />
                                    })
                            ) : (
                                null
                            )}
                        </Box>
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
