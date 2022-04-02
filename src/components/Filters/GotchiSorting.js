
import React, { useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Divider } from '@mui/material';

import classNames from 'classnames';

import CustomToggleButtonGroup from 'components/custom/CustomToggleButtonGroup';
import commonUtils from 'utils/commonUtils';
import gotchiPlaceholder from 'assets/images/gotchi-placeholder.svg';

import { GotchiSortingStyles } from './styles';

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

export default function GotchiSorting({ gotchis, setGotchis, sortings, defaultSorting }) {
    const classes = GotchiSortingStyles();
    const [sorting, setSorting] = useState(defaultSorting);
    const [direction, setDirection] = useState('desc');

    const onSortChange = (event, value) => {
        if (!value) return;

        setSorting(value);
        sortGotchis(value, direction);
    };

    const onDirectionChange = (event, value) => {
        if (!value) return;

        setDirection(value);
        sortGotchis(sorting, value);
    };

    const sortGotchis = (filter, dir) => {
        const sorted = commonUtils.basicSort(gotchis, filter, dir);

        setGotchis(sorted);
    };

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <CustomToggleButtonGroup
                    value={sorting}
                    onChange={(event, value) => onSortChange(event, value)}
                    aria-label='sorting'
                    list={sortings}
                />

                <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />

                <CustomToggleButtonGroup
                    value={direction}
                    onChange={(event, value) => onDirectionChange(event, value)}
                    aria-label='sorting direction'
                    list={directions}
                />
            </div>

            {gotchis.length > 0 && <div className={classNames(classes.inner, classes.results)}>
                {gotchis.length}
                <img src={gotchiPlaceholder} alt='placeholder' width={20} height={20} />
            </div>}
        </div>
    )
}
