import { CommonUtils } from 'utils';

import { raffleChanceStyles } from '../styles';

// TODO this component should be moved to shared
export function RaffleItemChance({ stats }: { stats: any }) {
    const classes = raffleChanceStyles();

    if (!stats.won && !stats.chance) {
        return <></>;
    }

    return (
        <div className={classes.container}>
            {
                stats.chance ? (
                    <div className={classes.itemChance}>
                        <span className={classes.label}>chance:</span>{CommonUtils.formatChance(stats.chance, stats.quantity)}
                    </div>
                ) : (
                    null
                )
            }

            {
                stats.won ? (
                    <div className={classes.itemWon}>
                        <span className={classes.label}>won:</span>{stats.won}
                    </div>
                ) : (
                    null
                )
            }
        </div>
    );
}
