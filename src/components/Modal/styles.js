import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '10px'
    },

    modal: {
        outline: 'none',
        margin: 'auto',
        position: 'relative',
        backgroundColor: theme.palette.background.secondary,
        borderRadius: 15,
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.secondary.light}`
    },

    close: {
        cursor: 'pointer',
        position: 'absolute',
        right: 0,
        top: 0
    }
}));

export default styles;
