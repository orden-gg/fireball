import { useCallback, useContext, useEffect, useState } from 'react';

import classNames from 'classnames';

import { Installation } from 'components/Items/Installation/Installation';
import { Tile } from 'components/Items/Tile.js/Tile';

import { CraftContext } from '../CraftContext';

import { itemStyles } from '../styles';

// TODO add types
export function CraftItem({ data }: { data: any }) {
    const classes = itemStyles();

    const { selectedItem, setSelectedItem, setCategory, setIsItemSelected } = useContext<any>(CraftContext);

    const handleItemClick = useCallback(() => {
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
            <div className={classes.itemHeader}>
                <div className={classes.type}>{data.type}</div>
            </div>
            {data.category === 'tile' ? <Tile tile={data} showPrice={true} /> : <Installation installation={data} showPrice={true} />}
        </div>
    );
}
