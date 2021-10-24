import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export default makeStyles((theme) => ({
    item: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.dark,
        padding: '32px 12px 36px',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
        '&.common': {
            backgroundColor: alpha(theme.palette.rarity.common, .1)
        },
        '&.uncommon': {
            backgroundColor: alpha(theme.palette.rarity.uncommon, .1)
        },
        '&.rare': {
            backgroundColor: alpha(theme.palette.rarity.rare, .1)
        },
        '&.legendary': {
            backgroundColor: alpha(theme.palette.rarity.legendary, .1)
        },
        '&.mythical': {
            backgroundColor: alpha(theme.palette.rarity.mythical, .1)
        },
        '&.godlike': {
            backgroundColor: alpha(theme.palette.rarity.godlike, .1)
        },
        '&.drop': {
            backgroundColor: alpha(theme.palette.rarity.drop, .1)
        },
    },
    labels: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        '& div:last-child': {
            borderTopRightRadius: 4
        },
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        justifyContent: 'center',
        border: '3px solid transparent',
        '& h6': {
            fontWeight: '600 !important'
        },
    },
    labelTotal: {
        backgroundColor: theme.palette.primary.main,
        borderColor: alpha(theme.palette.secondary.dark, .5),
        padding: '0 2px',
        '&.baazarPrice': {
            backgroundColor: alpha(theme.palette.secondary.dark, .4),
            borderColor: 'transparent',
            color: `${theme.palette.text.primary} !important`,
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
            }
        },
    },
    labelBalance: {
        backgroundColor: alpha(theme.palette.secondary.dark, .8),
        minWidth: 34,
    },
    prices: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& div:last-child': {
            borderTopRightRadius: 4
        },
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        marginBottom: 4
    },
    icon: {
        width: '60%',
        maxHeight: '80px'
    },
    nameWrapper: {
        whiteSpace: 'nowrap',
        
        '& p': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        }
    },
    name: {
        fontWeight: '500 !important',
        lineHeight: '1.4 !important'
    },
    textHighlight: {
        '&.common': {
            color: theme.palette.rarity.common
        },
        '&.uncommon': {
            color: theme.palette.rarity.uncommon
        },
        '&.rare': {
            color: theme.palette.rarity.rare
        },
        '&.legendary': {
            color: theme.palette.rarity.legendary
        },
        '&.mythical': {
            color: theme.palette.rarity.mythical
        },
        '&.godlike': {
            color: theme.palette.rarity.godlike
        },
    },
}));
