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
        const completeCount = Object.keys(tabs).reduce(
            (sum, key) => tabs[key].done ? 1 + sum : sum, 0
        );

        setProgress(completeCount)

    }, [tabs]);

    return (
        <div className={classes.autopetHeader}>
            <h1 className={classes.autopetTitle}>Trustless Autopet</h1>

            <Typography className={classes.panelText}>
                <h3>How it works?!</h3>
                Minimalistic proxy-contract allowing you to pet your gotchis in trustless way. <br/>
                Contract adress 0x715FB0175ebCa2802855D8AdCc93fd913EF60E93 and the code is <a href=''>verified</a> <br/>
                This contract is fully open sourced, meaning any guild can setup it for themself!
            </Typography>

            <Typography className={classes.panelText}>
                <h3>ASSETS SECURITY WARNING!</h3> 
                <b>make sure to verify URL and contract address before interacting with any similar interface</b> <br/>
            </Typography>

            <Typography className={classes.panelText}>
                <h3>Which autopet to use?! </h3>
                in gotchiverse petting delegation can be used for diplomatic gameplay. Can be or nutural service (petting fees are equal to roughly 50 (?) GHST locked) to form up a guild, or form of support or endorcment.
            </Typography>

            <Typography className={classes.autopetComplete}>
                Status: 
                <span className={classes.autopetCount}>
                    <span className={classes.autopetCountText}>{`${progress}/${Object.keys(tabs).length}`}</span>
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
                        value={Math.round(progress/Object.keys(tabs).length*100)}
                    />
                </span>
            </Typography>
        </div>
    )
}