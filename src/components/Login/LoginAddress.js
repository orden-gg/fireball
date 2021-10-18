import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormControl, IconButton, Input, InputAdornment, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';

import commonUtils from '../../utils/commonUtils';
import useStyles from './styles';
import { LoginContext } from '../../contexts/LoginContext';

import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LoginAddress({address}) {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(address.name);
    const [copyTooltipText, setCopyTooltipText] = useState('Copy address');
    const nameRef = useRef();
    const { activeAddress, selectActiveAddress, updateAddressName, logoutAddress } = useContext(LoginContext);

    useEffect(() => { // focus input on edit button click
        if (editMode) nameRef.current.focus();
    }, [editMode]);

    const isActive = (current) => {
        return current.address === activeAddress;
    };

    const onNameChange = (value) => {
        setName(value);
    };

    const confirmNewAddress = (event) => {
        if(name.length > 0) {
            setEditMode(false);

            if(name !== address.name) updateAddressName(address.address, name)
        }

        event.stopPropagation();
    };

    const editAddress = (event) => {
        setEditMode(true);
        nameRef.current.focus();

        event.stopPropagation();
    };

    const copyAddress = (event) => {
        copyToClipboard();
        event.stopPropagation();
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(address.address);
            setCopyTooltipText('Copied!');
        } catch (err) {
            setCopyTooltipText('Copy address');
        }
    };

    return (
        <Box
            onClick={() => selectActiveAddress(address.address)}
            className={classNames(classes.listItem, isActive(address) ? 'active' : '' )}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
        >
            <Box display='flex' alignItems='center' padding='4px 0'>
                <PersonIcon fontSize='small' />

                <Box marginLeft='18px'>
                    <Box component='form' display='flex' alignItems='center'>
                        <FormControl variant='standard' disabled={!editMode}>
                            <Input
                                id='name'
                                type='text'
                                error={name.length === 0}
                                inputRef={nameRef}
                                value={name}
                                onChange={(event) => onNameChange(event.target.value)}
                                className={classes.listItemName}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {editMode ? (
                                            <IconButton type='submit' color='success' size='small' onClick={(event) => confirmNewAddress(event)} disabled={name.length === 0}>
                                                <CheckIcon fontSize='8px' />
                                            </IconButton>
                                        ) : (
                                            null
                                        )}
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>

                    <Typography variant='subtitle2' color='primary.main'>
                        {commonUtils.cutAddress(address.address)}
                    </Typography>
                </Box>
            </Box>

            <Box display='flex' alignItems='center' marginRight='-8px' marginLeft='8px'>
                <Tooltip title='Edit name' placement='top' followCursor className={classes.tooltip}>
                    <IconButton onClick={(event) => editAddress(event)}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                </Tooltip>

                <Tooltip title={copyTooltipText} placement='top' followCursor>
                    <IconButton onClick={(event) => copyAddress(event)} onMouseLeave={() => setCopyTooltipText('Copy address')}>
                        <ContentCopyIcon fontSize='small' />
                    </IconButton>
                </Tooltip>

                <Tooltip title='Logout' placement='top' followCursor>
                    <IconButton color='warning' onClick={(event) => logoutAddress(event, address.address)}>
                        <LogoutIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>  
    );
}
