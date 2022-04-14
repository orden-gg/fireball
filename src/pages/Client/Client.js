import React, { useContext, useEffect } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import queryString from 'query-string'

import LoginNavigation from 'components/Login/LoginNavigation';
import PageNav from 'components/PageNav/PageNav';
import { BaazarIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';
import { ClientContext } from 'contexts/ClientContext';
import commonUtils from 'utils/commonUtils';

import ClientGotchis from './routes/ClientGotchis';
import ClientLendings from './routes/ClientLendings';
import ClientWarehouse from './routes/ClientWarehouse';
import ClientTickets from './routes/ClientTickets';
import ClientRealm from './routes/ClientRealm';

import styles from './styles';
import EthAddress from 'components/EthAddress/EthAddress';

export default function Client() {
    const classes = styles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const params = queryString.parse(location.search);

    const { activeAddress, setActiveAddress } = useContext(LoginContext);
    const { clientActive, setClientActive, getClientData, navData } = useContext(ClientContext);

    useEffect(() => {
        if (activeAddress) {
            setClientActive(activeAddress);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAddress]);

    useEffect(() => {
        if (params.address) {
            setActiveAddress(params.address);
            setClientActive(params.address);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.address]);

    useEffect(() => {
        if (clientActive) {
            getClientData();
            history.push({ path: location.pathname, search: `?address=${clientActive}` });
        } else {
            history.push({ path: location.pathname });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientActive]);

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>
                    {clientActive ?
                        `${commonUtils.cutAddress(clientActive, '...')} || ${location.pathname.split('/')[2]}`
                        : 'Client'}
                </title>
            </Helmet>

            <EthAddress
                address={clientActive}
                icon={true}
                clientLink={true}
                polygonLink={true}
                copy={true}
            />

            {!clientActive?.length ? (
                <Box className={classes.alertWrapper}>
                    <Box className={classes.alertInner}>
                        <Alert severity='info' className={classes.alert}>
                            <AlertTitle>Fren, provide the address!</AlertTitle>
                            You cannot use the client without a valid ETH address.
                        </Alert>

                        <LoginNavigation />
                    </Box>
                </Box>
            ) : (
                <>
                    <div className={classes.head}>
                        <PageNav
                            links={navData}
                            query={`?address=${clientActive}`}
                        />
                        <Button
                            href={`/shop?address=${clientActive}`}
                            target='_blank'
                            className={classes.shopBtn}
                        >
                            <BaazarIcon width={24} height={24} />
                        </Button>
                    </div>

                    <Switch>
                        <Route path={`${match.path}/gotchis`} component={ ClientGotchis } />
                        <Route path={`${match.path}/lendings`} component={ ClientLendings } />
                        <Route path={`${match.path}/warehouse`} component={ ClientWarehouse } />
                        <Route path={`${match.path}/tickets`} component={ ClientTickets } />
                        <Route path={`${match.path}/realm`} component={ ClientRealm } />
                        <Redirect from={match.path} to={`${match.path}/gotchis`} />
                    </Switch>
                </>
            )}

        </Box>
    );
}
