import { createStyles, makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

export const gotchiLevelStyles = makeStyles(theme => createStyles({
    levelBar: {
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
        padding: '1%',
        fontWeight: 700,
        textShadow: `0 0 12px ${theme.palette.background.default}`
    },
    level: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        fontWeight: 500,
        textShadow: `0 0 4px ${theme.palette.background.default}`
    }
}));
