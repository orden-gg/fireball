import React from 'react';

import ethersApi from 'api/ethers.api';
import ghstIcon from 'assets/images/animated/ghst-token.gif';

import styles from './styles';

export default function HorizontalPrice({ item, label }) {
    const classes = styles();

    return (
        <div className={classes.priceRoot}>
            {label || ''}
            <img src={ghstIcon} alt='ghst-token'/>
            {
                ethersApi.fromWei(item.priceInWei)
            }
        </div>
    );
}
