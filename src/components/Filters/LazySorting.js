
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Divider } from '@mui/material';

import CustomToggleButtonGroup from 'components/custom/CustomToggleButtonGroup';

import { LazySortingStyles } from './styles';

const directions = [
    {
        name: 'desc',
        key: 'desc',
        tooltip: 'from 🔶 to 🔸',
        icon: <ArrowDownwardIcon fontSize='small' />
    },
    {
        name: 'asc',
        key: 'asc',
        tooltip: 'from 🔸 to 🔶',
        icon: <ArrowUpwardIcon fontSize='small' />
    }
];

export default function LazySorting({ sortingList, setSorting, sortingDefaults, onSortingChanged }) {
    const classes = LazySortingStyles();

    const { type, dir } = sortingDefaults;

    const onSortChange = (event, sortProp, sortDir) => {
        if (!sortProp) {
            return;
        }

        setSorting({ type: sortProp, dir: sortDir });
        sortItems(sortProp, sortDir);
    };

    const onDirectionChange = (event, sortDir, sortProp) => {
        if (!sortDir) {
            return;
        }

        setSorting({ type: sortProp, dir: sortDir });
        sortItems(sortProp, sortDir);
    };

    const sortItems = (prop, dir) => {
        onSortingChanged(prop, dir);
    };

    return (
        <>
            <div className={classes.inner}>
                <CustomToggleButtonGroup
                    value={type}
                    onChange={(event, value) => onSortChange(event, value, dir)}
                    aria-label='sorting'
                    list={sortingList}
                />

                <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />

                <CustomToggleButtonGroup
                    value={dir}
                    onChange={(event, value) => onDirectionChange(event, value, type)}
                    aria-label='sorting direction'
                    list={directions}
                />
            </div>
        </>
    )
}
