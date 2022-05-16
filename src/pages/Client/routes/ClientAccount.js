import React from 'react';
import { useParams } from 'react-router';
import { Alert } from '@mui/material';

import EthAddress from 'components/EthAddress/EthAddress';
import ethersApi from 'api/ethers.api';

import ClientNav from '../components/ClientNav';
import styles, { accountStyles } from '../styles';

export default function ClientAccount() {
    const classes = {
        ...styles(),
        ...accountStyles()
    };

    const { account } = useParams();

    return (
        <div className={classes.accountContainer}>
            <ClientNav />

            { ethersApi.isEthAddress(account) && (
                <div className={classes.account}>
                    <EthAddress
                        address={account}
                        icon={true}
                        polygonButton={true}
                        copyButton={true}
                    />

                    <Alert severity='info' className={classes.alert}>
                        Coming soon - account info, stats, voting power, etc.
                    </Alert>
                </div>
            )}
        </div>
    );
}
