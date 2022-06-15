import { createStyles, makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

export const styles = makeStyles(theme => createStyles({
    button: {
        background: alpha(theme.palette.rarity.mythical, .2),
        border: `2px solid ${alpha(theme.palette.rarity.rare, .5)}`,
        color: '#fff',
        borderRadius: 0,
        '&:hover': {
            borderColor: theme.palette.rarity.rare,
            background: theme.palette.rarity.mythical,
            color: '#000'
        }
    }
}));
