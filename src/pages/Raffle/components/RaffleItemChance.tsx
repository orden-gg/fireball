import commonUtils from 'utils/commonUtils';

import { raffleChanceStyles } from '../styles';

// TODO this component should be moved to shared
export function RaffleItemChance({ stats }: { stats: any }) {
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
