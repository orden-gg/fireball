import React, { useContext } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { useParams } from 'react-router';

import EthAddress from 'components/EthAddress/EthAddress';
import PageNav from 'components/PageNav/PageNav';
import { BaazarIcon } from 'components/Icons/Icons';
import { ClientContext } from 'contexts/ClientContext';

import styles, { accountStyles } from '../styles';

export default function ClientAccount() {
    const classes = {
        ...styles(),
        ...accountStyles()
    };

    const { account } = useParams();

    const { navData } = useContext(ClientContext);

    return (
        <div className={classes.container}>
            <Alert severity='info' className={classes.alert}>
                <AlertTitle>Coming soon!</AlertTitle>
                Account info, stats, voting power, etc.
            </Alert>

            <div className={classes.account}>
                <EthAddress
                    address={account}
                    icon={true}
                    polygonLink={true}
                    copy={true}
                />
            </div>

            <div className={classes.accountNav}>
                <PageNav
                    links={navData}
                    query={`?address=${account}`}
                    counts={false}
                >
                    <Button
                        href={`/shop?address=${account}`}
                        target='_blank'
                        className={classes.shopBtn}
                    >
                        <BaazarIcon width={24} height={24} />
                    </Button>
                </PageNav>
            </div>
        </div>
    );
}
