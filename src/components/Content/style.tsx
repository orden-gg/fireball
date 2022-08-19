import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    content: {
        padding: '64px 24px 0',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'flex-start'
        }
    },
    sidebar: {
        borderRadius: 4,
        background: theme.palette.background.paper,
        marginBottom: 24,
        [theme.breakpoints.up('sm')]: {
            width: 300,
            flexShrink: 0,
            marginLeft: 24,
            marginBottom: 0
        }
    },
    inner: {
        background: theme.palette.background.paper,
        borderRadius: 4,
        minHeight: '100%',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            flexGrow: 1,
            alignSelf: 'stretch'
        }
    }
}));

export const ContentInnerStyles = makeStyles(theme => ({
    content: {
        background: theme.palette.background.paper,
        borderRadius: 4,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&.loading': {
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
}));
