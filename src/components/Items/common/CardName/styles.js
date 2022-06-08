import { alpha } from '@mui/system';
import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
    nameWrapper: {
        whiteSpace: 'nowrap',
        position: 'relative',
        '.installation &, .tile &': {
            whiteSpace: 'normal'
        },
        '& p': {
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        },
        '&.two-lined': {
            backgroundColor: alpha(theme.palette.secondary.dark, .25),
            margin: '20px 0 0',
            padding: 4,
            borderRadius: 2,
            whiteSpace: 'inherit',
            minHeight: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .2s ease-in-out',
            '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.dark, .5)
            }
        }
    },
    name: {
        fontWeight: '500',
        lineHeight: '1.4',
        textTransform: 'capitalize',
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px',
                    ${theme.palette.secondary.main} -1px -1px 0px',
                    ${theme.palette.secondary.main} 1px -1px 0px',
                    ${theme.palette.secondary.main} -1px 1px 0px',
                    ${theme.palette.secondary.main} 1px 1px 0px`,

        '.tooltip-wearable &': { // name
            fontSize: 14
        }
    },
    textHighlight: {
        '&.common': {
            color: theme.palette.rarity.common
        },
        '&.uncommon': {
            color: theme.palette.rarity.uncommon
        },
        '&.rare': {
            color: theme.palette.rarity.rare
        },
        '&.legendary': {
            color: theme.palette.rarity.legendary
        },
        '&.mythical': {
            color: theme.palette.rarity.mythical
        },
        '&.godlike': {
            color: theme.palette.rarity.godlike
        },
        '&.drop': {
            color: theme.palette.customColors.lightGray
        },
        '&.humble': {
            color: theme.palette.realm.humble
        },
        '&.reasonable': {
            color: theme.palette.realm.reasonable
        },
        '&.spacious': {
            color: theme.palette.realm.spacious
        },
        '&.golden': {
            color: theme.palette.rarity.golden
        },
        '&.partner': {
            color: theme.palette.realm.partner
        }
    }
}));
