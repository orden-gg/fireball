import { Erc1155Categories } from 'shared/constants';
import { CardImage, CardName, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { EthersApi } from 'api';

import { gotchiInventoryStyles } from './styles';
import { ItemUtils } from 'utils';

export function GotchiInventory({ items }: { items: any[] }) {
    const classes = gotchiInventoryStyles();

    return (
        <div className={classes.items}>
            {
                items.map((item: any) => {
                    const id: number = EthersApi.formatBigNumber(item.itemId);
                    const rarity: string = ItemUtils.getRarityNameById(item.itemId);

                    return <ItemCard type={rarity} key={id} className={classes.item}>
                        <CardImage
                            id={id}
                            category={Erc1155Categories.Wearable}
                        />
                        <CardName id={id} className={classes.name} />
                        <CardStats stats={ItemUtils.getTraitModifiersById(id)} />
                    </ItemCard>;
                })
            }
        </div>
    );
}
