import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export default makeStyles((theme) => ({
    sidebar: {
        alignContent: 'start',
        padding: 30
    },
    sidebarInner: {
        padding: 24,
        borderRadius: 8,
        background: theme.palette.background.paper
    },
    formControl: {
        width: '100%'
    },
    filterTitle: {
        fontSize: '.75rem',
        textTransform: 'uppercase',
        lineHeight: '1.375rem',
        letterSpacing: '1px'
    },
    filterWrap: {
        marginBottom: 16
    },
    applyButton: {
        borderRadius: 4,
        fontSize: '1rem',
        boxShadow: 'none',
        letterSpacing: '1px',
        background: alpha(theme.palette.customColors.lightGray, .24),
        '&:hover': {
            background: alpha(theme.palette.customColors.lightGray, .14),
        }
    },
    common: {
        color: theme.palette.rarity.common
    },
    uncommon: {
        color: theme.palette.rarity.uncommon
    },
    rare: {
        color: theme.palette.rarity.rare
    },
    legendary: {
        color: theme.palette.rarity.legendary
    },
    mythical: {
        color: theme.palette.rarity.mythical
    },
    godlike: {
        color: theme.palette.rarity.godlike
    }
}));