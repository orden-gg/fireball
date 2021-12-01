import React from 'react';
import { Typography } from '@mui/material';

import web3 from '../../api/web3';

import styles from './styles';
import classNames from 'classnames';


export default function ProfilePane({address}) {
    const classes = styles();

    return (
        <div className={classes.container}>
            <Typography variant='h6'>
                Logged as <span
                    className={classNames(classes.profileLogged, !web3.isAddressValid(address) && 'error')}
                >
                    {address}
                    {!web3.isAddressValid(address) ? (
                        <span className={classes.profileInvalidText}>Not a valid address!</span>
                    ) : (
                        null
                    )}
                </span>
            </Typography>
        </div>
    );
}