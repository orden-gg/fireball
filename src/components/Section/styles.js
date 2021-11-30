import { alpha } from "@mui/material";

const styles = theme => ({
    section: {
        padding: '50px 0',
        [theme.breakpoints.up('md')]: {
            padding: '75px 0'
        }
    }
});

export default styles;