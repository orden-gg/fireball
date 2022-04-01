import React, { useContext } from 'react';
import { Typography } from '@mui/material';

import { LoginContext } from 'contexts/LoginContext';
import akekIcon from 'assets/images/icons/akek.svg';
import alphaIcon from 'assets/images/icons/alpha.svg';
import fomoIcon from 'assets/images/icons/fomo.svg';
import fudIcon from 'assets/images/icons/fud.svg';
import ghstIcon from 'assets/images/icons/ghst-token.svg';

import styles from './styles';

export default function Balances() {
    const classes = styles();

    const {
        fudBalance,
        fomoBalance,
        alphaBalance,
        akekBalance,
        ghstBalance
    } = useContext(LoginContext);

    return (
        <div className={classes.balancesWrapper}>
            <div className={classes.balance}>
                <img src={fudIcon} width={16} height={16} alt='FUD' />
                <Typography className={classes.balanceValue}>{fudBalance}</Typography>
            </div>
            <div className={classes.balance}>
                <img src={fomoIcon} width={16} height={16} alt='FOMO' />
                <Typography className={classes.balanceValue}>{fomoBalance}</Typography>
            </div>
            <div className={classes.balance}>
                <img src={alphaIcon} width={16} height={16} alt='ALPHA' />
                <Typography className={classes.balanceValue}>{alphaBalance}</Typography>
            </div>
            <div className={classes.balance}>
                <img src={akekIcon} width={16} height={16} alt='AKEK' />
                <Typography className={classes.balanceValue}>{akekBalance}</Typography>
            </div>
            <div className={classes.balance}>
                <img src={ghstIcon} width={16} height={16} alt='GHST' />
                <Typography className={classes.balanceValue}>{ghstBalance}</Typography>
            </div>
        </div>
    );
}
