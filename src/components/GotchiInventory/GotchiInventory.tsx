import { Erc1155Categories } from 'shared/constants';
import { CardImage, CardName } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { EthersApi } from 'api';

import { gotchiInventoryStyles } from './styles';

export function GotchiInventory({ items }: { items: any[] }) {
    const classes = gotchiInventoryStyles();

    return (
        <div className={classes.items}>
            {
                items.map((badge: any) => {
                    const id: number = EthersApi.formatBigNumber(badge.itemId);

                    return <ItemCard type='badge' key={id} className={classes.item}>
                        <CardImage
                            id={id}
                            category={Erc1155Categories.Wearable}
                        />
                        <CardName id={id} className={classes.name} />
                    </ItemCard>;
                })
            }
        </div>
    );
}
