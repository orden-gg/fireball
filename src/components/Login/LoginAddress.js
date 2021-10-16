import React, { useContext, useState } from 'react';
import { FormControl, IconButton, Input, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
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
    const { activeAddress, selectActiveAddress, logoutAddress } = useContext(LoginContext);

    const isActive = (current) => {
        return current.address === activeAddress;
    };

    const editAddress = (event, address) => {
        setEditMode(true);
        // let index = storageAddresses.findIndex(item => item.address == address);
        // storageAddresses[index].name = 
        
        // setStorageAddresses(filtered);
        // selectActiveAddress(filtered.length ? filtered[0].address : '');

        event.stopPropagation();
    };

    const confirmNewAddress = (event) => {
        setEditMode(false);
        // let index = storageAddresses.findIndex(item => item.address == address);
        // storageAddresses[index].name = 
        
        // setStorageAddresses(filtered);
        // selectActiveAddress(filtered.length ? filtered[0].address : '');

        event.stopPropagation();
    };

    return (
        <Box
            onClick={() => selectActiveAddress(address.address)}
            className={classNames(classes.listItem, isActive(address) ? 'active' : '' )}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
        >
            <Box display='flex' alignItems='center' padding='8px 0'>
                <PersonIcon fontSize='small' />

                <Box marginLeft='18px'>
                    <Box display='flex' alignItems='center'>
                        <FormControl variant='standard' disabled={!editMode}>
                            <Input
                                id='name'
                                type='text'
                                value={address.name}
                                className={classes.listItemName}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {editMode ? (
                                            <IconButton onClick={(event) => confirmNewAddress(event)}>
                                                <CheckIcon size='small' />
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

                <Tooltip title='Copy address' placement='top' followCursor>
                    <IconButton onClick={(event) => event.stopPropagation()}>
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
