import { Erc1155Categories } from 'shared/constants';
import { GotchiInventory as GotchiInventoryModel } from 'shared/models';

import { CardBalance, CardGroup, CardImage, CardName, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';

import { ItemUtils } from 'utils';

import { gotchiInventoryStyles } from './styles';

export function GotchiInventory({ items }: { items: GotchiInventoryModel[] }) {
  const classes = gotchiInventoryStyles();

  return (
    <div className={classes.items}>
      {items.map((item: GotchiInventoryModel) => {
        const rarity: string = ItemUtils.getRarityNameById(item.id);

        return (
          <ItemCard type={rarity} key={item.id} className={classes.item}>
            <CardGroup name='header'>
              <CardBalance balance={item.balance} />
            </CardGroup>
            <CardImage id={item.id} category={Erc1155Categories.Wearable} />
            <CardName id={item.id} className={classes.name} />
            <CardStats stats={ItemUtils.getTraitModifiersById(item.id)} />
          </ItemCard>
        );
      })}
    </div>
  );
}
