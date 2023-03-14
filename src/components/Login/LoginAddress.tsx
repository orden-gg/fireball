import { useEffect, useRef, useState } from 'react';
import Blockies from 'react-blockies';

import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { FormControl, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';

import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
  getActiveAddress,
  removeAddress,
  selectActiveAddress,
  toggleLoginDropdown,
  updateAddressName
} from 'core/store/login';

import { LoginAddress as LoginAddressModel } from 'shared/models';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { CommonUtils } from 'utils';

import { styles } from './styles';

interface LoginAddressProps {
  address: LoginAddressModel;
  onLogout?: (address: LoginAddressModel) => void;
  isMetamask?: boolean;
}

export function LoginAddress({ address, isMetamask, onLogout }: LoginAddressProps) {
  const classes = styles();

  const dispatch = useAppDispatch();
  const activeAddress = useAppSelector(getActiveAddress);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>(address.name);
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy address');
  const nameRef = useRef<CustomAny>();

  useEffect(() => {
    // focus input on edit button click
    if (editMode) {
      nameRef.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    if (address) {
      setName(address.name);
    }
  }, [address]);

  const onAddressClick = (): void => {
    dispatch(toggleLoginDropdown(false));
    dispatch(selectActiveAddress(address.address));
  };

  const isActive = (current: LoginAddressModel): boolean => {
    return current.address === activeAddress;
  };

  const onNameChange = (value: string): void => {
    setName(value);
  };

  const confirmNewAddress = (event: CustomAny): void => {
    event.stopPropagation();

    if (name.length > 0) {
      setEditMode(false);

      if (name !== address.name) {
        dispatch(updateAddressName(address.address, name));
      }
    }
  };

  const editAddress = (event: CustomAny): void => {
    event.stopPropagation();

    setEditMode(true);
    nameRef.current.focus();
  };

  const copyAddress = (event: CustomAny): void => {
    event.stopPropagation();
    copyToClipboard();
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(address.address);
      setCopyTooltipText('Copied!');
    } catch (err) {
      setCopyTooltipText('Copy address');
    }
  };

  const onAddressLogout = (event: CustomAny, loginAddress: LoginAddressModel): void => {
    event.stopPropagation();

    if (onLogout) {
      onLogout(address);
    }

    dispatch(removeAddress(loginAddress.address));
  };

  return (
    <Box onClick={onAddressClick} className={classNames(classes.loginAddress, isActive(address) ? 'active' : '')}>
      <Box className={classes.loginAddressBody}>
        <Box component='form' className={classes.loginAddressForm}>
          <Blockies seed={address.address} size={8} scale={2.5} className={classes.blockiesIcon} />

          <FormControl variant='standard' disabled={!editMode} className={classes.formControl}>
            <Input
              id='name'
              type='text'
              error={name.length === 0}
              inputRef={nameRef}
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              onClick={(event) => editMode && event.stopPropagation()}
              className={classNames(classes.loginAddressName, isMetamask && 'metamask')}
              endAdornment={
                <InputAdornment position='end'>
                  {editMode ? (
                    <IconButton
                      type='submit'
                      color='success'
                      size='small'
                      onClick={(event) => confirmNewAddress(event)}
                      disabled={name.length === 0}
                    >
                      <CheckIcon fontSize={'8px' as CustomAny} />
                    </IconButton>
                  ) : null}
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
            {CommonUtils.cutAddress(address.address, '..')}
          </Typography>
        </CustomTooltip>
      </Box>

      <Box className={classes.loginAddressIcons}>
        {!isMetamask ? (
          <>
            <CustomTooltip title='Edit name' placement='top' followCursor>
              <IconButton size='small' onClick={(event) => editAddress(event)}>
                <EditIcon fontSize='small' />
              </IconButton>
            </CustomTooltip>

            <CustomTooltip title='Logout' placement='top' followCursor>
              <IconButton size='small' color='warning' onClick={(event) => onAddressLogout(event, address)}>
                <LogoutIcon fontSize='small' />
              </IconButton>
            </CustomTooltip>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
