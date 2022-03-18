import { CircularProgress } from "@mui/material";
import classNames from 'classnames';

import { infoStyles } from "../../styles";

export default function AutopetInfoCard({name, count, className}) {
    const classes = infoStyles();

    return (
        <div className={classNames(classes.autopetInfoCard, className || null)}>
            <span className={classes.autopetCardName}>{name}:</span>

            <span className={classes.autopetCardCount}>
                {count ? count : <CircularProgress color='inherit' />}
            </span>
        </div>
    )
}
