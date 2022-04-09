
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Divider } from '@mui/material';

import classNames from 'classnames';

import CustomToggleButtonGroup from 'components/custom/CustomToggleButtonGroup';
import commonUtils from 'utils/commonUtils';

import { LazySortingStyles } from './styles';

const directions = [
    {
        name: 'asc',
        key: 'asc',
        tooltip: 'from 🔸 to 🔶',
        icon: <ArrowDownwardIcon fontSize='small' />
    },
    {
        name: 'desc',
        key: 'desc',
        tooltip: 'from 🔶 to 🔸',
        icon: <ArrowUpwardIcon fontSize='small' />
    }
];

export default function LazySorting({ items, setItems, sortingList, setSorting, sortingDefaults, placeholder }) {
    const classes = LazySortingStyles();

    const [sorting, direction] = sortingDefaults;

    const onSortChange = (event, value) => {
        if (!value) {
            return;
        }

        setSorting([value, direction]);
        sortItems(value, direction);
    };

    const onDirectionChange = (event, value) => {
        if (!value) {
            return;
        }

        setSorting([sorting, value]);
        sortItems(sorting, value);
    };

    const sortItems = (filter, dir) => {
        const sorted = commonUtils.basicSort(items, filter, dir);

        setItems(sorted);
    };

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <CustomToggleButtonGroup
                    value={sorting}
                    onChange={(event, value) => onSortChange(event, value)}
                    aria-label='sorting'
                    list={sortingList}
                />

                <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />

                <CustomToggleButtonGroup
                    value={direction}
                    onChange={(event, value) => onDirectionChange(event, value)}
                    aria-label='sorting direction'
                    list={directions}
                />
            </div>

            {items.length > 0 && <div className={classNames(classes.inner, classes.results)}>
                <span>{items.length}</span>
                <span className={classes.placeholder}>{placeholder}</span>
            </div>}
        </div>
    )
}
