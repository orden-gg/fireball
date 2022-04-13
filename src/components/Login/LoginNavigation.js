import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

import { MetamaskIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';

import styles from './styles';

export default function LoginNavigation() {
    const classes = styles();
    const { metaState } = useMetamask();
    const { connectMetamask, setIsMetamaskActive, setModalOpen, setDropdownOpen } = useContext(LoginContext);

    const onMetamaskClick = () => {
        connectMetamask().then((connected) => {
            if (connected) setIsMetamaskActive(true);
        });
    };

    const onCustomClick = () => {
        setModalOpen(true);
        setDropdownOpen(false);
    };

    return (
        <Box className={classNames(classes.loginNavigation, !metaState.account[0] && 'connect')}>
            {!metaState.account[0] ? (
                <>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={onMetamaskClick}
                        fullWidth
                        className={classes.metamaskButton}
                    >
                        Connect <MetamaskIcon className={classes.metamaskButtonIcon} width={20} height={20} />
                    </Button>

                    <Typography className={classes.dropdownDivider}>or</Typography>
                </>
            ) : (
                null
            )}

            <Button
                color='primary'
                onClick={onCustomClick}
                fullWidth
                className={classes.customButton}
            >
                Add custom
            </Button>
        </Box>
    );
}
