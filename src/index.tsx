import { ThemeProvider } from '@emotion/react';
import SafeProvider from '@safe-global/safe-apps-react-sdk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AlertTitle, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/styles';

import { MetamaskStateProvider } from 'use-metamask';

import { store } from './core/store/store';

import { App } from './App';
import './index.css';
import { reportWebVitals } from './reportWebVitals';
import { theme } from './themes/ghst';

ReactDOM.render(
  <BrowserRouter>
    <MetamaskStateProvider>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <SafeProvider
            loader={
              <>
                <AlertTitle>Waiting for Fireball Safe...</AlertTitle>
                <CircularProgress color='primary' />
              </>
            }
          >
            <CssBaseline />
            <Provider store={store}>
              <App />
            </Provider>
          </SafeProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </MetamaskStateProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
