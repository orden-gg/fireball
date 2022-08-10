import { createStyles, makeStyles } from '@mui/styles';

export const gotchiViewStyles = makeStyles(theme => createStyles({
    gotchiView: {
        flexBasis: '45%',
        display: 'flex',
        alignItems: 'flex-end',
        paddingRight: theme.spacing(2),
        borderRight: `2px solid ${theme.palette.background.paper}`
    },
    gotchiCenter: {
        flex: 1,
        margin: '0 2.5% 5%'
    },
    centerHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(3)
    },
    rarity: {
        padding: theme.spacing(.5, 1),
        margin: 0
    },
    collateral: {
        width: 26,
        height: 26,
        '& img': {
            width: '100%'
        }
    },
    wearables: {
        width: '20%'
    }
}));
