import React, { useContext, useEffect } from 'react';
import { Backdrop, Typography } from '@mui/material';

import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

// import GotchiSvg from 'components/Gotchi/GotchiImage/GotchiSvg';
import { MetamaskIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';
// import commonUtils from 'utils/commonUtils';

import LoginNavigation from './LoginNavigation';
import LoginAddress from './LoginAddress';
import LoginModal from './LoginModal';

import styles from './styles';
import EthAddress from 'components/EthAddress/EthAddress';

export default function LoginButton() {
    const classes = styles();
    const { getAccounts, metaState } = useMetamask();

    const { activeAddress, selectActiveAddress, storageAddresses,
            connectMetamask, isMetamaskActive,
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
                            <div className={classNames(classes.buttonIcon, 'metamask')}>
                                <MetamaskIcon width={18} height={18} />
                            </div>
                        ) : (
                            null
                        )
                    ) : (
                        <div className={classes.caption}>
                            <Typography className={classes.captionText}>Connect account</Typography>
                        </div>
                    )}

                    { activeAddress ? (
                        <div className={classes.address}>
                            <EthAddress address={activeAddress} icon={true} />
                            {/* <Typography className={classes.addressText} variant='subtitle2'>
                                {commonUtils.cutAddress(activeAddress)}
                            </Typography> */}
                        </div>
                    ) : (
                        null
                    )}
                </div>

                { dropdownOpen ? (
                    <div className={classNames(classes.buttonDropdown, metaState.account[0] && 'offset-top' )}>
                        <div className={classNames(classes.loginList, 'custom-scroll')}>
                            {metaState.account[0] ? (
                                <div className={classes.loginAddressBox}>
                                    <LoginAddress address={{name: 'Metamask', address: metaState.account[0]}} isMetamask={true} setDropdownOpen={setDropdownOpen} />
                                </div>
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
                        </div>
                        <LoginNavigation />
                    </div>
                ) : (
                    null
                )}
            </div>

            { modalOpen ? (
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
