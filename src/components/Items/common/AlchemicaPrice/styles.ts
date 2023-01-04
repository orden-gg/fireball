import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
    createStyles({
        alchemicaWrapper: {
            width: '100%'
        },
        alchemica: {
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: 'auto',
            textAlign: 'center',
            width: '100%'
        },
        token: {
            flexGrow: 1,
            marginTop: theme.spacing(1.5),
            position: 'relative',
            padding: '0 4px'
        },
        tokenIcon: {
            display: 'block',
            margin: 'auto',
            position: 'absolute',
            top: -4,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.7
        },
        amount: {
            position: 'relative',
            textShadow: '0 -2px 8px #000',
            color: theme.palette.common.white,
            fontWeight: 600
        },
        totalPrice: {
            textAlign: 'center',
            fontWeight: 500,
            color: theme.palette.rarity.golden,
            fontSize: 14,
            marginTop: 2,
            minHeight: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& span': {
                color: theme.palette.common.white,
                margin: '0 10px'
            },
            '& img': {
                marginLeft: 4
            }
        },
        placeholder: {
            display: 'block',
            margin: '2px auto 0',
            width: 120,
            height: 22,
            borderRadius: 4,
            opacity: 0.4
        }
    })
);
