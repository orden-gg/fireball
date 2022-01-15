import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    citadel: {
        position: 'relative',

        '& canvas': {
            display: 'block'
        }
    },

    citadelInterface: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: 1
    },

    citadelInterfaceButton: {
        margin: theme.spacing(.2, 0),

        '&:hover': {
            color: theme.palette.primary.main
        }
    },

    citadelSearch: {
        display: 'flex',
        alignItems: 'center'
    },

    citadelSearchField: {
        width: 150,

        '& .MuiInput-input': {
            textAlign: 'right',
            fontSize: 14
        }
    },

    parcel: {
        position: 'absolute',
        minWidth: 220,
        maxWidth: 260,
        left: theme.spacing(2),
        bottom: theme.spacing(2),
        background: theme.palette.background.paper,
        // padding: theme.spacing(2)
    },

    closeParcel: {
        position: 'absolute',
        left: '100%',
        top: 0,
        marginLeft: theme.spacing(.5),
        width: 30,
        height: 30
    },

}));

export default styles;