import { useContext, useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';

import PanelErrorText from './PanelErrorText';
import { AutopetContext } from '../../AutopetContextProvider';
import { tabStyles } from '../../styles';

export default function StakePanel({ index, dir }) {
    const classes = tabStyles();
    const [availableStake, setAvailableStake] = useState(false);
    const {
        stakeState,
        approveStake,
        isStaked,
        renderButtonNode,
        isGhstApproved,
        isPetApproved
    } = useContext(AutopetContext);

    useEffect(() => {
        setAvailableStake(isGhstApproved && isPetApproved);
    }, [isGhstApproved, isPetApproved]);

    return (
        <div
            role='tabpanel'
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            dir={dir}
            className={classes.tabPanel}
        >
            <Typography className={classes.panelText}>
                Stake 100 GHST and autopetting will start within the next 15 mins!
            </Typography>
            <Typography className={classes.panelText}>
                You can unstake your GHST anytime
            </Typography>

            <div className={classes.panelButtonGroup}>
                <Button
                    disabled={stakeState === 'approving' || !availableStake}
                    variant='contained'
                    fullWidth
                    size='large'
                    className={classes.panelButton}
                    onClick={() => { approveStake(!isStaked) }}
                >
                    {renderButtonNode(stakeState, isStaked ? 'Unstake GHST' : 'Stake GHST')}
                </Button>
            </div>
            <PanelErrorText isShown={!availableStake} children='Please approve petting & GHST before staking' />
        </div>
    );
}
