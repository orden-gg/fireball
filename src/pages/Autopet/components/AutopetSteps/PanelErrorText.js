import { Typography } from "@mui/material";

import { tabStyles } from "../../styles";

export default function PanelErrorText({ children, isShown }) {
    const classes = tabStyles();

    return (
        isShown && (
            <Typography className={classes.panelError}>
                {children}
            </Typography>
        )
    )
}
