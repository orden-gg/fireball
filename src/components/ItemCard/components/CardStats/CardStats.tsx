import classNames from 'classnames';

import { Erc1155Categories } from 'shared/constants';
import { ItemUtils } from 'utils';

import { styles } from './styles';

interface CardStatsProps {
    id: number;
    category: string;
    className?: string;
}

export function CardStats({ id, category, className }: CardStatsProps) {
    const classes = styles();

    const isWearable: boolean = category === Erc1155Categories.Wearable;
    const stats: string | Array<{name: string}> = isWearable ?
        ItemUtils.getWearableStatsById(id) :
        ItemUtils.getItemTypeById(id);

    return (
        <p className={classNames(className, classes.stats)}>
            {
                isWearable ? (
                    Object.entries(stats).map(([key, value]) => {
                        const Icon = ItemUtils.getTraitIconByKey(key.toLowerCase());

                        return <span className={classes.stat} key={key}>
                            <Icon width={20} height={20} />
                            {value}
                        </span>;
                    })
                ) : (
                    <span className={classes.stat}>{stats}</span>
                )
            }
        </p>
    );
}
