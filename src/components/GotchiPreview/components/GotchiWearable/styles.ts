import { createStyles, makeStyles } from '@mui/styles';

export const gotchiWearableStyles = makeStyles(theme => createStyles({
    wearableCell: {
        position: 'relative',
        paddingBottom: '100%',
        backgroundColor: theme.palette.background.default,
        borderRadius: 5,
        '& + &': {
            marginTop: '10%'
        }
    },
    wearable: {
        border: `1px solid ${theme.palette.background.paper}`,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        padding: theme.spacing(.5)
    },
    image: {
        '$wearableCell &': {
            width: '75%',
            paddingBottom: '75%'
        },
        '.l-hand &': {
            transform: 'scaleX(-1)'
        }
    },
    placeholder: {
        boxShadow: `inset 0 0 20px 10px ${theme.palette.secondary.dark}`,
        '& $image': {
            filter: 'grayscale(1)',
            opacity: .15
        }
    }
}));
