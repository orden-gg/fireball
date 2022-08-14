import { createStyles, makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

export const gotchiLevelStyles = makeStyles(theme => createStyles({
    levelBar: {
        margin: '3% 0',
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
        textTransform: 'uppercase',
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
        left: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        fontWeight: 500,
        textShadow: `0 0 4px ${theme.palette.background.default}`
    }
}));
