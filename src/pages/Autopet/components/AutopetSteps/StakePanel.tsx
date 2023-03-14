import { useContext, useEffect, useState } from 'react';

import { Button, Typography } from '@mui/material';

import { AutopetContext } from '../../AutopetContextProvider';
import { tabStyles } from '../../styles';
import { PanelErrorText } from './PanelErrorText';
import { AutopetPanelProps } from './models/autopet-panel-props.model';

export function StakePanel({ index, dir }: AutopetPanelProps) {
  const classes = tabStyles();

  const [availableStake, setAvailableStake] = useState<boolean>(false);
  const { stakeState, approveStake, isStaked, renderButtonNode, isGhstApproved, isPetApproved } =
    useContext<CustomAny>(AutopetContext);

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
      <Typography className={classes.panelText}>You can unstake your GHST anytime</Typography>

      <div className={classes.panelButtonGroup}>
        <Button
          disabled={!isStaked}
          variant='contained'
          fullWidth
          size='large'
          className={classes.panelButton}
          onClick={() => {
            approveStake(!isStaked);
          }}
        >
          {renderButtonNode(stakeState, isStaked ? 'Unstake GHST' : 'Stake GHST')}
        </Button>
      </div>
      <PanelErrorText isShown={!availableStake} children='Please approve petting & GHST before staking' />
    </div>
  );
}
