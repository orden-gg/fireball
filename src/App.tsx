import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box } from '@mui/system';

import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import { Footer } from './root/Footer/Footer';
import { Header } from './root/Header/Header';
import { NavPanel } from 'root/NavPanel/NavPanel';

import { Autopet } from './pages/Autopet/Autopet';
import { Baazaar } from './pages/Baazaar/Baazaar';
import { Client } from './pages/Client/Client';
import { Craft } from 'pages/Craft/Craft';
import { GhostExplorer } from './pages/GhostExplorer/GhostExplorer';
import { Guilds } from './pages/Guilds/Guilds';
import { Lend } from 'pages/Lend/Lend';
import { Main } from './pages/Main/Main';
import { Map } from './pages/Map/Map';
import { NotFound } from './pages/NotFound/NotFound';
import { ParcelPage } from './pages/Parcel/ParcelPage';
import { Raffle } from './pages/Raffle/Raffle';
import { Shop } from './pages/Shop/Shop';
import { BaazaarContextProvider } from './contexts/BaazaarContext';
import { BalancesContextProvider } from 'contexts/BalancesContext';
import { ClientContextProvider } from './contexts/ClientContext';
import { LoginContextProvider } from './contexts/LoginContext';
import { SnackbarContextProvider } from './contexts/SnackbarContext';
import { TokensPricesContextProvider } from 'contexts/TokensPricesContext';

const classes = {
    wrapper: 'page-wrapper',
    noHeaderWrapper: 'no-header-page-wrapper',
    content: 'page-content'
};

const Wrapper = styled('div')(() => ({
    [`&.${classes.wrapper}`]: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
    },
    [`&.${classes.noHeaderWrapper}`]: {
        paddingTop: 0
    },
    [`& .${classes.content}`]: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    }
}));

export function App() {
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
                                    <>
                                        <BalancesContextProvider>
                                            <Header />
                                        </BalancesContextProvider>
                                        <NavPanel />
                                    </>
                                }

                                <Box className={classes.content}>
                                    <Routes>
                                        <Route path='' element={<Main />} />
                                        <Route path='market' element={<Baazaar />} />
                                        <Route path='lend' element={<Lend />} />
                                        <Route path='explorer' element={<GhostExplorer />} />
                                        <Route path='autopet' element={<Autopet />} />
                                        <Route path='guilds/*' element={<Guilds />} />
                                        <Route path='client/*' element={<Client />} />
                                        <Route path='parcel/:parcelId' element={<ParcelPage />} />
                                        <Route path='raffles/*' element={<Raffle />} />
                                        <Route path='shop' element={<Shop />} />
                                        <Route path='map' element={<Map />} />
                                        <Route path='craft' element={<Craft />} />
                                        <Route path='404' element={<NotFound />} />
                                        <Route path='*' element={<Navigate to='404' replace />}></Route>
                                    </Routes>
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
