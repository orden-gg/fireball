import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    content: {
        padding: '24px 24px 0',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'flex-start'
        }
    },
    sidebar: {
        padding: 24,
        borderRadius: 4,
        background: theme.palette.background.paper,
        marginBottom: 24,
        [theme.breakpoints.up('sm')]: {
            width: 300,
            flexShrink: 0,
            marginRight: 24,
            marginBottom: 0,
        }
    },
    inner: {
        background: theme.palette.background.paper,
        borderRadius: 4,
        [theme.breakpoints.up('sm')]: {
            flexGrow: 1
        }
    }
}));

const ContentInnerStyles = makeStyles(theme => ({
    content: {
        height: 'calc(100vh - 168px)',
        '&.loading': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
}));

export {
    styles as default,
    ContentInnerStyles
}
