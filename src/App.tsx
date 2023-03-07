import { Helmet } from 'react-helmet';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { styled } from '@mui/system';
import { Box } from '@mui/system';

import classNames from 'classnames';

import {
  Anvil,
  Autopet,
  Baazaar,
  Client,
  Craft,
  FakeGotchisGallery,
  GhostExplorer,
  Glossary,
  GotchiPage,
  Guilds,
  Lend,
  Main,
  Map,
  NotFound,
  ParcelPage,
  Raffle
} from 'pages';

import { BalancesContextProvider } from 'contexts/BalancesContext';
import { SnackbarContextProvider } from 'contexts/SnackbarContext';
import { TokensPricesContextProvider } from 'contexts/TokensPricesContext';

import { Footer } from 'root/Footer/Footer';
import { Header } from 'root/Header/Header';
import { NavPanel } from 'root/NavPanel/NavPanel';

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
  const isNavHidden = location.pathname === '/';
  const isHeaderHidden = location.pathname === '/shop';
  const isFooterHidden = location.pathname === '/shop' || location.pathname === '/';

  return (
    <SnackbarContextProvider>
      <TokensPricesContextProvider>
        <Helmet>
          <title>aavegotchi portal #1</title>
        </Helmet>

        <Wrapper className={classNames(classes.wrapper, !isHeaderHidden && classes.noHeaderWrapper)}>
          {!isHeaderHidden && (
            <>
              <BalancesContextProvider>
                <Header />
              </BalancesContextProvider>
              {!isNavHidden && <NavPanel />}
            </>
          )}

          <Box className={classes.content}>
            <Routes>
              <Route path='' element={<Main />} />
              <Route path='anvil' element={<Anvil />} />
              <Route path='market/*' element={<Baazaar />} />
              <Route path='lendings' element={<Lend />} />
              <Route path='explorer' element={<GhostExplorer />} />
              <Route path='autopet' element={<Autopet />} />
              <Route path='guilds/*' element={<Guilds />} />
              <Route path='client/*' element={<Client />} />
              <Route path='craft' element={<Craft />} />
              <Route path='parcel/:parcelId' element={<ParcelPage />} />
              <Route path='raffles/*' element={<Raffle />} />
              <Route path='map' element={<Map />} />
              <Route path='gotchi/:gotchiId' element={<GotchiPage />} />
              <Route path='glossary/*' element={<Glossary />} />
              <Route path='fake-gotchis-gallery/*' element={<FakeGotchisGallery />} />
              <Route path='404' element={<NotFound />} />
              <Route path='*' element={<Navigate to='404' replace />}></Route>
            </Routes>
          </Box>

          {!isFooterHidden && <Footer />}
        </Wrapper>
      </TokensPricesContextProvider>
    </SnackbarContextProvider>
  );
}
