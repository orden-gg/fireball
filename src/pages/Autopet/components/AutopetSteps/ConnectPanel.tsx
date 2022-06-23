
import { useContext } from 'react';
import { Button, Typography } from '@mui/material';

import { AutopetContext } from '../../AutopetContextProvider';
import { tabStyles } from '../../styles';

import { AutopetPanelProps } from './models/autopet-panel-props.model';

export function ConnectPanel({ index, dir }: AutopetPanelProps) {
    const classes = tabStyles();

    const {
        connectState,
        approveConnect,
        renderButtonNode,
        isUserConnected
     } = useContext<any>(AutopetContext);

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
    );
}
