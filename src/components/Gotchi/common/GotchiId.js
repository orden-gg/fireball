import React from 'react';

import { Tooltip } from '@mui/material';

import styles from '../styles';

export default function GotchiId({ gotchi, title }) {
    const classes = styles();

    return (
        <Tooltip
            title={`Haunt ${gotchi.hauntId}`}
            classes={{ tooltip: classes.customTooltip }}
            enterTouchDelay={0}
            placement='top'
            followCursor
        >
            <div className={classes.gotchiId}>
                {title || gotchi.id}
            </div>
        </Tooltip>
    );
}
