import React, { useContext, useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { useMetamask } from 'use-metamask';

import { SnackbarContext } from 'contexts/SnackbarContext';
import installationsApi from 'api/installations.api';

import { actionStyles } from '../styles';

export default function ClientRealmActions({ claimableList }) {
    const classes = actionStyles();
    const [isUserConnected, setIsUserConnected] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState('default');

    const { metaState } = useMetamask();
    const { showSnackbar } = useContext(SnackbarContext);

    const isTransactionProcessing = transactionStatus === 'processing';
    const isTransactionCompleted = transactionStatus === 'completed';

    useEffect(() => {
        const accounts = metaState.account;
        const walletConnected  = accounts.length > 0;

        setIsUserConnected(walletConnected);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaState]);

    const onUpgradesFinish = (ids) => {
        const succesMessage = `successefully finished ${ids.length} upgrades`;
        const errorMessage = 'upgrades finishing went wrong :(';

        installationsApi.finalizeUpgrades(ids)
            .then(completed => {
                if (completed) {
                    showSnackbar('success', succesMessage);
                    setTransactionStatus('completed');
                } else {
                    showSnackbar('error', errorMessage);
                    setTransactionStatus('failed');
                }
            })
            .catch(e => {
                console.log(e);
                setTransactionStatus('failed');
            })
    }

    const renderButtonNode = (state) => {
        switch (state) {
            case 'completed':
                return (
                    <>
                        Completed! <CheckIcon size='small' />
                    </>
                );
            case 'processing':
                return (
                    <>
                        Finishing <CircularProgress size={20} color='secondary' sx={{ marginLeft: '8px' }} />
                    </>
                );
            default:
                return (
                    <>
                        Finish upgrades ({claimableList.length})
                    </>
                );
        }
    }

    return (
        <div>
            <Button
                variant='contained'
                color={isTransactionCompleted ? 'success' : 'info'}
                fullWidth
                sx={{ marginBottom: '8px' }}
                onClick={() => onUpgradesFinish(claimableList)}
                disabled={!claimableList.length || !isUserConnected || isTransactionProcessing}
                className={isTransactionCompleted ? classes.buttonCompleted : null}
            >
                {renderButtonNode(transactionStatus)}
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
