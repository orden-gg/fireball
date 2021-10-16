import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

import useStyles from './styles';
import { LoginContext } from '../../contexts/LoginContext';
import commonUtils from '../../utils/commonUtils';
import classNames from 'classnames';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LoginList() {
    const classes = useStyles();
    const { activeAddress, storageAddresses, selectActiveAddress, logoutAddress } = useContext(LoginContext);

    const isActive = (current) => {
        return current.address === activeAddress;
    };

    return (
        <>
            {storageAddresses.map((item, index) => {
                return (
                    <Box
                        onClick={() => selectActiveAddress(item.address)}
                        className={classNames(classes.listItem, isActive(item) ? 'active' : '' )}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        key={index}>
                        <Box display='flex' alignItems='center' padding='6px 0'>
                            <PersonIcon />

                            <Box marginLeft='18px'>
                                <Typography className={classes.listItemName} variant='h6'>{item.name}</Typography>
                                <Typography variant='subtitle2' color='primary.main'>{commonUtils.cutAddress(item.address)}</Typography>
                            </Box>
                        </Box>

                        <IconButton className={classes.deleteButton} onClick={(event) => logoutAddress(event, item.address)}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>   
                ) 
            })}
        </>
    );
}
