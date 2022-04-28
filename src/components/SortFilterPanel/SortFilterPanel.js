import React, { useCallback, useState } from 'react';
import { Backdrop, Button } from '@mui/material';

import classNames from 'classnames';

import Filters from 'components/Filters/components/Filters/Filters';
import LazySorting from 'components/Filters/LazySorting';

import styles from './styles';

export default function SortFilterPanel({
    sorting,
    itemsLength,
    placeholder,
    isShowFilters = false,
    filters,
    applyFilters,
    resetFilters,
    filtersCount
}) {
    const classes = styles();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});

    const onToglleFilterDropdown = (isOpen) => {
        setIsDropdownOpen(!isOpen);
    }

    const onCloseDropdown = () => {
        setIsDropdownOpen(false);
    }

    const onSetSelectedFilters = (key, filtersObj) => {
        setSelectedFilters(selectedFiltersCache => {
            selectedFiltersCache[key] = filtersObj;

            if (!Boolean(filtersObj.selectedValue.length)) {
                delete selectedFiltersCache[key];
            }

            return {...selectedFiltersCache};
        });
    }

    const onApplyFilters = useCallback(() => {
        setIsDropdownOpen(false);
        applyFilters(selectedFilters)
    }, [setIsDropdownOpen, applyFilters, selectedFilters]);

    const onReserFilters = useCallback(() => {
        setIsDropdownOpen(false);
        setSelectedFilters({});
        resetFilters();
    }, [setIsDropdownOpen, resetFilters]);

    return (
        <div className={classNames(classes.container, isDropdownOpen ? 'opened' : 'closed')}>
            <LazySorting {...sorting}/>

            {
                isShowFilters &&
                    <div className={classes.dropdownContainer}>
                        <Button
                            className={classes.filterButton}
                            variant='outlined'
                            color='primary'
                            onClick={() => onToglleFilterDropdown(isDropdownOpen)}
                        >
                            Filters
                        </Button>
                        { Boolean(filtersCount) && <span className={classes.filtersCount}>{filtersCount}</span> }

                        {isDropdownOpen && (
                            <div className={classes.filtersDropdown}>
                                <Filters filters={filters} onSetSelectedFilters={onSetSelectedFilters}/>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    onClick={onReserFilters}
                                >
                                    Reset Filters
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    onClick={onApplyFilters}
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        )}
                    </div>
            }

            { itemsLength > 0 &&
                <div className={classNames(classes.inner, classes.results)}>
                    <span>{itemsLength}</span>
                    <span className={classes.placeholder}>{placeholder}</span>
                </div>
            }

            <Backdrop
                className={classes.filterBackdrop}
                open={isDropdownOpen}
                onClick={onCloseDropdown}
            />
        </div>
    );
}
