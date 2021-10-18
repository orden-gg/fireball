import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import web3 from '../../api/web3';

import useStyles from './styles';
import { LoginContext } from '../../contexts/LoginContext';

export default function LoginModal({modalOpen, setModalOpen}) {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [addressHelperText, setAddressHelperText] = useState('Not a valid address!');
    const [isAddressValid, setIsAddressValid] = useState(false);
    const [isFormTriggered, setIsFormTriggered] = useState(false);

    const { storageAddresses, setStorageAddresses, selectActiveAddress } = useContext(LoginContext);

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
        let formattedAddress = address.toLowerCase();
        let duplicated = storageAddresses.find((item) => item.address === formattedAddress);

        setIsFormTriggered(true);
        setAddressHelperText('Not a valid address!');

        if(duplicated) {
            setIsAddressValid(false);
            setAddressHelperText('Address already added!');
        } else if(isAddressValid) {
            setStorageAddresses([{name: name, address: formattedAddress}, ...storageAddresses]);
            selectActiveAddress(formattedAddress)
            setModalOpen(false);
        }
    };

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} BackdropProps={{sx: {backdropFilter: 'blur(3px)'}}}>
            <Box className={classes.modal}>
                <Typography variant='h6' textAlign='center' className={classes.modalTitle}>Add <Box component='span' color='primary.main'>custom</Box> address</Typography>

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
