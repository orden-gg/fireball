import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    'page-wrapper': {
        paddingTop: 0
    },
    container: {
        position: 'relative',
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerLogo: {
        maxWidth: 400,
        maxHeight: 400
    },
    shopAddress: {
        marginTop: 24
    },
    backButton: {
        position: 'absolute',
        left: theme.spacing(3),
        top: theme.spacing(2),
        zIndex: 1,

        [theme.breakpoints.down('md')]: {
            left: theme.spacing(2),
            top: theme.spacing(1),
        },

        [theme.breakpoints.down('sm')]: {
            left: theme.spacing(1),
            top: theme.spacing(.5),
        },

        '& .MuiSvgIcon-root': {
            fontSize: 30,
            transition: 'translate .2s ease',

            [theme.breakpoints.down('sm')]: {
                fontSize: 24
            }
        },

        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
        gridAutoRows: '1fr',
    },
    listItem: {
        height: '100%'
    },
    loaderBox: {
        marginTop: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noListings: {
        marginTop: '1.5rem',
        textAlign: 'center',
        fontSize: '1rem'
    }
}));

export default styles;
