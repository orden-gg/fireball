import classNames from 'classnames';

import { DEFAULT_WEAREBLE_IDS, Erc1155Categories, WEARABLE_SLOTS } from 'shared/constants';
import { CardImage } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemUtils } from 'utils';

import { gotchiWearableStyles } from './styles';

interface GotchiWearableProps {
    wearables: number[];
    slotId: number;
}

export function GotchiWearable({ wearables, slotId }: GotchiWearableProps) {
    const classes = gotchiWearableStyles();

    const name = WEARABLE_SLOTS[slotId];
    const id = wearables[slotId];
    const rarity = ItemUtils.getItemRarityById(id);

    return (
        <div className={classNames(classes.wearableCell, name.toLowerCase().replace(' ', '-'))}>
            {
                id !== 0 ? (
                    <ItemCard type={rarity} className={classes.wearable}>
                        <CardImage id={id} category={Erc1155Categories.Wearable} className={classes.image} />
                    </ItemCard>
                ) : (
                    <ItemCard type='default' className={classNames(classes.wearable, classes.placeholder)}>
                        <CardImage id={DEFAULT_WEAREBLE_IDS[slotId]} category={Erc1155Categories.Wearable} className={classes.image} />
                    </ItemCard>
                )
            }
        </div>
    );
}
