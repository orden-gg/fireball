import { useCallback, useContext, useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

import { MetamaskIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';
import ethersApi from 'api/ethers.api';

import styles from './styles';

export default function LoginNavigation({ address, onSubmit }) {
    const classes = styles();
    const { metaState } = useMetamask();
    const { connectMetamask, setIsMetamaskActive } = useContext(LoginContext);

    const [formValue, setFormValue] = useState(address ? address : '');
    const [isFormSabmitted, setIsFormSubmitted] = useState(address ? true : false);

    const onMetamaskClick = () => {
        connectMetamask().then((connected) => {
            if (connected) setIsMetamaskActive(true);
        });
    };

    const isFormValid = (addr) => {
        return isFormSabmitted && !ethersApi.isEthAddress(addr);
    };

    const onFormSubmit = useCallback((event) => {
        event.preventDefault();

        const formatted = formValue.toLowerCase();

        if (ethersApi.isEthAddress(formatted)) {
            onSubmit(formatted);
        }

        setIsFormSubmitted(true);
    }, [formValue, onSubmit]);

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
                                    edge='end'
                                    color='primary'
                                    type='submit'
                                >
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
            ) : (
                null
            )}
        </div>
    );
}
