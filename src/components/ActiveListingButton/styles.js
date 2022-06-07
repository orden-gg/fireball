import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

const styles = makeStyles(theme => ({
    button: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.5,
        background: alpha(theme.palette.rarity.rare, .2),
        border: `3px solid ${alpha(theme.palette.rarity.rare, .5)}`,
        color: '#fff',
        borderRadius: 0,
        '&:hover': {
            borderColor: theme.palette.rarity.rare,
            background: theme.palette.rarity.mythical,
            color: '#000'
        },
        '& img': {
            marginLeft: 4
        }
    }
}));

export default styles;
