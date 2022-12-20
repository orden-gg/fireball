import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
    createStyles({
        container: {
            position: 'fixed',
            top: '50%',
            left: -60,
            transform: 'translateY(-50%)',
            zIndex: theme.zIndex.appBar + 10,
            background: theme.palette.secondary.dark,
            borderRadius: '0 5px 5px 0',
            boxShadow: `0 0 5px 0 ${alpha(theme.palette.common.black, 0.5)}`,
            transition: 'left .3s ease-in-out',
            '&:hover': {
                left: 0
            }
        },
        navigation: {
            width: 60
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
            borderRadius: '0 4px 4px 0',

            '&.active': {
                backgroundColor: 'blue',
                borderRight: `16px solid ${theme.palette.primary.main}`
            },

            '&:hover': {
                background: theme.palette.secondary.dark,
                paddingRight: 8,

                '& $iconBox': {
                    padding: '3px 6px',
                    margin: '2px 0'
                },

                '& $navItemName': {
                    position: 'relative',
                    left: 0,
                    opacity: 1
                }
            }
        },
        iconBox: {
            background: theme.palette.secondary.dark,
            width: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '3px 4px',
            borderRadius: 4,
            position: 'relative',
            zIndex: 1,
            transition: 'all .2s ease-in-out',
            '& img': {
                display: 'block',
                borderRadius: 4,
                width: '100%'
            }
        },
        navItemName: {
            marginBottom: 3,
            paddingLeft: 4,
            fontFamily: 'Amatic SC, cursive',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            position: 'absolute',
            left: '-100%',
            fontSize: 28,
            opacity: 0,
            transition: 'all .2s ease-in-out'
        }
    })
);
