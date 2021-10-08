import React from 'react';
import { CircularProgress } from '@mui/material';
import useStyles from './styles';
import classNames from 'classnames';

const expFormula = (lvl) => {
    return lvl * lvl / 0.02;
};  // Based on https://wiki.aavegotchi.com/en/xp

export default function GotchiLevel({level, toNextLevel, experience, size}) {
    const classes = useStyles();
    const diff = expFormula(level) - expFormula(level-1);
    const percentageFormula = 100 - Math.floor(toNextLevel * 100 / diff);

    return (
        <div className={classes.gotchiLvl}>
            <CircularProgress variant='determinate' value={percentageFormula} size={size} />

            <div className={classes.gotchiLvlInner}>

                <p className={classes.gotchiLvlNumber}>
                    {level}
                </p>

                <div className={classNames(classes.gotchiLvlPopover, 'popover-core')}>
                    <p>
                        Summary {'=>'} {experience} XP
                    </p>
                    <p>
                        To level {+level + 1} {'=>'} {toNextLevel} XP
                    </p>
                </div>
            </div>
        </div>
    );
}