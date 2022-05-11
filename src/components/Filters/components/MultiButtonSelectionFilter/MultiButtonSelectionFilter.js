import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';

import classNames from 'classnames';

import styles from './styles';

export default function MultiButtonSelectionFilter({ option, onSetSelectedFilters }) {
    const classes = styles();

    const [items, setItems] = useState([...option.items]);

    const onHandleSelectionChange = useCallback(index => {
        items[index].isSelected = !items[index].isSelected;

        setItems([...items]);
        onSetSelectedFilters([option.key], {
            ...option,
            selectedValue: items.filter(item => item.isSelected)
        });
    }, [option, onSetSelectedFilters, items]);

    return (
        <div className={classes.wrapper}>
            <span className={classes.title}>{option.title}</span>
            <div className={classes.items}>
                {
                    items.map((item, index) =>
                        <Button
                            className={classNames(classes.item, item.isSelected ? 'selected' : '' )}
                            key={item.value}
                            variant='outlined'
                            size='small'
                            onClick={() => onHandleSelectionChange(index)}
                        >
                            {item.title}
                        </Button>
                )}
            </div>
        </div>
    );
}
