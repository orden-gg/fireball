import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    gotchiTraits: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        minHeight: 26,
        fontSize: 13
    },
    gotchiTrait: {
        flexBasis: '49%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2px 5px',

        minHeight: 26,
        '&.common': {
            backgroundColor: theme.palette.rarity.common
        },
        '&.uncommon': {
            backgroundColor: theme.palette.rarity.uncommon
        },
        '&.rare': {
            backgroundColor: theme.palette.rarity.rare
        },
        '&.legendary': {
            backgroundColor: theme.palette.rarity.legendary
        },
        '&.mythical': {
            backgroundColor: theme.palette.rarity.mythical
        },
        '&.godlike': {
            backgroundColor: theme.palette.rarity.godlike
        },
        '.vertical &': {
            margin: '1px 0',
        },
        '.horizontal &': {
            margin: theme.spacing(.5, 0),
        }
    },
    gotchiTraitIcon: {
        width: 22
    },
    mainVal: {
        fontWeight: 600,
        margin: 0,
        whiteSpace: 'nowrap'
    },
    defaultVal: {
        color: '#000',
        fontWeight: '500'
    }
}));

export default styles;
