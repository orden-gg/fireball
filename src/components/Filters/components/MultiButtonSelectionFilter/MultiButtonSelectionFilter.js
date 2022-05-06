import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';

import classNames from 'classnames';

import styles from './styles';

export default function MultiButtonSelectionFilter({ option, onSetSelectedFilters }) {
    const classes = styles();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const selectedItems = option.items.filter(item => item.isSelected);

        setSelectedItems(selectedItemsCache => [...selectedItems, ...selectedItemsCache]);
    }, [option]);

    const onHandleSelectionChange = useCallback(item => {
        const selectedItemIndex = selectedItems.findIndex(selectedItem => selectedItem.value === item.value);

        if (selectedItemIndex !== -1) {
            selectedItems.splice(selectedItemIndex, 1);
        } else {
            selectedItems.push({ ...item, isSelected: true });
        }

        setSelectedItems([...selectedItems]);
        onSetSelectedFilters([option.key], {
            ...option,
            selectedValue: selectedItems
        });
    }, [option, onSetSelectedFilters, selectedItems]);

    const isItemSelected = useCallback(item => {
        const selectedItem = selectedItems.find(selItem => selItem.value === item.value);

        return Boolean(selectedItem) && selectedItem.isSelected;
    }, [selectedItems]);

    return (
        <div className={classes.wrapper}>
            <span className={classes.title}>{option.title}</span>
            <div className={classes.items}>
                {
                    option.items.map(item =>
                        <Button
                            className={classNames(classes.item, isItemSelected(item) ? 'selected' : '' )}
                            key={item.value}
                            variant='outlined'
                            size='small'
                            onClick={() => onHandleSelectionChange(item)}
                        >
                            {item.title}
                        </Button>
                )}
            </div>
        </div>
    );
}
