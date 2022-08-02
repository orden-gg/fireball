import classNames from 'classnames';

import { Erc1155Categories } from 'shared/constants';
import { CardImage } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemUtils } from 'utils';

import { gotchiWearableStyles } from './styles';

interface GotchiWearableProps {
    id: number;
    slot: string;
}

export function GotchiWearable({ id, slot }: GotchiWearableProps) {
    const classes = gotchiWearableStyles();

    const rarity = ItemUtils.getItemRarityById(id);

    return (
        <div className={classNames(classes.wearableCell, slot.toLowerCase().replace(' ', '-'))}>
            {
                id !== 0 ? (
                    <ItemCard type={rarity} className={classes.wearable}>
                        <CardImage id={id} category={Erc1155Categories.Wearable} className={classes.image} />
                    </ItemCard>
                ) : (
                    <span>
                    </span>
                )
            }
        </div>
    );
}
