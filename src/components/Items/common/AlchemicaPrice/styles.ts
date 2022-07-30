import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    alchemica: {
        display: 'flex',
        marginTop: 'auto',
        textAlign: 'center',
        width: '100%'
    },
    token: {
        flexBasis: '25%',
        marginTop: theme.spacing(1.5),
        position: 'relative'
    },
    tokenIcon: {
        display: 'block',
        margin: 'auto',
        position: 'absolute',
        top: -4,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: .5
    },
    amount: {
        position: 'relative',
        textShadow: '0 -2px 8px #000',
        color: theme.palette.common.white,
        fontWeight: 600
    },
    daiPrice: {
        textAlign: 'center',
        fontWeight: 500,
        color: theme.palette.common.white,
        fontSize: 12,
        '& span': {
            color: theme.palette.rarity.golden
        }
    }
}));
