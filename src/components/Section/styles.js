import { alpha } from "@mui/material";

import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    section: {
        padding: '50px 0',
        [theme.breakpoints.up('md')]: {
            padding: '75px 0'
        }
    }
}));

export default styles;