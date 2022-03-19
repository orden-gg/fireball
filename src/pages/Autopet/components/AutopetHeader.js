import { Alert, AlertTitle, Typography } from '@mui/material';

import { headerStyles } from '../styles';

export default function AutopetHeader() {
    const classes = headerStyles();

    return (
        <div className={classes.autopetHeader}>
            <h1 className={classes.autopetTitle}>Trustless Autopet</h1>

            <div className={classes.autopetTerms}>
                <div className={classes.autopetTermsBox}>
                    <h3 className={classes.autopetTermsTitle}>How it works?!</h3>
                    <Typography className={classes.autopetTermsText}>
                        this is iterface for a minimalistic  proxy-(contract) allowing you to pet your gotchis in trustless way with a bot runned by ordenGG guild
                    </Typography>
                    <Typography className={classes.autopetTermsText}>
                        the (contract) and (ux) you browsing now is fully open sourced (MIT) meaning any guild can setup it for themself! the (bot) script for trustless transactions and petting timing will be released soon after we will help a few guilds to setup it for themself and produce the necceserry documentation
                    </Typography>
                </div>

                <div className={classes.autopetTermsBox}>
                    <h3 className={classes.autopetTermsTitle}>Which autopet to use?! </h3>
                    <Typography className={classes.autopetTermsText}>
                        In gotchiverse, petting delegation can be used as a form of <span className={classes.autopetTermsTextHighlight}>diplomatic gameplay</span> and coordination mechanics. By petting with guild you paying minor membership fee and claiming your aavegotchi loyalty
                    </Typography>
                    {/* gm, add change credentials to your guild */}
                    <Typography className={classes.autopetTermsText}>
                        <span className={classes.autopetTermsTextHighlight}>ordenGG</span> autopet adress is <span className={classes.autopetTermsTextHighlight}>0x715FB0175ebCa2802855D8AdCc93fd913EF60E93</span> and the code is 
                        <span className={classes.autopetTermsTextHighlight}> open and verified o exlorer</span>
                    </Typography>
                </div>
            </div>

            <Alert severity='warning' className={classes.autopetHeaderWarning}> 
                <AlertTitle>ASSETS SECURITY WARNING!</AlertTitle>
                make sure to verify URL and contract address before interacting with any similar interface
            </Alert>
        </div>
    )
}
