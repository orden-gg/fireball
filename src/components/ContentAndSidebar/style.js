
import { makeStyles } from '@mui/styles';

const styles = makeStyles( theme => ({
    content: {
        textAlign: 'center',
        padding: 24,
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'flex-start'
        }
    },
    sidebar: {
        backgroundColor: 'black',
        marginBottom: 24,
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
            width: 300,
            marginRight: 24
        }
    },
    inner: {
        backgroundColor: 'gray',
        [theme.breakpoints.up('sm')]: {
            flexGrow: 1
        }
    }
}));

export default styles;
