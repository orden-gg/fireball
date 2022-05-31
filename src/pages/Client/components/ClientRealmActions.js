import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';

import { useMetamask } from 'use-metamask';

import installationsApi from 'api/installations.api';

import styles, { accountStyles } from '../styles';

export default function ClientRealmActions({ realm, finishedUpgrades }) {
    const classes = {
        ...styles(),
        ...accountStyles()
    };
    const [isUserConnected, setIsUserConnected] = useState(false);

    const { metaState } = useMetamask();

    useEffect(() => {
        const accounts = metaState.account;
        const walletConnected  = accounts.length > 0;

        setIsUserConnected(walletConnected);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaState]);

    const onUpgradesFinish = (ids) => {
        installationsApi.finalizeUpgrades(ids);
    }

    return (
        <div className={classes.actions}>
            <Button
                variant='contained'
                color='info'
                fullWidth
                sx={{ marginBottom: '8px' }}
                onClick={() => onUpgradesFinish(finishedUpgrades)}
                disabled={!realm.length || !finishedUpgrades.length || !isUserConnected}
            >
                Finish upgrades ({finishedUpgrades.length})
            </Button>

            { !isUserConnected && (
                <Alert severity='error' sx={{ marginBottom: '8px' }}>
                    Please connect to metamask!
                </Alert>
            )}

            <Alert severity='warning' icon={false}>
                <AlertTitle>Use with caution!</AlertTitle>
                Current section still under development, use only if you understand what you do!
            </Alert>
        </div>
    );
}
