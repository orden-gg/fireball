import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GotchiUtils } from 'utils';

import { gotchiLevelStyles } from './styles';

interface GotchiLevelProps {
    level: number;
    experience: number;
    toNextLevel: number;
}

export function GotchiLevel({ experience, level, toNextLevel }: GotchiLevelProps) {
    const classes = gotchiLevelStyles();

    const xpProgress = GotchiUtils.getGotchiLevelPercentage(level, toNextLevel);
    const totalLevelXp: number = GotchiUtils.getLevelXpByLevel(level);

    return (
        <CustomTooltip
            title={
                <p>[<span>{experience}</span> XP] lvl <span>{Number(level) + 1}</span> in <span>{toNextLevel}</span> XP</p>
            }
            placement='top'
        >
            <div className={classes.level}>
                <div className={classes.levelProgress} style={{ width: `${xpProgress}%` }}></div>
                <p className={classes.xpAmount}>{totalLevelXp-toNextLevel}/{totalLevelXp}</p>
            </div>
        </CustomTooltip>
    );
}
