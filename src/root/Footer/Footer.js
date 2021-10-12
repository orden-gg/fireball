import React, { useContext } from 'react';
import { Box, Toolbar, Typography, Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SnackbarContext } from "../../contexts/SnackbarContext";

function FooterAlert(props) {
    return <Alert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    footerWrapper: {
        backgroundColor: theme.palette.secondary.dark,
        padding: '5px 24px',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            padding: '5px 32px'
        }
    },
    toolbar: {
        padding: 0
    },
    highlight: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderRadius: 4,
        padding: '4px 8px',
        color: theme.palette.primary.main,
        marginRight: 8
    },
    footerCopyright: {
        '& a': {
            textDecoration: "none",
            color: theme.palette.primary.main
        }
    }
}));

export default function Footer() {
    const classes = useStyles(),
        { isOpen, type, message, onSnackbarClose } = useContext(SnackbarContext);

    return (
        <Box className={classes.footerWrapper}>
            <Toolbar className={classes.toolbar}>
                <Typography>
                    <Box component='span' className={classes.highlight}>v4</Box>
                    <Box component='span' className={classes.footerCopyright}>
                        <a href='https://ghst.gg/'>ghst.gg</a> is aavegotchi.com client developed by orden DAO | <a href='https://simpleanalytics.com/ghst.gg' rel='nofollow' target='_blank'>stats</a>
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