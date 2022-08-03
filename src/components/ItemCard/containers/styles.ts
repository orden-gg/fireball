import { createStyles, makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';
import { alpha } from '@mui/system';

export const styles = makeStyles(theme => createStyles({
    card: {
        display: 'flex',
        '&.default': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.background.secondary
        },
        '&.common': {
            backgroundColor: alpha(theme.palette.rarity.common, .15),
            color: theme.palette.rarity.common
        },
        '&.uncommon': {
            backgroundColor: alpha(theme.palette.rarity.uncommon, .15),
            color: theme.palette.rarity.uncommon
        },
        '&.rare': {
            backgroundColor: alpha(theme.palette.rarity.rare, .15),
            color: theme.palette.rarity.rare
        },
        '&.legendary': {
            backgroundColor: alpha(theme.palette.rarity.legendary, .15),
            color: theme.palette.rarity.legendary
        },
        '&.mythical': {
            backgroundColor: alpha(theme.palette.rarity.mythical, .1),
            color: theme.palette.rarity.mythical
        },
        '&.godlike': {
            backgroundColor: alpha(theme.palette.rarity.godlike, .1),
            color: theme.palette.rarity.godlike
        },
        '&.drop': {
            backgroundColor: alpha(theme.palette.rarity.drop, .1),
            color: lighten(theme.palette.rarity.drop, .4)
        },
        '&.golden': {
            backgroundColor: alpha(theme.palette.rarity.golden, .15),
            color: theme.palette.rarity.golden
        },
        '&.partner': {
            backgroundColor: alpha(theme.palette.realm.partner, .15),
            color: theme.palette.realm.partner
        },
        '&.haunt1': {
            backgroundColor: alpha(theme.palette.haunts.h1, .15),
            color: lighten(theme.palette.haunts.h1, .2)
        },
        '&.haunt2': {
            backgroundColor: alpha(theme.palette.haunts.h2, .15),
            color: lighten(theme.palette.haunts.h2, .2)
        }
    },
    cardVertical: {
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 5,
        padding: theme.spacing(1),
        overflow: 'hidden'
    },
    cardHorizontal: {
        minHeight: 200,
        padding: theme.spacing(0, 1)
    }
}));
