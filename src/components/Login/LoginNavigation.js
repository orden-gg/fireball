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

export default function LoginNavigation({ address, onSubmit }) {
    const classes = styles();
    const { metaState } = useMetamask();
    const { connectMetamask, setActiveAddress, selectActiveAddress, setIsMetamaskActive, setDropdownOpen } = useContext(LoginContext);

    const [formValue, setFormValue] = useState(address ? address : '');
    const [isFormSabmitted, setIsFormSubmitted] = useState(address ? true : false);

    const onMetamaskClick = () => {
        connectMetamask().then((connected) => {
            if (connected) setIsMetamaskActive(true);
        });
    };

    // const onCustomClick = () => {
    //     setModalOpen(true);
    //     setDropdownOpen(false);
    // };

    const isFormValid = (addr) => {
        return isFormSabmitted && !ethersApi.isEthAddress(addr);
    };

    // const onAddressChange = (value) => {
    //     ethersApi.isEthAddress(value) ? setIsAddressValid(true) : setIsAddressValid(false);
    //     setFormValue(value);
    // };

    const onFormSubmit = (e) => {
        let formatted = formValue.toLowerCase();
        // let duplicated = storageAddresses.find((item) => item.address === formattedAddress);

        setIsFormSubmitted(true);

        if (ethersApi.isEthAddress(formatted)) {
            onSubmit(formatted);
        //     setActiveAddress(formatted);
        //     setDropdownOpen(false);
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
                    value={formValue}
                    error={isFormValid(formValue)}
                    helperText={isFormValid(formValue) && 'not valid eth address!'}
                    fullWidth
                    size='small'
                    label='eth address'
                    variant='outlined'
                    onChange={(event) => setFormValue(event.target.value)}
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
