
import React, { useState } from 'react';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import CustomToggleButtonGroup from 'components/custom/CustomToggleButtonGroup';
import commonUtils from 'utils/commonUtils';
import gotchiPlaceholder from 'assets/images/gotchi-placeholder.svg';

import { GotchiSortingStyles } from './styles';
import { Divider } from '@mui/material';
import classNames from 'classnames';


const sortings = [
    {
        name: 'id',
        key: 'id',
        tooltip: 'gotchi id',
        icon: <Grid3x3Icon fontSize='small' />
    },
    {
        name: 'mrs',
        key: 'modifiedRarityScore',
        tooltip: 'modified rarity score',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'brs',
        key: 'baseRarityScore',
        tooltip: 'base rarity score',
        icon: <FormatListBulletedIcon fontSize='small' />
    },
    {
        name: 'kin',
        key: 'kinship',
        tooltip: 'kinship',
        icon: <FavoriteIcon fontSize='small' />
    },
    {
        name: 'exp',
        key: 'experience',
        tooltip: 'experience',
        icon: <ShowChartIcon fontSize='small' />
    }
];

const directions = [
    {
        name: 'asc',
        key: 'asc',
        tooltip: '🔸 -> 🔶',
        icon: <ArrowDownwardIcon fontSize='small' />
    },
    {
        name: 'desc',
        key: 'desc',
        tooltip: '🔶 -> 🔸',
        icon: <ArrowUpwardIcon fontSize='small' />
    }
];

export default function GotchiSorting({ gotchis, setGotchis, defaultSorting }) {
    const classes = GotchiSortingStyles();
    const [sorting, setSorting] = useState(defaultSorting);
    const [direction, setDirection] = useState('desc');

    // useEffect(() => {
    //     console.log('🤖', value)
    // }, [value])

    const onFilterChange = (event, value) => {
        if (!value) return;

        setSorting(value);
        filterGotchis(value, direction);
    };

    const onDirectionChange = (event, value) => {
        if (!value) return;

        setDirection(value);
        filterGotchis(sorting, value);
    };

    const filterGotchis = (filter, dir) => {
        const sorted = commonUtils.basicSort(gotchis, filter, dir);

        setGotchis(sorted);
    };

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <CustomToggleButtonGroup
                    value={sorting}
                    onChange={(event, value) => onFilterChange(event, value)}
                    aria-label='sorting'
                    list={sortings}
                />
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
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
