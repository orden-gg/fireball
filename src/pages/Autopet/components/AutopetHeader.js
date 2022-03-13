import { CircularProgress, Typography } from "@mui/material";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { AutopetContext } from "../AutopetContextProvider";
import { headerStyles } from "../styles";

export default function AutopetHeader() {
    const { tabs } = useContext(AutopetContext);
    const classes = headerStyles();
    const [ progress, setProgress ] = useState(0);

    useEffect( () => {
        const completeCount = tabs.reduce((sum, tab) => { return tab.done ? 1 + sum : sum }, 0);
        // Math.round(completeCount/tabs.length*100)
        setProgress(
            
            completeCount
        )
    }, [tabs]);

    return (
        <div className={classes.autopetHeader}>
            <h1 className={classes.autopetTitle}>PET PET PET</h1>

            <Typography className={classes.autopetComplete}>
                Complete: 
                <span className={classes.autopetCount}>
                    <span className={classes.autopetCountText}>{`${progress}/${tabs.length}`}</span>
                    <CircularProgress 
                        variant='determinate'
                        size={55}
                        className={classNames(classes.autopetProggress, classes.autopetProggressUnder)}
                        value={100}
                    />
                    <CircularProgress 
                        variant='determinate'
                        size={55}
                        className={classNames(classes.autopetProggress, classes.autopetProggressOver)}
                        value={Math.round(progress/tabs.length*100)}
                    />
                </span>
            </Typography>
        </div>
    )
}