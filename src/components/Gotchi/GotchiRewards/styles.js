import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    rankBox: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    rankStatus: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 8px',
        position: 'relative',
        bgcolor: alpha(theme.palette.secondary.dark, .5)
    },
    rankReward: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: 6
    },
    rankStatusText: {
        color: theme.palette.warning.main,
        fontSize: 14,
        fontWeight: 600
    },
    rankRewardAmount: {
        display:'inline-flex',
        alignItems:'center',
        justifyContent:'center',
        padding:'2px 2px 2px 8px',
        position:'relative',
        backgroundColor: alpha(theme.palette.primary.main, .2),
        fontSize: 12,
        textShadow: `1px 1px 0 ${alpha(theme.palette.secondary.main, .8)}`
    },
}));

export default styles;
