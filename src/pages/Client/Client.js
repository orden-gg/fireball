import React, { useContext, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Box } from '@mui/system';
import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string'

import { LoginContext } from 'contexts/LoginContext';
import { ClientContext } from 'contexts/ClientContext';
import commonUtils from 'utils/commonUtils';

import ClientGotchis from './routes/ClientGotchis';
import ClientLendings from './routes/ClientLendings';
import ClientWarehouse from './routes/ClientWarehouse';
import ClientTickets from './routes/ClientTickets';
import ClientRealm from './routes/ClientRealm';
import LoginNavigation from 'components/Login/LoginNavigation';
import PageNav from 'components/PageNav/PageNav';

import styles from './styles';

export default function Client() {
    const classes = styles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const params = queryString.parse(location.search);

    const { activeAddress } = useContext(LoginContext);
    const { clientActive, setClientActive, getClientData, navData } = useContext(ClientContext);

    useEffect(() => {
        if (activeAddress) {
            setClientActive(activeAddress);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAddress]);

    useEffect(() => {
        if (params.address) {
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
                    <PageNav
                        links={navData}
                        query={`?address=${clientActive}`}
                    />

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
