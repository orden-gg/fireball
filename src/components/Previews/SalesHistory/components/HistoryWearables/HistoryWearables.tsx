import classNames from 'classnames';

import { Erc1155Categories } from 'shared/constants';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { ItemCard } from 'components/ItemCard/containers';
import { CardImage, CardName } from 'components/ItemCard/components';
import { ItemUtils } from 'utils';

import { historyWearablesStyles } from './styles';

interface HistoryWearablesProps {
    wearables: number[];
    className?: string;
}

export function HistoryWearables({ wearables, className }: HistoryWearablesProps) {
    const classes = historyWearablesStyles();

    const filtered = wearables.filter((id: number) => id !== 0);

    return <div className={classNames(classes.wearables, className)}>
        {filtered.length !== 0 ? (
            filtered.map((id: number, index: number) => {
                const rarity = ItemUtils.getItemRarityById(id);

                return (
                    <CustomTooltip
                        title={
                            <CardName id={id} />
                        }
                        placement='top'
                        followCursor
                        key={index}
                    >
                        <div>
                            <ItemCard type={rarity} className={classes.wearable}>
                                <CardImage className={classes.image} category={Erc1155Categories.Wearable} id={id} />
                            </ItemCard>
                        </div>
                    </CustomTooltip>
                );
            })
        ) : (
            <>No wearables</>
        )}
    </div>;
}
