import { GotchiUtils } from 'utils';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { gotchiLevelStyles } from './styles';

interface GotchiLevelProps {
  level: number;
  experience: number;
  toNextLevel: number;
}

export function GotchiLevel({ experience, level, toNextLevel }: GotchiLevelProps) {
  const classes = gotchiLevelStyles();

  const xpProgress: number = GotchiUtils.getGotchiLevelPercentage(level, toNextLevel);
  const totalLevelXp: number = GotchiUtils.getLevelXpByLevel(level);

  return (
    <CustomTooltip
      title={
        <p>
          [<span>{experience}</span> XP] lvl <span>{Number(level) + 1}</span> in <span>{toNextLevel}</span> XP
        </p>
      }
      placement='top'
    >
      <div className={classes.levelBar}>
        <div className={classes.levelProgress} style={{ width: `${xpProgress}%` }}></div>
        <p className={classes.xpAmount}>{totalLevelXp - toNextLevel}xp</p>
        <span className={classes.level}>{level} lvl</span>
      </div>
    </CustomTooltip>
  );
}
