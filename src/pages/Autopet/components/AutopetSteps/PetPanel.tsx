import { useContext } from 'react';

import { Button, Typography } from '@mui/material';

import { AutopetContext } from '../../AutopetContextProvider';
import { tabStyles } from '../../styles';
import { PanelErrorText } from './PanelErrorText';
import { AutopetPanelProps } from './models/autopet-panel-props.model';

export function PetPanel({ index, dir }: AutopetPanelProps) {
  const classes = tabStyles();

  const { petState, isPetApproved, approvePet, isStaked, isUserConnected, renderButtonNode } = useContext<any>(
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
      <Typography className={classes.panelText}>Approve the contract to pet your Gotchi(s)</Typography>
      <Typography className={classes.panelText}>
        This is comepletely trustless, the contract can only pet your Gotchi(s) and nothing else
      </Typography>
      <Typography className={classes.panelText}>You can revoke the petting rights anytime</Typography>
      <div className={classes.panelButtonGroup}>
        <Button
          disabled={true}
          variant='contained'
          fullWidth
          size='large'
          className={classes.panelButton}
          onClick={() => {
            approvePet(!isPetApproved);
          }}
        >
          {renderButtonNode(petState, isPetApproved ? 'Revoke petting approval' : 'Approve petting')}
        </Button>
      </div>
      <PanelErrorText isShown={isStaked} children='Please unstake GHST before revoking approval' />
      <PanelErrorText isShown={!isUserConnected} children='Please connect your wallet first' />
    </div>
  );
}
