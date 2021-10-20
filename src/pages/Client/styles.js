import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: '50px 24px',
        [theme.breakpoints.up('md')]: {
            padding: '50px 32px'
        }
    },
    backdrop: {
        zIndex: theme.zIndex.appBar - 1,
        color: '#fff'
    }
}));