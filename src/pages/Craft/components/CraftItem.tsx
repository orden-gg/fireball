import { useCallback, useContext } from 'react';

import classNames from 'classnames';

import { Erc1155Categories } from 'shared/constants';
import { CardGroup, CardImage, CardName, CardSlot, ItemCard } from 'components/ItemCard/components';
import { AlchemicaPrice } from 'components/Items/common/AlchemicaPrice/AlchemicaPrice';

import { CraftContext } from '../CraftContext';

import { itemStyles } from '../styles';

export function CraftItem({ data }: { data: any }) {
    const classes = itemStyles();

    const category: string = data.category === 'tile' ? Erc1155Categories.Tile : Erc1155Categories.Realm;

    const { selectedItem, setSelectedItem, setCategory, setIsItemSelected } = useContext<any>(CraftContext);

    const handleItemClick = useCallback((): void => {
        if (!data.deprecated) {
            const isSelected: boolean = selectedItem !== data;

            setCategory(data.category || 'installation');
            setIsItemSelected(isSelected);
            setSelectedItem(isSelected ? data : {});
        }
    }, [data]);

    return (
        <div
            className={
                classNames(
                    classes.craftItem,
                    'craft-item',
                    selectedItem === data && classes.selected,
                    data.deprecated && classes.deprecated
                )
            }
            onClick={handleItemClick}
        >
            <ItemCard type='golden' id={data.id} category={category}>
                <CardGroup name='body'>
                    <CardSlot>{data.type}</CardSlot>
                    <CardImage id={data.id} category={category} />
                    <CardName className={classes.itemName} id={data.id} />
                    <AlchemicaPrice alchemica={data.alchemicaCost} />
                </CardGroup>
            </ItemCard>
        </div>
    );
}
