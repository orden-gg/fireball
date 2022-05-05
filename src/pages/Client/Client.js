import React, { useContext, useEffect, useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import queryString from 'query-string'

import LoginNavigation from 'components/Login/LoginNavigation';
import PageNav from 'components/PageNav/PageNav';
import { BaazarIcon } from 'components/Icons/Icons';
import { ClientContext } from 'contexts/ClientContext';
import { LoginContext } from 'contexts/LoginContext';
import commonUtils from 'utils/commonUtils';

import ClientGotchis from './routes/ClientGotchis';
import ClientLendings from './routes/ClientLendings';
import ClientWarehouse from './routes/ClientWarehouse';
import ClientInstallations from './routes/ClientInstallations';
import ClientTickets from './routes/ClientTickets';
import ClientRealm from './routes/ClientRealm';

import styles from './styles';

export default function Client() {
    const classes = styles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const { activeAddress } = useContext(LoginContext);
    const { clientActive, setClientActive, getClientData, navData } = useContext(ClientContext);
    const [queryParams] = useState(queryString.parse(location.search));

    useEffect(() => {
        if (activeAddress) {
            setClientActive(activeAddress);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAddress]);

    useEffect(() => {
        if (queryParams.address) {
            setClientActive(queryParams.address);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams.address]);

    useEffect(() => {
        if (clientActive) {
            getClientData();
            queryParams.address = clientActive;

            history.push({ path: location.pathname, search: queryString.stringify(queryParams, { arrayFormat: 'comma' }) });
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
                    <div className={classes.head}>
                        <PageNav
                            links={navData}
                            query={`?address=${clientActive}`}
                        >
                            <Button
                                href={`/shop?address=${clientActive}`}
                                target='_blank'
                                className={classes.shopBtn}
                            >
                                <BaazarIcon width={24} height={24} />
                            </Button>
                        </PageNav>
                    </div>

                    <Switch>
                        <Route path={`${match.path}/gotchis`} component={ ClientGotchis } />
                        <Route path={`${match.path}/lendings`} component={ ClientLendings } />
                        <Route path={`${match.path}/warehouse`} component={ ClientWarehouse } />
                        <Route path={`${match.path}/installations`} component={ ClientInstallations } />
                        <Route path={`${match.path}/tickets`} component={ ClientTickets } />
                        <Route path={`${match.path}/realm`} component={ ClientRealm } />
                        <Redirect from={match.path} to={`${match.path}/gotchis`} />
                    </Switch>
                </>
            )}

        </Box>
    );
}
