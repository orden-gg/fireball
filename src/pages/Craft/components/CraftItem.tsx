import { useCallback, useContext, useEffect, useState } from 'react';

import classNames from 'classnames';

import { TokenTypes } from 'shared/constants';
import { Installation } from 'components/Items/Installation/Installation';
import { Tile } from 'components/Items/Tile.js/Tile';

import { CraftContext } from '../CraftContext';
import { TokensPricesContext } from 'contexts/TokensPricesContext';

import { itemStyles } from '../styles';

// TODO add types
export function CraftItem({ data }: { data: any }) {
    const classes = itemStyles();

    const [itemPrice, setItemPrice] = useState(0);
    const { selectedItem, setSelectedItem, setCategory, setIsItemSelected } = useContext<any>(CraftContext);
    const { tokensPrices, isPricesLoaded } = useContext<any>(TokensPricesContext)

    const handleItemClick = useCallback(() => {
        if (!data.deprecated) {
            const isSelected: boolean = selectedItem !== data;

            setCategory(data.category || 'installation');
            setIsItemSelected(isSelected);
            setSelectedItem(isSelected ? data : {});
        }
    }, [data]);

    const getItemPrice = useCallback(()  => {
        const tokens = Object.values(TokenTypes);

        return data.alchemicaCost.reduce((prev: number, current: number, index: number) => {
            return prev + current * tokensPrices[tokens[index]]
        }, 0);
    }, [isPricesLoaded]);

    useEffect(() => {
        if (isPricesLoaded) {
            const price = getItemPrice();

            setItemPrice(price !== 0 ? price.toFixed(2) : 0);
        }
    }, [isPricesLoaded]);

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
                <div className={classes.daiPrice}>{itemPrice}$</div>
            </div>
            {data.category === 'tile' ? <Tile tile={data} showPrice={true} /> : <Installation installation={data} showPrice={true} />}
        </div>
    );
}
