
import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    subtitle: {
        textAlign: 'center',
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 2,
            background: theme.palette.primary.main
        },
    },
    subtitleInner: {
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            width: 10,
            height: 10,
            transform: 'rotate(-45deg)',
            transformOrigin: '0',
            border: `2px solid ${theme.palette.primary.main}`,
        },
        '&::before': {
            borderTop: 'none',
            borderLeft: 'none',
            right: '100%'
        },
        '&::after': {
            borderBottom: 'none',
            borderRight: 'none',
            left: '100%'
        }
    },
    subtitleText: {
        display: 'inline-block',
        position: 'relative',
        padding: '4px 16px'
    }
}));

export default styles;