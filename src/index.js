import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { MetamaskStateProvider } from 'use-metamask';

import { ThemeProvider as MuiThemeProvider } from '@mui/styles';
import { ThemeProvider } from '@emotion/react';


import theme from './themes/ghst';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <MetamaskStateProvider>
            {/* <StylesProvider injectFirst> */}
                <MuiThemeProvider theme={theme}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline /> 
                        <App/>
                    </ThemeProvider>
                </MuiThemeProvider>
            {/* </StylesProvider> */}
        </MetamaskStateProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
