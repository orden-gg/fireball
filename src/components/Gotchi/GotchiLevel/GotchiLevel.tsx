import React from 'react';

import { CircularProgress } from '@mui/material';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { GotchiUtils } from 'utils';

import { styles } from './styles';

interface GotchiLevelProps {
  level: string;
  toNextLevel: string;
  experience: string;
}

export function GotchiLevel({ level, toNextLevel, experience }: GotchiLevelProps) {
  const classes = styles();

  const percentageFormula: number = GotchiUtils.getGotchiLevelPercentage(Number(level), Number(toNextLevel));

  return (
    <CustomTooltip
      title={
        <React.Fragment>
          <p>
            [<span>{experience}</span> XP] lvl <span>{Number(level) + 1}</span> in <span>{toNextLevel}</span> XP
          </p>
        </React.Fragment>
      }
      enterTouchDelay={0}
      placement='top'
      followCursor
    >
      <div className={classes.gotchiLvl}>
        <CircularProgress
          className={classes.gotchiLvlProggress}
          variant='determinate'
          value={percentageFormula}
          size={24}
        />
        <div className={classes.gotchiLvlNumber}>{level}</div>
      </div>
    </CustomTooltip>
  );
}
