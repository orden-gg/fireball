import React from 'react';
import { CircularProgress, Tooltip } from '@mui/material';

import { CustomTooltipStyles } from '../styles';

import { styles } from './styles';

const expFormula = (lvl: number) => {
    return lvl * lvl / 0.02;
};  // Based on https://wiki.aavegotchi.com/en/xp

interface GotchiLevelProps {
    level: string;
    toNextLevel: string;
    experience: string;
}

export function GotchiLevel({ level, toNextLevel, experience }: GotchiLevelProps) {
    const classes = { ...styles(), ...CustomTooltipStyles() };

    const diff = expFormula(Number(level)) - expFormula(Number(level) - 1);
    const percentageFormula = 100 - Math.floor(Number(toNextLevel) * 100 / diff);

    return (
        <Tooltip
            title={
                <React.Fragment>
                    <p>[<span>{experience}</span> XP] lvl <span>{Number(level) + 1}</span> in <span>{toNextLevel}</span> XP</p>
                </React.Fragment>
            }
            classes={{ tooltip: classes.customTooltip }}
            enterTouchDelay={0}
            placement='top'
            followCursor
        >
            <div className={classes.gotchiLvl}>
                <CircularProgress className={classes.gotchiLvlProggress} variant='determinate' value={percentageFormula} size={24} />
                <div className={classes.gotchiLvlNumber}>{level}</div>
            </div>
        </Tooltip>
    );
}
