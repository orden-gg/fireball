import { useContext } from 'react';

import classNames from 'classnames';

import Installation from 'components/Items/Installation/Installation';
import Tile from 'components/Items/Tile/Tile';

import { CraftContext } from '../CraftContext';

import { itemStyles } from '../styles';

export default function CraftItem({ data }) {
    const classes = itemStyles();
    const { selectedItem, setSelectedItem, setCategory } = useContext(CraftContext);

    const handleItemClick = () => {
        setCategory(data.category || 'installation');
        setSelectedItem(current =>  current !== data ? data : {});
    }

    return (
        <div
            className={
                classNames(
                    classes.craftItem,
                    'craft-item',
                    selectedItem === data && classes.selected
                )
            }
            onClick={handleItemClick}
        >
            {data.category === 'tile' ? <Tile tile={data} /> : <Installation installation={data} />}
        </div>
    )
}
