import React, { useContext, useState } from 'react';
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

import { MetamaskIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';

import styles from './styles';
import { AccountCircle } from '@mui/icons-material';
import ethersApi from 'api/ethers.api';

export default function LoginNavigation() {
    const classes = styles();
    const { metaState } = useMetamask();
    const { connectMetamask, selectActiveAddress, setIsMetamaskActive, setModalOpen, setDropdownOpen } = useContext(LoginContext);

    const [address, setAddress] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onMetamaskClick = () => {
        connectMetamask().then((connected) => {
            if (connected) setIsMetamaskActive(true);
        });
    };

    const onCustomClick = () => {
        setModalOpen(true);
        setDropdownOpen(false);
    };

    const isFormValid = (addr) => {
        return isSubmitted && !ethersApi.isEthAddress(addr);
    };

    // const onAddressChange = (value) => {
    //     ethersApi.isEthAddress(value) ? setIsAddressValid(true) : setIsAddressValid(false);
    //     setAddress(value);
    // };

    const onFormSubmit = (e) => {
        let formatted = address.toLowerCase();
        // let duplicated = storageAddresses.find((item) => item.address === formattedAddress);

        setIsSubmitted(true);

        if (ethersApi.isEthAddress(formatted)) {
            selectActiveAddress(formatted);
            setDropdownOpen(false);
        }
        // setAddressHelperText('Not a valid address!');

        // if (duplicated) {
        //     setIsAddressValid(false);
        //     setAddressHelperText('Address already added!');
        // } else if (isAddressValid) {
        //     setStorageAddresses([{name: name, address: formattedAddress, gotchiId: generateRandomGotchiId()}, ...storageAddresses]);
        //     selectActiveAddress(formattedAddress)
        //     setModalOpen(false);
        // }
        e.preventDefault();
    };

    return (
        <div className={classNames(classes.loginNavigation, !metaState.account[0] && 'connect')}>
            <form onSubmit={onFormSubmit}>
                <TextField
                    error={isFormValid(address)}
                    helperText={isFormValid(address) && 'is not valid eth address!'}
                    fullWidth
                    size='small'
                    label='eth address'
                    variant='outlined'
                    onChange={(event) => setAddress(event.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    // onClick={onSubmit}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                    color='primary'
                                    type='submit'
                                >
                                    <ArrowForwardIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>

            {!metaState.account[0] ? (
                <>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={onMetamaskClick}
                        fullWidth
                        size='large'
                        className={classes.metamaskButton}
                    >
                        <MetamaskIcon className={classes.metamaskButtonIcon} width={24} height={24} />
                    </Button>

                    {/* <Typography className={classes.dropdownDivider}>or</Typography> */}
                </>
            ) : (
                null
            )}

            {/* <Button
                color='primary'
                onClick={onCustomClick}
                fullWidth
                className={classes.customButton}
            >
                Add custom
            </Button> */}
        </div>
    );
}
