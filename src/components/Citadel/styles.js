import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    citadel: {
        position: 'fixed',
        left: 0,
        top: 70,
        right: 0,
        bottom: 70,

        '& canvas': {
            display: 'block'
        }
    },

    citadelInterface: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1)
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
    }

}));

export default styles;