import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    labelWrapper: {
        color: theme.palette.rarity.legendary,
        fontSize: 15,
        fontStyle: 'italic',
        fontWeight: 600,
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px,
                    ${theme.palette.secondary.main} -1px -1px 0px,
                    ${theme.palette.secondary.main} 1px -1px 0px,
                    ${theme.palette.secondary.main} -1px 1px 0px,
                    ${theme.palette.secondary.main} 1px 1px 0px`,

        '.narrowed &': {
            fontSize: 12
        }
    },
    label: {
        animation: '$shine 1s linear infinite alternate'
    },
    '@keyframes shine': {
        '0%': {
            color: theme.palette.rarity.legendary
        },
        '70%': {
            color: theme.palette.rarity.legendary
        },
        '100%': {
            color: '#ffffff'
        }
    }
}));
