import React from 'react';
import { Link } from '@mui/material';

import Blockies from 'react-blockies';

import ethersApi from 'api/ethers.api.js';
import commonUtils from 'utils/commonUtils.js';

import styles from './styles.js'

export default function EthAddress({ address, icon }) {
    const classes = styles();

    if(!ethersApi.isEthAddress(address)) {
        return null;
    }

    return (
        <div className={classes.container}>
            {icon && <Blockies
                seed={address}
                size={8}
                scale={3}
                className={classes.icon}
            />}

            <Link
                href={`/client/?address=${address}`}
                target='_blank'
                className={classes.link}
            >
                {commonUtils.cutAddress(address, '..')}
            </Link>
        </div>
    );
}
