import { useCallback, useState } from 'react';
import { Button } from '@mui/material';

import classNames from 'classnames';

import styles from './styles';

export default function MultiButtonSelectionFilter({ option, onSetSelectedFilters }) {
    const classes = styles();

    const [items, setItems] = useState([...option.items]);

    const onHandleSelectionChange = useCallback(index => {
        items[index].isSelected = !items[index].isSelected;

        setItems([...items]);

        const selectedItems = items.filter(item => item.isSelected);

        onSetSelectedFilters(option.key, selectedItems);
    }, [option, onSetSelectedFilters, items]);

    return (
        <div className={classes.wrapper}>
            { option.title && (
                <span className={classes.title}>{option.title}</span>
            )}
            <div className={classes.items}>
                {
                    items.map((item, index) => (
                        <Button
                            className={classNames(classes.item, item.isSelected && 'selected' )}
                            key={item.value}
                            size='small'
                            onClick={() => onHandleSelectionChange(index)}
                        >
                            {item.title}
                        </Button>
                    ))
                }
            </div>
        </div>
    );
}
