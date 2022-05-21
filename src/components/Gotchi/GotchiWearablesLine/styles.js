import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    gotchiWLineWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: '16px 0 4px',
        position: 'relative',
        '&:hover > div:not(:hover)': {
            opacity: .25
        }
    },
    gotchiWLineItem: {
        cursor: 'pointer',
        flexGrow: 1,
        flexBasis: 0,
        maxWidth: '100%',
        backgroundColor: alpha(theme.palette.common.white, .2),
        height: 9,
        position: 'relative',
        margin: '0 0.5px',
        transition: 'all .2s ease-in-out'
    },
    gotchiWTooltipTitle: {
        width: 150,
        height: 150,
        margin: '-4px -8px'
    },
    gotchiWTooltipName: {
        color: theme.palette.primary.main,
        marginRight: 4
    },
    gotchiLvl: {
        display: 'inline-flex',
        position: 'relative',
        backgroundColor: alpha(theme.palette.primary.main, .1),
        borderRadius: '50%',
    },
    gotchiSetName: {
        position: 'absolute',
        bottom: 10,
        right: 0,
        left: 0,
        pointerEvents: 'none',
        color: '#F7EC13',
        textTransform: 'uppercase',
        fontSize: 12
    },
}));

export default styles;
