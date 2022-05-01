import React, { useContext } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { useParams } from 'react-router';

import EthAddress from 'components/EthAddress/EthAddress';
import PageNav from 'components/PageNav/PageNav';
import { BaazarIcon } from 'components/Icons/Icons';
import { ClientContext } from 'contexts/ClientContext';

import styles, { accountStyles } from '../styles';
import LoginNavigation from 'components/Login/LoginNavigation';

export default function ClientNav() {
    const classes = {
        ...styles(),
        ...accountStyles()
    };

    const { account } = useParams();

    const { navData, setActiveAddress } = useContext(ClientContext);

    const onAddressSubmit = (address) => {
        setActiveAddress(address);
        // history.push({ pathname: `/client/${address}` });
    };

    return (
        <div className={classes.loginNav}>
            <LoginNavigation address={account} onSubmit={onAddressSubmit} />
        </div>
    );
}
