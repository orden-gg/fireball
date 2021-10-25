import { makeStyles } from "@mui/styles";
import { alpha } from '@mui/system';

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: 24
    },
    backdrop: {
        zIndex: theme.zIndex.appBar - 1,
        color: '#fff'
    },
    textHighlight: {
        color: theme.palette.primary.main,
        marginLeft: 10
    },
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
        gridAutoRows: '1fr'
    },
    listItem: {
        height: '100%'
    },
    filtersButton: {
        padding: '0 !important',
        '&.Mui-selected': {
            backgroundColor: `${theme.palette.secondary.dark} !important`,
        }
    },
    filtersInner: {
        fontSize: 18,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '10px 12px',
        '& span': {
            width: 18
        }
    },
    rewardText: {
        display: 'inline-flex',
        alignItems: 'center',
        '& span.lighter': {
            color: theme.palette.primary.main
        }
    },
    calculateButton: {
        marginLeft: '16px !important',
        '&:not(.Mui-disabled)': {
            position: 'relative',
            boxShadow: `0 0 0 0 ${alpha(theme.palette.primary.main, .5)}`,
            animation: `$customPulse 1.5s infinite`,
            '&:hover': {
                animation: 'none'
            }
        }
    },
    '@keyframes customPulse': {
        '0%': {
            transform: 'scale(.9)'
        },
        '70%': {
            transform: 'scale(1)',
            boxShadow: `0 0 0 20px transparent`
        },
        '100%': {
            transform: 'scale(.9)',
            boxShadow: `0 0 0 0 transparent`
        }
    },
}));