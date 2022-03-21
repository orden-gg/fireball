import { useContext } from 'react';
import { Button, Typography } from '@mui/material';

import PanelErrorText from './PanelErrorText';
import { AutopetContext } from '../../AutopetContextProvider';
import { tabStyles } from '../../styles';

export default function PetPanel({ index, dir }) {
    const classes = tabStyles();
    const {
        petState,
        isPetApproved,
        approvePet,
        isStaked,
        isUserConnected,
        renderButtonNode
     } = useContext(AutopetContext);

    return (
        <div
            role='tabpanel'
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            dir={dir}
            className={classes.tabPanel}
        >
            <Typography className={classes.panelText}>
                Approve the contract to pet your Gotchi(s)
            </Typography>
            <Typography className={classes.panelText}>
                This is comepletely trustless, the contract can only pet your Gotchi(s) and nothing else
            </Typography>
            <Typography className={classes.panelText}>
                You can revoke the petting rights anytime
            </Typography>
            <div className={classes.panelButtonGroup}>
                <Button
                    disabled={petState !== 'approve' || isStaked || !isUserConnected}
                    variant='contained'
                    fullWidth
                    size='large'
                    className={classes.panelButton}
                    onClick={() => { approvePet(!isPetApproved) }}
                >
                    {renderButtonNode(
                        petState,
                        isPetApproved ? 'Revoke petting approval' : 'Approve petting'
                    )}
                </Button>
            </div>
            <PanelErrorText isShown={isStaked} children='Please unstake GHST before revoking approval' />
            <PanelErrorText isShown={!isUserConnected} children='Please connect your wallet first' />
        </div>
    )
}
