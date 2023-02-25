import { Erc1155Categories } from 'shared/constants';
import { CardBalance, CardGroup, CardImage, CardName, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemUtils } from 'utils';

import { gotchiInventoryStyles } from './styles';

export function GotchiInventory({ items }: { items: number[] }) {
  const classes = gotchiInventoryStyles();

  return (
    <div className={classes.items}>
      {items.map((id: number, index: number) => {
        const rarity: string = ItemUtils.getRarityNameById(id);

        return (
          <ItemCard type={rarity} key={index} className={classes.item}>
            <CardGroup name='header'>
              <CardBalance balance={1} />
            </CardGroup>
            <CardImage id={id} category={Erc1155Categories.Wearable} />
            <CardName id={id} className={classes.name} />
            <CardStats stats={ItemUtils.getTraitModifiersById(id)} />
          </ItemCard>
        );
      })}
    </div>
  );
}
