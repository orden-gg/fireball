import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
    createStyles({
        container: {
            position: 'fixed',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: theme.zIndex.appBar + 10,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            borderRadius: '0 5px 5px 0',
            boxShadow: `0 0 5px 0 ${alpha(theme.palette.common.black, 0.5)}`
        },
        navigation: {
            width: 50
        },
        navItem: {
            display: 'flex'
        },
        navLink: {
            color: theme.palette.common.white,
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            position: 'relative',

            '&.active': {
                backgroundColor: theme.palette.background.default
            },

            '&:hover': {
                backgroundColor: theme.palette.background.default,
                boxShadow: `0 0 5px 0 ${alpha(theme.palette.common.black, 0.5)}`,
                borderRadius: '0 5px 5px 0',

                '& $navItemName': {
                    display: 'block'
                }
            }
        },
        iconBox: {
            width: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '3px 4px',
            borderRadius: 4,
            '& img': {
                display: 'block',
                borderRadius: 4,
                width: '100%'
            }
        },
        navItemName: {
            margin: theme.spacing(0, 2, 0, 1),
            fontFamily: 'Amatic SC, cursive',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            display: 'none',
            fontSize: 24
        }
    })
);
