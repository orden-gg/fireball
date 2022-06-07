import { useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';

import classNames from 'classnames';

import Filters from 'components/Filters/components/Filters/Filters';
import { filtersData } from 'data/filters.data';
import filtersUtils from 'utils/filtersUtils';

import { FilterStyles } from '../styles';

const sizesFilter = { ...filtersData.size, divider: true };

sizesFilter.items = [
    ...sizesFilter.items,
    {
        title: 'Partners (64x64)',
        value: '4',
        isSelected: false,
        queryParamValue: '4'
    }, {
        title: 'Guardian (64x64)',
        value: '5',
        isSelected: false,
        queryParamValue: '5'
    }
];

const initialFilters = {
    size: sizesFilter,
    district: { ...filtersData.district}
};

export default function CitadelFilters({ onFiltersChange, queryParams }) {

    const [currentFilters, setCurrentFilters] = useState({...initialFilters});
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const classes = FilterStyles();

    const onToglleFilterDropdown = isOpen => {
        setIsDropdownOpen(!isOpen);
    }

    const onSetSelectedFilters = (key, selectedValue) => {
        filtersUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
    }

    const renderFilterBody = () => {
        if (isDropdownOpen) {
            return (
                <div className={classes.filtersDropdown}>
                    <Filters
                        filters={initialFilters}
                        onSetSelectedFilters={onSetSelectedFilters}
                    />

                    <div className={classes.buttonsWrapper}>
                        <Button
                            variant='contained'
                            color='warning'
                            size='small'
                            onClick={onResetFilters}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            )
        }
    }

    const onResetFilters = useCallback(() => {
        filtersUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    useEffect(() => {
        setCurrentFilters(currentFiltersCache =>
            filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        return () => onResetFilters();
    }, []);

    useEffect(() => {
        filtersUtils.onFiltersUpdate(
            currentFilters,
            filtersUtils.getActiveFiltersCount,
            setActiveFiltersCount,
            onFiltersChange
        );
    }, [currentFilters]);

    return (
        <div className={classNames(classes.dropdownContainer, isDropdownOpen && 'opened')}>
            <Button
                className={classNames(classes.filterButton, isDropdownOpen && 'active' )}
                color='primary'
                onClick={() => onToglleFilterDropdown(isDropdownOpen)}
            >
                Filters
            </Button>

            { Boolean(activeFiltersCount) && <span className={classes.filtersCount}>{activeFiltersCount}</span> }

            { renderFilterBody() }
        </div>
    )
}
