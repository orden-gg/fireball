import { Route, Switch, Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box } from '@mui/system';

import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import Header from './root/Header/Header';
import Footer from './root/Footer/Footer';

import Main from './pages/Main/Main';
import Baazaar from './pages/Baazaar/Baazaar';
import Lend from 'pages/Lend/Lend';
import GhostExplorer from './pages/GhostExplorer/GhostExplorer';
import Guilds from './pages/Guilds/Guilds';
import Client from './pages/Client/Client';
import ParcelPage from './pages/Parcel/ParcelPage';
import Autopet from './pages/Autopet/Autopet';
import OldAutopet from './pages/OldAutopet/OldAutopet';
import Raffle from './pages/Raffle/Raffle';
import Shop from './pages/Shop/Shop';
import Map from './pages/Map/Map';
import NotFound from './pages/NotFound/NotFound';
import BaazaarContextProvider from './contexts/BaazaarContext';
import BalancesContextProvider from 'contexts/BalancesContext';
import ClientContextProvider from './contexts/ClientContext';
import LoginContextProvider from './contexts/LoginContext';
import SnackbarContextProvider from './contexts/SnackbarContext';
import TokensPricesContextProvider from 'contexts/TokensPricesContext';

const classes = {
    wrapper: 'page-wrapper',
    noHeaderWrapper: 'no-header-page-wrapper',
    content: 'page-content'
};

const Wrapper = styled('div')(() => ({
    [`&.${classes.wrapper}`]: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingTop: 66
    },
    [`&.${classes.noHeaderWrapper}`]: {
        paddingTop: 0
    },
    [`& .${classes.content}`]: {
        flexGrow: 1
    }
}));

export default function App() {
    const location = useLocation();
    // TODO find a better way how to handle hide/show header/footer
    const isDisplayHeader = location.pathname !== '/shop';
    const isDisplayFooter = location.pathname !== '/shop';

    return (
        <LoginContextProvider>
            <SnackbarContextProvider>
                <BaazaarContextProvider>
                    <TokensPricesContextProvider>
                        <ClientContextProvider>

                            <Helmet>
                                <title>fireball.gg gotchiverse client</title>
                            </Helmet>

                            <Wrapper className={classNames(classes.wrapper, !isDisplayHeader && classes.noHeaderWrapper)}>
                                { isDisplayHeader &&
                                    <BalancesContextProvider>
                                        <Header />
                                    </BalancesContextProvider>
                                }

                                <Box className={classes.content}>
                                    <Switch>
                                        <Route exact path={'/'} component={ Main } />
                                        <Route exact path={'/market'} component={ Baazaar } />
                                        <Route path={'/lend'} component={ Lend } />
                                        <Route exact path={'/explorer'} component={ GhostExplorer } />
                                        <Route path={'/autopet'} component={ Autopet } />
                                        <Route path={'/autopet-v1'} component={ OldAutopet } />
                                        <Route path={'/guilds'} component={ Guilds } />
                                        <Route path={'/client'} component={ Client } />
                                        <Route path={'/parcel/:parcelId'} component={ ParcelPage } />
                                        <Route path={'/raffle-calculator'} component={ Raffle } />
                                        <Route path={'/shop'} component={ Shop } />
                                        <Route path={'/map'} component={ Map } />
                                        <Route exact path={'/404'} component={ NotFound } />
                                        <Redirect from='*' to='/404' />
                                    </Switch>
                                </Box>

                                { isDisplayFooter && <Footer /> }
                            </Wrapper>

                        </ClientContextProvider>
                    </TokensPricesContextProvider>
                </BaazaarContextProvider>
            </SnackbarContextProvider>
        </LoginContextProvider>
    );
}
