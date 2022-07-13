
import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    subtitle: {
        textAlign: 'center'
    },
    subtitleText: {
        // textShadow: `0 0 5px ${theme.palette.background.secondary}`,
        display: 'inline-block',
        position: 'relative',
        padding: '4px 16px',
        '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: 8,
            marginTop: -4,
            borderRadius: 5,
            backgroundColor: alpha(theme.palette.primary.main, .9),
            boxShadow: `0 0 30px 20px ${theme.palette.primary.main}`
        },
        '& span': {
            position: 'relative'
        }
    }
}));
