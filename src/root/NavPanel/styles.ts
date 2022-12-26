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
                left: 0,
                '& $navItemName::before': {
                    transform: 'translateY(-50%) rotateY(180deg) rotateZ(-3deg)'
                }
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

            '&.active': {
                '& $navItemName': {
                    '&::before, &::after': {
                        opacity: 1
                    }
                }
            },

            '&:hover': {
                background: theme.palette.secondary.dark,

                '& $iconBox': {
                    padding: '3px 6px',
                    margin: '2px 0'
                },

                '& $navItemName': {
                    transform: 'translate(0, -50%)',

                    '& span': {
                        opacity: 1,
                        right: 0
                    }
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
            height: 60,
            padding: '0 12px 0 8px',
            fontFamily: 'Amatic SC, cursive',
            fontSize: 28,
            fontWeight: 700,
            whiteSpace: 'nowrap',
            position: 'absolute',
            top: '50%',
            left: '100%',
            transform: 'translate(-100%, -50%)',
            borderRadius: '0 4px 4px 0',
            background: theme.palette.secondary.dark,
            display: 'flex',
            alignItems: 'center',
            transition: 'all .2s ease-in-out',
            '& span': {
                marginBottom: 4,
                opacity: 0,
                position: 'relative',
                right: -10,
                transition: 'all .4s ease-in-out'
            },
            '&::before, &::after': {
                position: 'absolute',
                opacity: 0
            },
            '&::before': {
                content: '">"',
                top: '50%',
                left: '100%',
                color: theme.palette.secondary.dark,
                transform: 'translateY(-50%)',
                fontSize: 32,
                marginLeft: 2,
                zIndex: 1,
                transition: 'transform .5s ease-in-out'
            },
            '&::after': {
                content: '""',
                top: 0,
                left: '100%',
                bottom: 0,
                width: 16,
                background: theme.palette.primary.main,
                borderRadius: '0 4px 4px 0'
            }
        }
    })
);
