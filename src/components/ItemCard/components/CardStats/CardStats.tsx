import classNames from 'classnames';

import { Erc1155Categories, TRAITS_KEYS } from 'shared/constants';
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
    const stats: any = isWearable ?
        ItemUtils.getTraitModifiersById(id) :
        ItemUtils.getDescriptionById(id);

    return (
        <p className={classNames(className, classes.stats)}>
            {
                isWearable ? (
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
