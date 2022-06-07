import { useCallback, useState } from 'react';
import { Backdrop, Button, Divider } from '@mui/material';

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
    setSelectedFilters,
    resetFilters,
    filtersCount,
    exportData
}) {
    const classes = styles();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const onToglleFilterDropdown = (isOpen) => {
        setIsDropdownOpen(!isOpen);
    }

    const onCloseDropdown = () => {
        setIsDropdownOpen(false);
    }

    const onSetSelectedFilters = (key, filtersObj) => {
        setSelectedFilters(key, filtersObj);
    }

    const onResetFilters = useCallback(() => {
        setIsDropdownOpen(false);
        resetFilters();
    }, [setIsDropdownOpen, resetFilters]);

    const onExportData = useCallback(() => {
        exportData();
    }, [exportData]);

    return (
        <div className={classNames(classes.container, isDropdownOpen ? 'opened' : 'closed')}>
            <LazySorting {...sorting}/>

            {
                isShowFilters &&
                    <div className={classes.dropdownContainer}>
                        <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />

                        <Button
                            className={classNames(classes.filterButton, isDropdownOpen && 'active' )}
                            color='primary'
                            onClick={() => onToglleFilterDropdown(isDropdownOpen)}
                        >
                            Filters
                        </Button>
                        { Boolean(filtersCount) && <span className={classes.filtersCount}>{filtersCount}</span> }

                        { isDropdownOpen &&
                            <div className={classes.filtersDropdown}>
                                <Filters
                                    filters={filters}
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
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        size='small'
                                        onClick={onExportData}
                                    >
                                        Export data (.json)
                                    </Button>
                                </div>
                            </div>
                        }
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
