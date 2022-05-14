import React, { useEffect } from 'react';

import styles from './styles.js'
import aavegotchilandApi from 'api/aavegotchiland.api.js';

export default function EthAddressPanel({ address }) {
    const classes = styles();

    useEffect(() => {
        aavegotchilandApi.getAddressInfo(address);
        aavegotchilandApi.getAddressItemization(address);
    }, [address]);

    return (
        <div className={classes.container}>
            addr - {address}
        </div>
    );
}
