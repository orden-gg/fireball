import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import web3 from '../../api/web3';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: 1232,
        margin: '0 auto',
        padding: 12,
        backgroundColor: alpha(theme.palette.secondary.dark, .5),
        borderRadius: 4,
    }
}));

export default function ProfilePane({address}) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant='h6'>
                Logged as <Box
                    component='span'
                    position='relative'
                    color={web3.isAddressValid(address) ? 'success.main' : 'warning.main'}
                >
                    {address}
                    {!web3.isAddressValid(address) ? (
                        <Box component='span' position='absolute' right={0} bottom='-16px' whiteSpace='nowrap' fontSize='12px' color='error.main'>Not a valid address!</Box>
                    ) : (
                        null
                    )}
                </Box>
            </Typography>
        </div>
    );
}