import { Alert, AlertTitle } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { headerStyles } from '../styles';


export default function AutopetHeader() {
    const classes = headerStyles();

    return (
        <div className={classes.autopetHeader}>
            <h1 className={classes.autopetTitle}>Autopet v1 - deprecated!</h1>

            <div className={classes.autopetLink}>
                <NavLink to='/autopet'>NEW VERSION HERE</NavLink>
            </div>

            {/* <div className={classes.autopetTerms}>
                <div className={classes.autopetTermsBox}>
                    <h3 className={classes.autopetTermsTitle}>How does it work?!</h3>
                    <Typography className={classes.autopetTermsText}>
                        This is an interface for a minimalistic proxy-contract allowing you to pet your gotchis in a trustless fashion with a bot maintained by the ordenGG guild
                    </Typography>
                    <Typography className={classes.autopetTermsText}>
                        The contract and UI you are using right now is fully open sourced (MIT), which means that any guild can setup it for their players! The bot / script for trustless transactions and petting timing will be released soon, right after we help a few guilds to setup it for themselves and produce the necessary documentation
                    </Typography>
                </div>

                <div className={classes.autopetTermsBox}>
                    <h3 className={classes.autopetTermsTitle}>Which autopet should I use?! </h3>
                    <Typography className={classes.autopetTermsText}>
                        In the Gotchiverse, petting delegation can be used as a form of <span className={classes.autopetTermsTextHighlight}>diplomatic gameplay</span> and coordination mechanic. By having a specific guild pet your Gotchis, you are paying a minor membership fee and demonstrating your loyalty to that guild.
                    </Typography>
                    <Typography className={classes.autopetTermsText}>
                        <span className={classes.autopetTermsTextHighlight}>OrdenGG</span>'s autopet address is <span className={classes.autopetTermsTextHighlight}>{OLD_AUTOPET_CONTRACT}</span> and the code is open and verified
                    </Typography>
                </div>
            </div> */}

            <Alert severity='error' className={classes.autopetHeaderWarning}>
                <AlertTitle>Please migrate to new autopet version!</AlertTitle>
                New version includes multiple petting bot operators (much less chance your gotchi wont be petted on time).<br />
                V1 autopet is still working but will be stopped 1st May!
            </Alert>
        </div>
    );
}
