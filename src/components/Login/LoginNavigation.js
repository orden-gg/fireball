import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMetamask } from 'use-metamask';
import useStyles from './styles';

import { LoginContext } from '../../contexts/LoginContext';

import MetamaskIcon from '../../assets/images/metamask-icon.png';

export default function LoginNavigation({setDropdownOpen, setModalOpen}) {
    const classes = useStyles();
    const { metaState } = useMetamask();
    const { connectMetamask, setIsMetamaskActive } = useContext(LoginContext);

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
        <Box display='flex' alignItems='center' justifyContent='flex-end'>
            {!metaState.account[0] ? (
                <>
                    <Button variant='contained' color='primary' onClick={onMetamaskClick} fullWidth>
                        Connect <img src={MetamaskIcon} alt='metamask icon' width={20} style={{ margin: '0 6px' }} />
                    </Button>

                    <Typography className={classes.dropdownDivider}>or</Typography>
                </>
            ) : (
                null
            )}

            <Button color='primary' onClick={onCustomClick} fullWidth className={classes.customButton}>
                Add custom
            </Button>
        </Box>
    );
}
