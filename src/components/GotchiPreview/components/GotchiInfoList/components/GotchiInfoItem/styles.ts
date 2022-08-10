import { createStyles, makeStyles } from '@mui/styles';

export const gotchiInfoItemStyles = makeStyles(theme => createStyles({
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.background.secondary,
        padding: theme.spacing(1),
        margin: '1.5% 1%',
        borderRadius: 3,
        fontSize: 16
    },
    infoLabel: {
        color: theme.palette.primary.main,
        marginRight: theme.spacing(.5)
    }
}));
