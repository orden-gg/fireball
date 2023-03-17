import { useContext } from 'react';

import { Button, Typography } from '@mui/material';

import { AutopetContext } from '../../AutopetContextProvider';
import { tabStyles } from '../../styles';
import { PanelErrorText } from './PanelErrorText';
import { AutopetPanelProps } from './models/autopet-panel-props.model';

export function GhstPanel({ index, dir }: AutopetPanelProps) {
  const classes = tabStyles();

  const { ghstState, onApproveGhst, renderButtonNode, isGhstApproved, isStaked, isUserConnected } = useContext<any>(
    AutopetContext
  );

  return (
    <div
      role='tabpanel'
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      dir={dir}
      className={classes.tabPanel}
    >
      <Typography className={classes.panelText}>
        This will allow the petting contract to stake 100 GHST from your balance
      </Typography>
      <Typography className={classes.panelText}>You can revoke your GHST approval anytime</Typography>
      <div className={classes.panelButtonGroup}>
        <Button
          disabled={true}
          variant='contained'
          fullWidth
          size='large'
          className={classes.panelButton}
          onClick={() => {
            onApproveGhst(!isGhstApproved);
          }}
        >
          {renderButtonNode(ghstState, isGhstApproved ? 'revoke GHST approval' : 'approve GHST')}
        </Button>
      </div>
      <PanelErrorText isShown={isStaked} children='Please unstake GHST before revoking approval' />
      <PanelErrorText isShown={!isUserConnected} children='Please connect your wallet first' />
    </div>
  );
}
