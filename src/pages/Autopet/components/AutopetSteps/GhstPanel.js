import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AutopetContext } from "../../AutopetContextProvider";
import { tabStyles } from "../../styles";
import PanelErrorText from "./PanelErrorText";

export default function GhstPanel({ index, dir }) {
    const classes = tabStyles();
    const { 
        ghstState, approveGhst,
        renderButtonNode,
        isGhstApproved,
        isStaked,
        isUserConnected
     } = useContext(AutopetContext);

    return (
        <div
            role="tabpanel"
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            dir={dir}
            className={classes.tabPanel}
        >
            <Typography className={classes.panelText}>
                This will allow pet contract to stake 100 GHST from your balance 
            </Typography>
            <Typography className={classes.panelText}>
                You can disapprove GHST allowance anytime
            </Typography>
            <div className={classes.panelButtonGroup}>
                <Button
                    disabled={ghstState !== 'approve' || isStaked || !isUserConnected}
                    variant="contained"
                    fullWidth
                    size='large'
                    className={classes.panelButton}
                    onClick={ () => { approveGhst(!isGhstApproved) } }
                >
                    {renderButtonNode(
                        ghstState,
                        isGhstApproved ? 'disapprove GHST' : 'approve GHST'
                    )}
                </Button>
            </div>
            <PanelErrorText isShown={isStaked} children='Please unstake ghst before disapprove' />
            <PanelErrorText isShown={!isUserConnected} children='Please connect wallet first' />
        </div>
    )
}