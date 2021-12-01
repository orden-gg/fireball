import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    button: {
        position: 'fixed',
        right: 24,
        bottom: 12,
        zIndex: theme.zIndex.drawer + 3,
    }
}));

export default styles;