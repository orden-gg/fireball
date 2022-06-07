import { useContext, useEffect, useRef, useState } from 'react';
import { FormControl, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

import classNames from 'classnames';
import Blockies from 'react-blockies';

import CustomTooltip from 'components/custom/CustomTooltip';
import { LoginContext } from 'contexts/LoginContext';
import commonUtils from 'utils/commonUtils';

import styles from './styles';

export default function LoginAddress({ address, isMetamask }) {
    const classes = styles();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(address.name);
    const [copyTooltipText, setCopyTooltipText] = useState('Copy address');
    const nameRef = useRef();
    const { activeAddress, selectActiveAddress, updateAddressName, logoutAddress, setDropdownOpen } = useContext(LoginContext);

    useEffect(() => { // focus input on edit button click
        if (editMode) nameRef.current.focus();
    }, [editMode]);

    useEffect(() => {
        if (address) setName(address.name);
    }, [address]);

    const onAddressClick = () => {
        setDropdownOpen(false);
        selectActiveAddress(address.address);
    };

    const isActive = (current) => {
        return current.address === activeAddress;
    };

    const onNameChange = (value) => {
        setName(value);
    };

    const confirmNewAddress = (event) => {
        event.stopPropagation();

        if (name.length > 0) {
            setEditMode(false);

            if (name !== address.name) updateAddressName(address.address, name);
        }
    };

    const editAddress = (event) => {
        event.stopPropagation();

        setEditMode(true);
        nameRef.current.focus();
    };

    const copyAddress = (event) => {
        event.stopPropagation();
        copyToClipboard();
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
            onClick={onAddressClick}
            className={classNames(classes.loginAddress, isActive(address) ? 'active' : '' )}>
            <Box className={classes.loginAddressBody}>

                <Box component='form' className={classes.loginAddressForm}>

                    <Blockies
                        seed={address.address}
                        size={8}
                        scale={2.5}
                        className={classes.blockiesIcon}
                    />

                    <FormControl variant='standard' disabled={!editMode}>
                        <Input
                            id='name'
                            type='text'
                            error={name.length === 0}
                            inputRef={nameRef}
                            value={name}
                            onChange={(event) => onNameChange(event.target.value)}
                            className={classNames(classes.loginAddressName, isMetamask && 'metamask')}
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

                <CustomTooltip title={copyTooltipText} placement='top' followCursor>
                    <Typography
                        className={classes.loginAddressAddress}
                        color='primary.main'
                        onClick={(event) => copyAddress(event)}
                        onMouseLeave={() => setCopyTooltipText('Copy address')}
                    >
                        {commonUtils.cutAddress(address.address, '..')}
                    </Typography>
                </CustomTooltip>
            </Box>

            <Box className={classes.loginAddressIcons}>
                {!isMetamask ? (
                    <>
                        <CustomTooltip title='Edit name' placement='top' followCursor className={classes.tooltip}>
                            <IconButton size='small' onClick={(event) => editAddress(event)}>
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </CustomTooltip>

                        <CustomTooltip title='Logout' placement='top' followCursor>
                            <IconButton size='small' color='warning' onClick={(event) => logoutAddress(event, address.address)}>
                                <LogoutIcon fontSize='small' />
                            </IconButton>
                        </CustomTooltip>
                    </>
                ) : (
                    null
                )}
            </Box>
        </Box>
    );
}
