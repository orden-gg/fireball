import { useEffect, useState } from 'react';

import { Erc1155Categories } from 'shared/constants';
import { FireballErc1155Item, TraitModifiersTuple, Wearable } from 'shared/models';

import { CardBalance, CardGroup, CardImage, CardListing, CardName, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';

import { Erc1155ItemUtils, ItemUtils } from 'utils';

import { gotchiFitWearablesStyles } from './styles';

interface GotchiFitWearablesProps {
  traits: TraitModifiersTuple;
  inventory: FireballErc1155Item[];
}

export function GotchiFitWearables({ traits, inventory }: GotchiFitWearablesProps) {
  const classes = gotchiFitWearablesStyles();

  const [availableWearables, setAvailableWearables] = useState<Wearable[]>([]);

  useEffect(() => {
    const filteredWearables: Wearable[] = Erc1155ItemUtils.getMappedWearables(Erc1155ItemUtils.getStaticWearables())
      .filter((wearable: Wearable) => ItemUtils.getIsTraitsModifiersFit(traits, Object.values(wearable.traitModifiers)))
      .sort(
        (wearableA: Wearable, wearableB: Wearable) =>
          Number(ItemUtils.getItemRarityId(wearableB.rarity)) - Number(ItemUtils.getItemRarityId(wearableA.rarity))
      );

    setAvailableWearables(
      filteredWearables.map((wearable: Wearable) => {
        const inventoryWearable: FireballErc1155Item | undefined = inventory.find(
          (item: FireballErc1155Item) => item.tokenId === wearable.id
        );

        if (inventoryWearable) {
          wearable.balance = inventoryWearable.amount + inventoryWearable.equipped;
        } else {
          wearable.balance = 0;
        }

        return wearable;
      })
    );
  }, [traits, inventory]);

  return (
    <div className={classes.items}>
      {availableWearables.map((wearable: Wearable) => (
        <ItemCard
          id={wearable.id}
          category={wearable.category}
          type={wearable.rarity}
          key={wearable.id}
          className={classes.item}
        >
          <CardGroup name='header'>
            <CardBalance balance={wearable.balance || 0} />
          </CardGroup>
          <CardGroup name='body'>
            <CardImage id={wearable.id} category={Erc1155Categories.Wearable} />
            <CardName id={wearable.id} className={classes.name} />
            <CardStats stats={ItemUtils.getTraitModifiersById(wearable.id)} />
          </CardGroup>
          <CardGroup name='footer'>
            <CardListing />
          </CardGroup>
        </ItemCard>
      ))}
    </div>
  );
}
