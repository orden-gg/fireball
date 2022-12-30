import classNames from 'classnames';

import { TRAITS_KEYS } from 'shared/constants';
import { ItemUtils } from 'utils';

import { styles } from './styles';

interface CardStatsProps {
    stats: number[] | string;
    className?: string;
}

export function CardStats({ stats, className }: CardStatsProps) {
    const classes = styles();

    return (
        <p className={classNames(className, classes.stats)}>
            {
                // TODO: Temporary solution, should be reworked
                typeof stats === 'object' ? (
                    stats.map((value: number, index) => {
                        if (value !== 0) {
                            const key = TRAITS_KEYS[index];
                            const Icon = ItemUtils.getTraitIconByKey(key);

                            return <span className={classes.stat} key={index}>
                                <Icon width={20} height={20} />
                                {value > 0 && '+'}
                                {value}
                            </span>;
                        }
                    })
                ) : (
                    <span className={classes.stat}>{stats}</span>
                )
            }
        </p>
    );
}
