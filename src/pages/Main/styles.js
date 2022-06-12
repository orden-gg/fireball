import { makeStyles } from '@mui/styles';

const AboutStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
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
        backgroundColor: theme.palette.background.secondary,
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
            backgroundColor: 'currentColor'
        }
    },
    link: {
        color: 'inherit',

        '&:hover': {
            textDecoration: 'none'
        }
    }
}));

export default AboutStyles;
