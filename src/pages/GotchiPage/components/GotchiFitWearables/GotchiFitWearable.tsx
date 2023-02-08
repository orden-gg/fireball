import { TraitModifiersTuple, Wearable } from 'shared/models';
import { Erc1155ItemUtils, ItemUtils } from 'utils';
import { ItemCard } from 'components/ItemCard/containers';
import { CardBalance, CardGroup, CardImage, CardListing, CardName, CardStats } from 'components/ItemCard/components';
import { Erc1155Categories } from 'shared/constants';

import { gotchiFitWearablesStyles } from './styles';
import { useContext, useEffect, useState } from 'react';
import { ClientContext } from 'contexts/ClientContext';
import { getActiveAddress } from 'core/store/login';
import { useAppSelector } from 'core/store/hooks';

interface GotchiFitWearablesProps {
  traits: TraitModifiersTuple;
}

interface FitWearable extends Wearable {
  balance?: number;
  holders?: number;
}

export function GotchiFitWearables({ traits }: GotchiFitWearablesProps) {
  const classes = gotchiFitWearablesStyles();
  const activeAddress = useAppSelector(getActiveAddress);

  const { warehouse, getInventory, getGotchis } = useContext<any>(ClientContext);

  const [filteredWearables, setFilteredWearables] = useState<FitWearable[]>([]);

  useEffect(() => {
    const availableWearables: FitWearable[] = Erc1155ItemUtils.getMappedWearables(Erc1155ItemUtils.getStaticWearables())
      .filter((wearable: FitWearable) =>
        ItemUtils.getIsTraitsModifiersFit(traits, Object.values(wearable.traitModifiers))
      )
      .sort(
        (wearableA: FitWearable, wearableB: FitWearable) =>
          Number(ItemUtils.getItemRarityId(wearableB.rarity)) - Number(ItemUtils.getItemRarityId(wearableA.rarity))
      );

    setFilteredWearables(availableWearables);
  }, [traits]);

  useEffect(() => {
    if (activeAddress) {
      getInventory(activeAddress);
      getGotchis(activeAddress);
    }
  }, [activeAddress]);

  useEffect(() => {
    if (warehouse.length > 0) {
      setFilteredWearables(
        filteredWearables.map((wearable: FitWearable) => {
          const inventoryWearable: FitWearable = warehouse.find((item: FitWearable) => {
            return item.id === wearable.id;
          });

          if (inventoryWearable) {
            wearable.balance = inventoryWearable.balance;
            wearable.holders = inventoryWearable.holders;
          }

          return wearable;
        })
      );
    }
  }, [warehouse]);

  return (
    <div className={classes.items}>
      {filteredWearables.map((wearable: any) => (
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
