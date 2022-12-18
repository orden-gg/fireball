import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
    createStyles({
        navContainer: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: `${(16 / 1920) * 100}vw`
        },
        navCard: {
            background: alpha('#000', 0.15),
            border: '1px solid transparent',
            margin: '0.5em',
            borderRadius: 4,
            overflow: 'hidden',
            color: 'white',
            textDecoration: 'none',
            textAlign: 'center',
            width: '18em',
            transition: 'background .2s ease-in-out',
            '& img': {
                display: 'block',
                width: '100%'
            },
            '&:hover': {
                background: alpha('#000', 0.3)
            }
        },
        navCardName: {
            fontFamily: 'Amatic SC, cursive',
            fontSize: '2em',
            color: 'gold',
            lineHeight: 1,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            padding: 8,
            textShadow: `0 0 2px ${alpha('#000', 0.5)},
                        0 0 2px ${alpha('#000', 0.5)},
                        0 0 2px ${alpha('#000', 0.5)}`
        },
        navCardImage: {
            position: 'relative'
        },
        navCardDescr: {
            minHeight: '5.5em',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            // width: '100%'
            // fontSize: 16
        }
    })
);
