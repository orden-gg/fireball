import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMetamask } from 'use-metamask';
import web3 from '../../api/web3';

import useStyles from './styles';
import metamaskIcon from '../../assets/images/metamask-icon.png';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function LoginModal({modalOpened, onModalClose}) {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [addressHelperText, setAddressHelperText] = useState('Not a valid address!');
    const [isAddressValid, setIsAddressValid] = useState(false);
    const [isFormTriggered, setIsFormTriggered] = useState(false);

    const [loggedAddresses, setLoggedAddresses] = useLocalStorage('LOGGED_ADDRESSES', JSON.parse(localStorage.getItem('LOGGED_ADDRESSES')) || []);

    useEffect(() => {
        return () => { //reset form on destroy
            setName('');
            setAddress('');
        }
    }, []);

    const onNameChange = (value) => {
        setName(value);
    };

    const onAddressChange = (value) => {
        web3.isAddressValid(value) ? setIsAddressValid(true) : setIsAddressValid(false);
        setAddress(value);
    };

    const onButtonClick = () => {
        let duplicated = loggedAddresses.find((item) => item.address === address.toLowerCase());

        setIsFormTriggered(true);
        setAddressHelperText('Not a valid address!');

        if(duplicated) {
            setIsAddressValid(false);
            setAddressHelperText('Address already added!');
        } else if(isAddressValid) {
            setLoggedAddresses([...loggedAddresses, {name: name, address: address.toLowerCase()}]);
            onModalClose();
        }
    };

    return (
        <Modal open={modalOpened} onClose={onModalClose} BackdropProps={{sx: {backdropFilter: 'blur(3px)'}}}>
            <Box className={classes.modal}>
                <Typography variant='h6' textAlign='center' paragraph>Add <Box component='span' color='primary.main'>custom</Box> address</Typography>

                <TextField
                    id='name'
                    label='Name'
                    size='small'
                    value={name}
                    onChange={(event) => onNameChange(event.target.value)}
                    fullWidth
                    sx={{marginBottom: '30px'}}
                />

                <TextField
                    error={!isAddressValid && isFormTriggered}
                    id='address'
                    label='Address'
                    helperText={!isAddressValid && isFormTriggered && addressHelperText}
                    size='small'
                    value={address}
                    onChange={(event) => onAddressChange(event.target.value)}
                    fullWidth
                    sx={{marginBottom: !isAddressValid && isFormTriggered ? '7px' : '30px'}}
                />

                <Box textAlign='right'>
                    <Button variant='contained' color='primary' onClick={onButtonClick} disabled={!name.length || !address.length}>
                        Save Address
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
