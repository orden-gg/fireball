import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/styles';
import { ThemeProvider } from '@emotion/react';

import { MetamaskStateProvider } from 'use-metamask';

import { App } from './App';
import { reportWebVitals } from './reportWebVitals';
import { store } from './core/store/store';

import { theme } from './themes/ghst';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <MetamaskStateProvider>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Provider store={store}>
                        <App/>
                    </Provider>
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
