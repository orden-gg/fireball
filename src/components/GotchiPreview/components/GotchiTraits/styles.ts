import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    gotchiTraits: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        minHeight: 26,
        maxWidth: 550,
        fontSize: 14,
        margin: 'auto'
    },
    gotchiTrait: {
        backgroundColor: theme.palette.background.secondary,
        flexBasis: '48%',
        margin: '.5% 1%',
        padding: theme.spacing(.5),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: `1px solid ${alpha(theme.palette.common.white, .05)}`,
        '&:hover $defaultValue': {
            opacity: 1
        }
    },
    traitValue: {
        fontWeight: 600,
        margin: theme.spacing(0, 1),
        whiteSpace: 'nowrap'
    },
    defaultValue: {
        color: theme.palette.primary.main,
        fontWeight: 500,
        opacity: 0
    },
    tooltipInner: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      marignLeft: 'auto'
    },
    traitEffectName: {
        color: theme.palette.rarity.legendary,
        marginRight: theme.spacing(1)
    },
    effectsInfo: {
        color: alpha(theme.palette.common.white, .1)
    },
    definition: {
        margin: theme.spacing(1, 0)
    },
    increaseName: {
        color: theme.palette.rarity.godlike
    },
    decreaseName: {
        color: theme.palette.error.light
    },
    definitionInfo: {
        paddingLeft: theme.spacing(1.5)
    }
}));
