import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AutopetContext } from "../AutopetContextProvider";
import { tabStyles } from "../styles";
import PanelErrorText from "./PanelErrorText";

export default function GhstPanel({ index, dir }) {
    const classes = tabStyles();
    const { 
        ghstState, approveGhst,
        renderButtonNode,
        isGhstApproved,
        isStaked
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
                Please approve ghst contract for spend your ghst
            </Typography>
            <Typography className={classes.panelText}>
                You can disapprove ghst right after approval
            </Typography>
            <div className={classes.panelButtonGroup}>
                <Button
                    disabled={ghstState !== 'approve' || isStaked}
                    variant="contained"
                    fullWidth
                    size='large'
                    className={classes.panelButton}
                    onClick={ () => { approveGhst(!isGhstApproved) } }
                >
                    {renderButtonNode(
                        ghstState,
                        isGhstApproved ? 'Disapprove ghst' : 'Approve ghst'
                    )}
                </Button>
            </div>
            <PanelErrorText isShown={isStaked} children='Please unstake ghst before disapprove' />
        </div>
    )
}