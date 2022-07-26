import classNames from 'classnames';

import { Erc1155Categories, TRAITS_ICONS } from 'shared/constants';
import { ItemUtils } from 'utils';

import { statsStyles } from '../styles';

interface CardStatsProps {
    id: number;
    category: string;
    className?: string;
}

export function CardStats({ id, category, className }: CardStatsProps) {
    const classes = statsStyles();

    const isWearable: boolean = category === Erc1155Categories.Wearable;
    const stats: any = ItemUtils.getStatsById(id, category);

    return (
        <p className={classNames(className, classes.stats)}>
            {
                isWearable ? (
                    Object.entries(stats).map(([key, value]) => {
                        const Icon = TRAITS_ICONS[key.toLowerCase()];

                        return <span className={classes.stat}>
                            <Icon width={20} height={20} />
                            {value}
                        </span>
                    })
                ) : (
                    <span className={classes.stat}>{stats}</span>
                )
            }
        </p>
    );
}
