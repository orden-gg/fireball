import { useEffect, useState } from 'react';

import { Erc1155Categories } from 'shared/constants';
import { FBErc1155Item, TraitModifiersTuple, Wearable } from 'shared/models';

import { CardBalance, CardGroup, CardImage, CardListing, CardName, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';

import { Erc1155ItemUtils, ItemUtils } from 'utils';

import { gotchiFitWearablesStyles } from './styles';

interface GotchiFitWearablesProps {
  traits: TraitModifiersTuple;
  wearables: FBErc1155Item[];
}

interface FitWearable extends Wearable {
  balance?: number;
  holders?: number;
}

export function GotchiFitWearables({ traits }: GotchiFitWearablesProps) {
  const classes = gotchiFitWearablesStyles();

  const [availableWearables, setAvailableWearables] = useState<FitWearable[]>([]);

  useEffect(() => {
    const availableWearables: FitWearable[] = Erc1155ItemUtils.getMappedWearables(Erc1155ItemUtils.getStaticWearables())
      .filter((wearable: FitWearable) =>
        ItemUtils.getIsTraitsModifiersFit(traits, Object.values(wearable.traitModifiers))
      )
      .sort(
        (wearableA: FitWearable, wearableB: FitWearable) =>
          Number(ItemUtils.getItemRarityId(wearableB.rarity)) - Number(ItemUtils.getItemRarityId(wearableA.rarity))
      );

    setAvailableWearables(availableWearables);
  }, [traits]);

  return (
    <div className={classes.items}>
      {availableWearables.map((wearable: CustomAny) => (
        <ItemCard
          id={wearable.id}
          category={wearable.category}
          type={wearable.rarity}
          key={wearable.id}
          className={classes.item}
        >
          <CardGroup name='header'>
            <CardBalance balance={wearable.balance || 0} holders={wearable.holders || 0} />
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
