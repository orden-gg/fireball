import React from 'react';

import styles from './styles';

export default function GotchiRs({ gotchi }) {
    const classes = styles();

    return (
        <div className={classes.gotchiRsWrapper}>
            <span className={classes.modifiedRs}>{gotchi.modifiedRarityScore}</span>
            <span className={classes.baseRs}>({gotchi.baseRarityScore})</span>
            <span className={''}></span>
        </div>
    );
}
