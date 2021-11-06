import React, { useContext, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useStyles } from './styles';

import { LoginContext } from '../../contexts/LoginContext';
import { ClientContext } from '../../contexts/ClientContext';

import LoginNavigation from '../../components/Login/LoginNavigation';
import ProfilePane from '../../components/ProfilePane/ProfilePane';
import ClientNav from './components/ClientNav';
import ClientGotchis from './routes/ClientGotchis';
import ClientWarehouse from './routes/ClientWarehouse';
import ClientTickets from './routes/ClientTickets';
import ClientRealm from './routes/ClientRealm';

export default function Client() {
    const classes = useStyles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const params = queryString.parse(location.search)

    const { activeAddress } = useContext(LoginContext);
    const { clientActive, setClientActive, getClientData } = useContext(ClientContext);

    useEffect(() => {
        if(activeAddress) {
            setClientActive(activeAddress);
        }
    }, [activeAddress]);

    useEffect(() => {
        if(params.address) {
            setClientActive(params.address);
        }
    }, [params.address]);

    useEffect(() => {
        if(clientActive) {
            getClientData();
            history.push({ path: location.pathname, search: `?address=${clientActive}` });
        } else {
            history.push({ path: location.pathname });
        }
    }, [clientActive]);

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>Client</title>
            </Helmet>

            {!clientActive?.length ? (
                <Box display='flex' alignItems='center' justifyContent='center' minHeight='calc(100vh - 192px)'>
                    <Box bgcolor='secondary.dark' maxWidth={400} margin='auto' padding='24px' borderRadius='4px'>
                        <Alert severity='info' sx={{ marginBottom: '24px' }}>
                            <AlertTitle>Fren, provide the address!</AlertTitle>
                            You cannot use the client without a valid ETH address.
                        </Alert>

                        <LoginNavigation />
                    </Box>
                </Box>
            ) : (
                <>
                    <ProfilePane address={clientActive} />

                    <ClientNav />

                    <Switch>
                        <Route path={`${match.path}/gotchis`} component={ ClientGotchis } />
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
