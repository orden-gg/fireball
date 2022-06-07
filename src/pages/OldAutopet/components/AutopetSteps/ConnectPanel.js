
import { useContext } from 'react';
import { Button, Typography } from '@mui/material';

import { AutopetContext } from '../../AutopetContextProvider';
import { tabStyles } from '../../styles';

export default function ConnectPanel({ index, dir }) {
    const classes = tabStyles();
    const {
        connectState,
        approveConnect,
        renderButtonNode,
        isUserConnected
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
                Please connect your wallet
            </Typography>
            <div className={classes.panelButtonGroup}>
                <Button
                    disabled={connectState !== 'approve' || isUserConnected}
                    variant='contained'
                    fullWidth
                    size='large'
                    className={classes.panelButton}
                    onClick={() => { approveConnect() }}
                >
                    {renderButtonNode(connectState, 'Connect wallet')}
                </Button>
            </div>
        </div>
    )
}
