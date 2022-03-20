import React from 'react';

import { raffleChanceStyles } from '../styles';
import commonUtils from 'utils/commonUtils';

export default function RaffleItemChance({stats}) {
    const classes = raffleChanceStyles();

    return (
        <div className={classes.container}>
            {
                stats.chance ? (
                    <div>
                        chance: <span style={{ color: 'yellow' }}>
                            {commonUtils.formatChance(stats.chance, stats.quantity)}
                        </span>
                    </div>
                ) : (
                    null
                )
            }

            {
                stats.won ? (
                    <div style={{ marginLeft: '12px' }}>
                        won: <span style={{ color: '#1de91d' }}>{stats.won}</span>
                    </div>
                ) : (
                    null
                )
            }
        </div>
    );
}
