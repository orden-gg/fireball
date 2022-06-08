import { useContext, useEffect } from 'react';
import { Backdrop, Typography } from '@mui/material';

import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

import EthAddress from 'components/EthAddress/EthAddress';
import { MetamaskIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';

import LoginNavigation from './LoginNavigation';
import LoginAddress from './LoginAddress';

import styles from './styles';

export default function LoginButton() {
    const classes = styles();
    const { getAccounts, metaState } = useMetamask();

    const {
        activeAddress,
        selectActiveAddress,
        storageAddresses,
        setStorageAddresses,
        connectMetamask,
        isMetamaskActive,
        dropdownOpen,
        setDropdownOpen
    } = useContext(LoginContext);

    useEffect(() => { // connect metamask on load
        if (metaState.isAvailable) {
            (async () => {
                try {
                    const account = await getAccounts();
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

    const onAddressSubmit = (address) => {
        const duplicated = storageAddresses.find((item) => item.address === address);

        dropdownClose();
        selectActiveAddress(address);

        if (!duplicated) {
            setStorageAddresses([
                {
                    name: address.slice(0, 6),
                    address: address
                },
                ...storageAddresses
            ]);
        }
    };

    return (
        <>
            <div className={classNames(classes.button, dropdownOpen ? 'opened' : 'closed')}>

                <div className={classes.buttonInner} onClick={dropdownToggle}>
                    { activeAddress ? (
                        isMetamaskActive &&
                            <div className={classes.buttonIcon}>
                                <MetamaskIcon width={14} height={14} />
                            </div>
                    ) : (
                        <div className={classes.caption}>
                            <Typography className={classes.captionText}>Connect account</Typography>
                        </div>
                    )}

                    { activeAddress ? (
                        <div className={classes.address}>
                            <EthAddress address={activeAddress} icon={true} />
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
                                    <LoginAddress address={{ name: 'Metamask', address: metaState.account[0] }} isMetamask={true} setDropdownOpen={setDropdownOpen} />
                                </div>
                            ) : (
                                null
                            )}

                            {storageAddresses.length ? (
                                storageAddresses.map((item, index) => {
                                    return <LoginAddress address={item} key={index} setDropdownOpen={setDropdownOpen} />;
                                })
                            ) : (
                                null
                            )}
                        </div>
                        <LoginNavigation onSubmit={onAddressSubmit} />
                    </div>
                ) : (
                    null
                )}
            </div>

            <Backdrop
                sx={{ }}
                open={dropdownOpen}
                onClick={dropdownClose}
                className={classes.loginBackdrop}
            ></Backdrop>
        </>
    );
}
