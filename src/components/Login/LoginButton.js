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

import MetamaskIcon from '../../assets/images/metamask-icon.png';
import GotchiSvg from '../Gotchi/GotchiSvg';

export default function LoginButton() {
    const classes = useStyles();
    const { getAccounts, metaState } = useMetamask();

    const { activeAddress, selectActiveAddress, storageAddresses,
            connectMetamask, isMetamaskActive, getActiveAddressSvgId,
            modalOpen, setModalOpen, dropdownOpen, setDropdownOpen
    } = useContext(LoginContext);

    useEffect(() => { // connect metamask on load
        if (metaState.isAvailable) {
            (async () => {
                try {
                    let account = await getAccounts();
                    if (account.length) connectMetamask();
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, []);

    useEffect(() => { // handle metamask accounts
        if (metaState.account[0]) {
            if (metaState.account[0] === activeAddress || isMetamaskActive || !activeAddress.length) {
                selectActiveAddress(metaState.account[0]);
            }
        } else if (isMetamaskActive) { // on metamask logout
            selectActiveAddress(storageAddresses.length ? storageAddresses[0].address : '');
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
                    { activeAddress ? (
                        isMetamaskActive ? (
                            <Box bgcolor='secondary.main' width='34px' borderRadius='4px 0 0 4px' marginRight='2px' display='flex' alignItems='center' justifyContent='center' padding='2px'>
                                <img src={MetamaskIcon} alt='Metamask icon' width={18} />
                            </Box>
                        ) : (
                            <Box bgcolor='secondary.main' width='34px' borderRadius='4px 0 0 4px' marginRight='2px' display='flex' alignItems='center' padding='2px'>
                                <GotchiSvg id={getActiveAddressSvgId()} size={26} hideWearables={true} hideBg={true}  />
                            </Box>
                        )
                    ) : (
                        <div className={classes.caption}>
                            <Typography className={classes.captionText}>Connect account</Typography>
                        </div>
                    )}

                    { activeAddress ? (
                        <div className={classes.address}>
                            <Typography className={classes.addressText} variant='subtitle2'>
                                {commonUtils.cutAddress(activeAddress)}
                            </Typography>
                        </div> 
                    ) : (
                        null
                    )}
                </div>

                {dropdownOpen ? (
                    <Box className={classes.buttonDropdown} paddingTop={metaState.account[0] ? '74px' : '12px'}>
                        <Box className={classNames(classes.listWrapper, 'custom-scroll')} margin='-12px -12px 12px -12px'>
                            {metaState.account[0] ? (
                                <Box position='absolute' top={0} right={0} left={0}>
                                    <LoginAddress address={{name: 'Metamask', address: metaState.account[0]}} isMetamask={true} setDropdownOpen={setDropdownOpen} />
                                </Box>
                            ) : (
                                null
                            )}

                            {storageAddresses.length ? (
                                storageAddresses.map((item, index) => {
                                    return <LoginAddress address={item} key={index} setDropdownOpen={setDropdownOpen} />
                                })
                            ) : (
                                null
                            )}
                        </Box>
                        <LoginNavigation />
                    </Box>
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
