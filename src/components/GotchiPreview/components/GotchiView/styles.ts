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
        margin: '0 2.5% 0'
    },
    centerHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2)
    },
    rarity: {
        padding: theme.spacing(.5, 1),
        margin: 0,
        flex: 'none'
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
    },
    listings: {
        marginTop: theme.spacing(1)
    }
}));
