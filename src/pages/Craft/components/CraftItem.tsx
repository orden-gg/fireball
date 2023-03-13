import { useCallback, useContext } from 'react';

import classNames from 'classnames';

import { CardGroup, CardImage, CardName, CardSize, CardSlot } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { AlchemicaPrice } from 'components/Items/common/AlchemicaPrice/AlchemicaPrice';

import { CraftContext } from '../CraftContext';
import { itemStyles } from '../styles';

export function CraftItem({ item }: { item: CustomAny }) {
  const classes = itemStyles();

  const { selectedItem, setSelectedItem, setCategory, setIsItemSelected } = useContext<CustomAny>(CraftContext);

  const handleItemClick = useCallback((): void => {
    if (!item.deprecated) {
      const isSelected: boolean = selectedItem !== item;

      setCategory(item.category);
      setIsItemSelected(isSelected);
      setSelectedItem(isSelected ? item : {});
    }
  }, [item, selectedItem]);

  return (
    <div
      className={classNames(
        classes.craftItem,
        'craft-item',
        selectedItem === item && classes.selected,
        item.deprecated && classes.deprecated
      )}
      onClick={handleItemClick}
    >
      <ItemCard type='golden' id={item.id} category={item.category}>
        <CardGroup name='header'>
          <CardSlot>{item.type}</CardSlot>
          <CardSize>
            {item.width}x{item.height}
          </CardSize>
        </CardGroup>
        <CardGroup name='body'>
          <CardImage id={item.id} category={item.category} />
          <CardName className={classes.itemName}>{item.name}</CardName>
          <AlchemicaPrice alchemica={item.alchemicaCost} />
        </CardGroup>
      </ItemCard>
    </div>
  );
}
