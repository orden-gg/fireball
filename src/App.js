import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import SnackbarContextProvider from "./contexts/SnackbarContext";
import Header from './root/Header/Header';
import Footer from './root/Footer/Footer';
import MusicButton from './components/MusicButton/MusicButton';

import Main from './pages/Main/Main';
import Baazaar from './pages/Baazaar/Baazaar';
import GhostExplorer from './pages/GhostExplorer/GhostExplorer';
import CountdownTest from './pages/CountdownTest/CountdownTest';
import Client from './pages/Client/Client';
import Raffle from './pages/Raffle/Raffle';
import NotFound from './pages/NotFound/NotFound';
import BaazaarContextProvider from "./contexts/BaazaarContext";
import LoginContextProvider from './contexts/LoginContext';
import ClientContextProvider from './contexts/ClientContext';

const useStyles = makeStyles(() => ({
    wrap: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingTop: 70,
        '&.explorer': {
            height: '100%'
        }
    },
    content: {
        flexGrow: 1,
        '&.explorer': {
            height: '100%'
        }
    }
}));

export default function App() {
    const classes = useStyles();
    const location = useLocation();

    return (
        <SnackbarContextProvider>
            <BaazaarContextProvider>
                <LoginContextProvider>
                    <ClientContextProvider>

                        <Helmet>
                            <title>ghst_gg</title>
                        </Helmet>

                        <MusicButton />

                        <Box className={classNames(classes.wrap, location.pathname === '/explorer' ? 'explorer' : '')}>
                            <Header />

                            <Box className={classNames(classes.content, location.pathname === '/explorer' ? 'explorer' : '')}>
                                <Switch>
                                    <Route exact path={`/`} component={ Main } />
                                    <Route exact path={`/market`} component={ Baazaar } />
                                    <Route exact path={`/explorer`} component={ GhostExplorer } />
                                    <Route path={`/client`} component={ Client } />
                                    <Route exact path={`/raffle-calculator`} component={ Raffle } />
                                    <Route exact path={`/countdown-test`} component={ CountdownTest } />
                                    <Route exact path={`/404`} component={ NotFound } />
                                    <Redirect from='*' to='/404' />
                                </Switch>
                            </Box>

                            {location.pathname !== '/explorer' && <Footer />}
                        </Box>

                    </ClientContextProvider>
                </LoginContextProvider>
            </BaazaarContextProvider>
        </SnackbarContextProvider>
    );
}
