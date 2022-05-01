import React, { useContext } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { useParams } from 'react-router';

import EthAddress from 'components/EthAddress/EthAddress';
import PageNav from 'components/PageNav/PageNav';
import { BaazarIcon } from 'components/Icons/Icons';
import { ClientContext } from 'contexts/ClientContext';

import styles, { accountStyles } from '../styles';
import LoginNavigation from 'components/Login/LoginNavigation';
import ClientNav from '../components/ClientNav';

export default function ClientAccount() {
    const classes = {
        ...styles(),
        ...accountStyles()
    };

    const { account } = useParams();

    return (
        <div className={classes.accountContainer}>
            <ClientNav />

            <Alert severity='info' className={classes.alert}>
                <AlertTitle>Coming soon!</AlertTitle>
                Account info, stats, voting power, etc.
            </Alert>

            <div className={classes.account}>
                <EthAddress
                    address={account}
                    icon={true}
                    polygonButton={true}
                    copyButton={true}
                />
            </div>
        </div>
    );
}
