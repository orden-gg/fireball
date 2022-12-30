import { createStyles, makeStyles } from '@mui/styles';

export const gotchiBadgesStyles = makeStyles(theme => createStyles({
    badges: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
        height: 36
    },
    badge: {
        position: 'relative',
        minWidth: 22,
        width: 22,
        borderRadius: 22,
        backgroundColor: theme.palette.primary.main,
        margin: theme.spacing(1, 0, 1, -1.3),
        transition: '.2s linear',
        '&:hover': {
            transform: `translateX(${theme.spacing(.5)})`
        },
        '&:last-of-type': {
            marginLeft: theme.spacing(.5),
            transform: 'none'
        }
    },
    badgeImage: {
        paddingBottom: '100%',
        width: '100%',
        margin: 0
    },
    name: {
        fontSize: 14,
        whiteSpace: 'normal'
    }
}));
