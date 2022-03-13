import React, { useContext } from 'react';
import { Box, Toolbar, Button, Link, Snackbar, Alert } from '@mui/material';

import { SnackbarContext } from '../../contexts/SnackbarContext';
import MusicButton from '../../components/MusicButton/MusicButton';

import styles from './styles';

export default function Footer() {
    const classes = styles(),
        { isOpen, type, message, onSnackbarClose } = useContext(SnackbarContext);

    return (
        <Box className={classes.footerWrapper}>
            <Toolbar className={classes.toolbar}>
                <div>
                    <span className={classes.highlight}>v0.31</span>
                    <span className={classes.footerCopyright}>
                        fireball.gg is the <a href='https://github.com/orden-gg/fireball' rel='noreferrer' target='_blank'>open-source</a>, <a href='https://www.aavegotchi.com/' rel='noreferrer' target='_blank'>gotchiverse</a> client focused on game {'&&'} market transparency. Developed by <a href='https://twitter.com/orden_gg' rel='noreferrer' target='_blank'>ordenGG</a> {'&'} contributors. 
                    </span>
                </div>
                <div className={classes.buttons}>
                    <Button component={Link} size='small' href='https://simpleanalytics.com/fireball.gg' target='_blank'>[stats]</Button>
                    <MusicButton />
                </div>
            </Toolbar>

            <Snackbar
                open={isOpen}
                autoHideDuration={3000}
                onClose={() => onSnackbarClose()}
            >
                <Alert 
                    elevation={6}
                    variant='filled'
                    severity={type}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}