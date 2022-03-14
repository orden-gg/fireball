import { Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AutopetContext } from "../../AutopetContextProvider";
import { tabStyles } from "../../styles";
import PanelErrorText from "./PanelErrorText";

export default function StakePanel({ index, dir }) {
    const classes = tabStyles();
    const { 
        stakeState, approveStake,
        isStaked,
        renderButtonNode,
        isGhstApproved, isPetApproved
    } = useContext(AutopetContext);
    const [ availableStake, setAvailableStake ] = useState(false);


    useEffect( () => {
        setAvailableStake(isGhstApproved && isPetApproved);
    }, [isGhstApproved, isPetApproved]);

    return (
        <div
            role="tabpanel"
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            dir={dir}
            className={classes.tabPanel}
        >
            <Typography className={classes.panelText}>
                Please Stake 100 ghst for autopet your gotchi(s)
            </Typography>
            <Typography className={classes.panelText}>
                You can unstake ghst right after approval
            </Typography>
            <div className={classes.panelButtonGroup}>

                <Button
                    disabled={stakeState === 'approving' || !availableStake}
                    variant="contained"
                    fullWidth
                    size='large'
                    className={classes.panelButton}
                    onClick={ () => { approveStake(!isStaked) }}
                >
                    {renderButtonNode(stakeState, isStaked ? 'Unstake GHST' : 'Stake GHST')}
                </Button>
            </div>
            <PanelErrorText isShown={!availableStake} children='Please approve pet & ghst before stake' />
        </div>
    )
}