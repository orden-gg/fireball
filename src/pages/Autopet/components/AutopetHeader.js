import { Alert, AlertTitle, Typography } from "@mui/material";

import { headerStyles } from "../styles";

export default function AutopetHeader() {
    const classes = headerStyles();

    return (
        <div className={classes.autopetHeader}>
            <h1 className={classes.autopetTitle}>Trustless Autopet</h1>

            <div className={classes.autopetTerms}>
                <div className={classes.autopetTermsBox}>
                    <h3 className={classes.autopetTermsTitle}>How it works?!</h3>
                    <Typography className={classes.autopetTermsText}>
                        Minimalistic proxy-contract allowing you to pet your gotchis in trustless way.
                    </Typography>
                    <Typography className={classes.autopetTermsText}>
                        Contract adress 0x715FB0175ebCa2802855D8AdCc93fd913EF60E93 and the code is 
                        <span className={classes.autopetTermsTextHighlight}> verified</span>
                    </Typography>
                    <Typography className={classes.autopetTermsText}>
                        This contract is fully open sourced, meaning any guild can setup it for themself!
                    </Typography>
                </div>

                <div className={classes.autopetTermsBox}>
                    <h3 className={classes.autopetTermsTitle}>Which autopet to use?! </h3>
                    <Typography className={classes.autopetTermsText}>
                        In gotchiverse petting delegation can be used for diplomatic gameplay. Can be or nutural service (petting fees are equal to roughly 50 (?) GHST locked) to form up a guild, or form of support or endorcment.
                    </Typography>
                </div>
            </div>

            <Alert severity="warning" className={classes.autopetHeaderWarning}> 
                <AlertTitle>ASSETS SECURITY WARNING!</AlertTitle>
                make sure to verify URL and contract address before interacting with any similar interface
            </Alert>
        </div>
    )
}
