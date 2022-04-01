import React from 'react';
import { CircularProgress, Tooltip } from '@mui/material';

import styles from './styles';
import { CustomTooltipStyles } from '../styles';

const expFormula = (lvl) => {
    return lvl * lvl / 0.02;
};  // Based on https://wiki.aavegotchi.com/en/xp

export default function GotchiLevel({ level, toNextLevel, experience }) {
    const classes = {
        ...styles(),
        ...CustomTooltipStyles()
    };
    const diff = expFormula(level) - expFormula(level-1);
    const percentageFormula = 100 - Math.floor(toNextLevel * 100 / diff);

    return (
        <Tooltip
            title={
                <React.Fragment>
                    <p>[<span>{experience}</span> XP] lvl <span>{+level + 1}</span> in <span>{toNextLevel}</span> XP</p>
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
