import { alpha, darken } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    container: {
        width: 188,
        textAlign: 'center',
        fontSize: 13,
        margin: theme.spacing(0, -.5)
    },
    containerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4
    },
    gotchiKinship: {
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        cursor: 'default',
        padding: '2px 4px',
        color: '#fff',
        position: 'relative',
        marginTop: -12,
        minWidth: 50,
        justifyContent: 'center',
        '.common &': {
            textShadow: `0 0 3px ${darken(theme.palette.rarity.common, .7)}`
        },
        '.rare &': {
            textShadow: `0 0 3px ${darken(theme.palette.rarity.rare, .7)}`
        },
        '.mythical &': {
            textShadow: `0 0 3px ${darken(theme.palette.rarity.mythical, .7)}`
        },
        '.godlike &': {
            textShadow: `0 0 3px ${darken(theme.palette.rarity.godlike, .7)}`
        },
        '&:hover': {
            background: alpha('#000', .1)
        },
        '&:before': {
            content: '""',
            width: '150%',
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '23px solid transparent',
            position: 'absolute',
            top: 0,
            '.common &': {
                borderTopColor: theme.palette.rarity.common
            },
            '.rare &': {
                borderTopColor: theme.palette.rarity.rare
            },
            '.mythical &': {
                borderTopColor: theme.palette.rarity.mythical
            },
            '.godlike &': {
                borderTopColor: theme.palette.rarity.godlike
            }
        },
        '& span': {
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
        }
    },
    gotchiKinshipIcon: {
        marginRight: 2
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowTitle: {
        marginRight: 8
    },
    altar: {
        background: alpha('#fff', .04),
        padding: 4,
        fontSize: 12,
        borderBottom: `4px solid ${theme.palette.secondary.dark}`,
        '&:first-of-type': {
            borderRadius: '4px 4px 0 0'
        },
        '&:last-of-type': {
            borderRadius: '0 0 4px 4px',
            borderBottom: 'none'
        },
        '&:hover $tokensList': {
            display: 'flex'
        }
    },
    tokensList: {
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    token: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 10,
        textShadow: `1px 1px 0 ${alpha('#000', .7)}`
    },
    tokenIcon: {
        marginRight: 2
    },
    totalPrice: {
        background: alpha('#000', .1),
        borderRadius: 4,
        padding: '1px 4px',
        color: 'orange'
    },
    placeholder: {
        borderRadius: 4
    },
    border: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: 'auto',
        '.rare &': {
            fill: theme.palette.rarity.rare
        },
        '.mythical &': {
            fill: theme.palette.rarity.mythical
        },
        '.godlike &': {
            fill: theme.palette.rarity.godlike
        }
    },
    borderLeft: {
        right: '100%',
        transform: 'scaleX(-1) translateX(-1px)'
    },
    borderRight: {
        left: '100%'
    }
}));
