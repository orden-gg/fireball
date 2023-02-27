import { useCallback, useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { ethers } from 'ethers';
import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

import { MetamaskIcon } from 'components/Icons/Icons';
import { EthersApi } from 'api';

import { styles } from './styles';

interface LoginNavigationProps {
  onSubmit: (value: string) => void;
  address?: string;
}

export function LoginNavigation({ onSubmit, address }: LoginNavigationProps) {
  const classes = styles();

  const { metaState, connect } = useMetamask();

  const [formValue, setFormValue] = useState<string>(address ? address : '');
  const [isFormSabmitted, setIsFormSubmitted] = useState<boolean>(address ? true : false);

  const onMetamaskClick = async () => {
    if (metaState.isAvailable && !metaState.isConnected) {
      try {
        if (connect) {
          await connect(ethers.providers.Web3Provider, 'any');

          return true;
        }
      } catch (error) {
        return false;
      }
    }
  };

  const isFormValid = (addr: string): boolean => {
    return isFormSabmitted && !EthersApi.isEthAddress(addr);
  };

  const onFormSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      const formatted = formValue.toLowerCase();

      if (EthersApi.isEthAddress(formatted)) {
        onSubmit(formatted);
      }

      setIsFormSubmitted(true);
    },
    [formValue, onSubmit]
  );

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
                <IconButton edge='end' color='primary' type='submit'>
                  <ArrowForwardIcon />
                </IconButton>
              </InputAdornment>
            )
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
        </>
      ) : null}
    </div>
  );
}
