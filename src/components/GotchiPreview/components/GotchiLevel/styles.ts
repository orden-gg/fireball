import { createStyles, makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

export const gotchiLevelStyles = makeStyles(theme => createStyles({
    level: {
        marginTop: theme.spacing(1),
        position: 'relative',
        backgroundColor: alpha(theme.palette.rarity.mythical, .2)
    },
    levelProgress: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: theme.palette.rarity.mythical
    },
    xpAmount: {
        textAlign: 'center',
        position: 'relative',
        margin: 0,
        padding: '2%',
        fontWeight: 700
    }
}));
