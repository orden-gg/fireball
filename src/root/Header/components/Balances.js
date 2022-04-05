import React, { useContext } from 'react';
import { Typography } from '@mui/material';

import { BalancesContext } from 'contexts/BalancesContext';

import styles from './styles';

export default function Balances() {
    const classes = styles();

    const { tokens } = useContext(BalancesContext);

    if (!Boolean(tokens.length)) {
        return null;
    }

    return (
        <div className={classes.balancesWrapper}>
            {
                tokens.map((token, index) =>
                    <div className={classes.balance} key={index}>
                        <img src={token.imgSrc} width={16} height={16} alt={token.alt} />

                        <div className={classes.balanceValueWrapper}>
                            <Typography className={classes.balanceValue}>{token.amount}</Typography>
                            <Typography className={classes.balanceValue}>{token.balance}$</Typography>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
