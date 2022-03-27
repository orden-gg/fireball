import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { Box } from '@mui/system';
import { Helmet } from 'react-helmet';

import SnackbarContextProvider from "./contexts/SnackbarContext";
import Header from './root/Header/Header';
import Footer from './root/Footer/Footer';

import Main from './pages/Main/Main';
import Baazaar from './pages/Baazaar/Baazaar';
import GhostExplorer from './pages/GhostExplorer/GhostExplorer';
import Guilds from './pages/Guilds/Guilds';
import Client from './pages/Client/Client';
import Autopet from './pages/Autopet/Autopet';
import Raffle from './pages/Raffle/Raffle';
import Listings from './pages/Listings/Listings';
import NotFound from './pages/NotFound/NotFound';
import BaazaarContextProvider from "./contexts/BaazaarContext";
import LoginContextProvider from './contexts/LoginContext';
import ClientContextProvider from './contexts/ClientContext';

import { styled } from '@mui/system';

const classes = {
    wrapper: 'page-wrapper',
    content: 'page-content'
}

const Wrapper = styled('div')(() => ({
    [`&.${classes.wrapper}`]: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingTop: 70,
    },
    [`& .${classes.content}`]: {
        flexGrow: 1
    },
}));

export default function App() {
    return (
        <SnackbarContextProvider>
            <BaazaarContextProvider>
                <LoginContextProvider>
                    <ClientContextProvider>

                        <Helmet>
                            <title>fireball.gg gotchiverse client</title>
                        </Helmet>

                        <Wrapper className={classes.wrapper}>
                            <Header />

                            <Box className={classes.content}>
                                <Switch>
                                    <Route exact path={`/`} component={ Main } />
                                    <Route exact path={`/market`} component={ Baazaar } />
                                    <Route exact path={`/explorer`} component={ GhostExplorer } />
                                    <Route path={`/autopet`} component={ Autopet } />
                                    <Route path={`/guilds`} component={ Guilds } />
                                    <Route path={`/client`} component={ Client } />
                                    <Route path={`/raffle-calculator`} component={ Raffle } />
                                    <Route path={`/listings`} component={ Listings } />
                                    <Route exact path={`/404`} component={ NotFound } />
                                    <Redirect from='*' to='/404' />
                                </Switch>
                            </Box>

                            <Footer />
                        </Wrapper>

                    </ClientContextProvider>
                </LoginContextProvider>
            </BaazaarContextProvider>
        </SnackbarContextProvider>
    );
}
