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
                <Typography>
                    <Box component='span' className={classes.highlight}>v0.3</Box>
                    <Box component='span' className={classes.footerCopyright}>
                        <a href='https://ghst.gg/'>ghst.gg</a> is aavegotchi.com client developed by orden DAO | <a href='https://simpleanalytics.com/ghst.gg' rel='noreferrer' target='_blank'>stats</a>
                    </Box>
                </Typography>
            </Toolbar>
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={() => onSnackbarClose()}>
                <FooterAlert onClose={() => onSnackbarClose()} severity={type}>
                    {message}
                </FooterAlert>
            </Snackbar>
        </Box>
    )
}