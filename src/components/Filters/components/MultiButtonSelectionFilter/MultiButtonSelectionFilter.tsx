import { useCallback, useState } from 'react';
import { Button } from '@mui/material';

import classNames from 'classnames';

import { styles } from './styles';

interface MultiButtonSelectionFilterProps {
    filter: any;
    onSetSelectedFilters: (key: string, value: any[]) => void;
}

export function MultiButtonSelectionFilter({ filter, onSetSelectedFilters }: MultiButtonSelectionFilterProps) {
    const classes = styles();

    const [items, setItems] = useState<any[]>([...filter.items]);

    const onHandleSelectionChange = useCallback((index: number) => {
        items[index].isSelected = !items[index].isSelected;

        setItems([...items]);

        const selectedItems: any[] = items.filter(item => item.isSelected);

        onSetSelectedFilters(filter.key, selectedItems);
    }, [filter, onSetSelectedFilters, items]);

    return (
        <div className={classes.wrapper}>
            { filter.title && (
                <span className={classes.title}>{filter.title}</span>
            )}
            <div className={classes.items}>
                {
                    items.map((item: any, index: number) => (
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
