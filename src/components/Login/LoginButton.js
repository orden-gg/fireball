import React, { useContext, useEffect } from 'react';
import { Backdrop, Typography, Box } from '@mui/material';

import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

import GotchiSvg from 'components/Gotchi/GotchiImage/GotchiSvg';
import { LoginContext } from 'contexts/LoginContext';
import commonUtils from 'utils/commonUtils';
import MetamaskIcon from 'assets/images/icons/metamask.png';

import LoginNavigation from './LoginNavigation';
import LoginAddress from './LoginAddress';
import LoginModal from './LoginModal';

import styles from './styles';

export default function LoginButton() {
    const classes = styles();
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { // handle metamask accounts
        if (metaState.account[0]) {
            if (metaState.account[0] === activeAddress || isMetamaskActive || !activeAddress.length) {
                selectActiveAddress(metaState.account[0]);
            }
        } else if (isMetamaskActive) { // on metamask logout
            selectActiveAddress(storageAddresses.length ? storageAddresses[0].address : '');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            <Box className={classNames(classes.buttonIcon, 'metamask')}>
                                <img src={MetamaskIcon} alt='Metamask icon' width={18} />
                            </Box>
                        ) : (
                            <Box className={classNames(classes.buttonIcon, 'gotchi')}>
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
                    <Box className={classNames(classes.buttonDropdown, metaState.account[0] && 'offset-top' )}>
                        <Box className={classNames(classes.loginList, 'custom-scroll')}>
                            {metaState.account[0] ? (
                                <Box className={classes.loginAddressBox}>
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

            {modalOpen ? (
                <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            ) : (
                null
            )}

            <Backdrop
                sx={{ }}
                open={dropdownOpen}
                onClick={dropdownClose}
                className={classes.loginBackdrop}
            ></Backdrop>
        </>
    );
}
