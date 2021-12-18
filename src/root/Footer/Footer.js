import React, { useContext } from 'react';
import { Box, Toolbar, Typography, Snackbar, Alert } from '@mui/material';

import { SnackbarContext } from "../../contexts/SnackbarContext";

import styles from './styles';

function FooterAlert(props) {
    return <Alert elevation={6} variant="filled" {...props} />;
}

export default function Footer() {
    const classes = styles(),
        { isOpen, type, message, onSnackbarClose } = useContext(SnackbarContext);

    return (
        <Box className={classes.footerWrapper}>
            <Toolbar className={classes.toolbar}>
                <Box display='flex' alignItems='center' width='100%'>
                    <span className={classes.highlight}>v0.31</span>
                    <span className={classes.footerCopyright}>
                        ghst_gg is the <a href='https://github.com/orden-gg/ghst-gg' rel='noreferrer' target='_blank'>open-source</a>, <a href='https://www.aavegotchi.com/' rel='noreferrer' target='_blank'>gotchiverse</a> client focused on game {'&&'} market transparency. Developed by <a href='https://twitter.com/orden_gg' rel='noreferrer' target='_blank'>ordenGG</a> {'&'} contributors. 
                    </span>
                    <span className={classes.stats}><a href='https://simpleanalytics.com/ghst.gg' rel='noreferrer' target='_blank'>[stats]</a></span>
                </Box>
            </Toolbar>
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={() => onSnackbarClose()}>
                <FooterAlert onClose={() => onSnackbarClose()} severity={type}>
                    {message}
                </FooterAlert>
            </Snackbar>
        </Box>
    )
}