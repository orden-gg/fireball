import React from 'react';
import { CircularProgress, Tooltip } from '@mui/material';
import useStyles from './styles';
import { useTheme } from '@emotion/react';

const expFormula = (lvl) => {
    return lvl * lvl / 0.02;
};  // Based on https://wiki.aavegotchi.com/en/xp

export default function GotchiLevel({level, toNextLevel, experience, size}) {
    const classes = useStyles();
    const theme = useTheme()
    const diff = expFormula(level) - expFormula(level-1);
    const percentageFormula = 100 - Math.floor(toNextLevel * 100 / diff);

    return (
        <Tooltip
            title={
                <React.Fragment>
                    <div className={classes.gotchiLvlTooltip}>
                        <p>Summary {'=>'} <span>{experience}</span> XP</p>
                        <p>To level <span>{+level + 1}</span> {'=>'} <span>{toNextLevel}</span> XP</p>
                    </div>
                </React.Fragment>
            }
            classes={{ tooltip: classes.customTooltip }}
            enterTouchDelay={0}
            placement='top'
            followCursor
        >
            <div className={classes.gotchiLvl}>
                <CircularProgress variant='determinate' value={percentageFormula} size={size} />
                <div className={classes.gotchiLvlNumber}>{level}</div>
            </div>
        </Tooltip>
    );
}