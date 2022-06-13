import { makeStyles } from '@mui/styles';

const AboutStyles = makeStyles(theme => ({
    button: {
        width: 240,
        margin: 'auto',
        display: 'block'
    },
    modal: {
        maxWidth: 1000,
        padding: theme.spacing(3, 0)
    },
    container: {
        maxHeight: 400,
        overflow: 'auto',
        padding: theme.spacing(0, 2)
    },
    title: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        fontWeight: 700,
        marginBottom: theme.spacing(2)
    },
    text: {
        margin: theme.spacing(2, 0),
        lineHeight: 1.6,
        textAlign: 'center',
        padding: theme.spacing(0, 2)
    },
    subText: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(0, 2)
    },
    list: {
        backgroundColor: theme.palette.background.default,
        listStyle: 'none',
        padding: theme.spacing(2),
        margin: theme.spacing(1, 0)
    },
    listItem: {
        margin: theme.spacing(1, 0),
        position: 'relative',
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(4),
        lineHeight: 1.8,

        '&:before': {
            content: '""',
            position: 'absolute',
            left: 3,
            top: 9,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main
        }
    },
    link: {
        color: theme.palette.primary.main,

        '&:hover': {
            textDecoration: 'none'
        }
    }
}));

export default AboutStyles;
