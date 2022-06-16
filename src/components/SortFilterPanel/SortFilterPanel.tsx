import { useCallback, useState } from 'react';
import { Backdrop, Button, Divider } from '@mui/material';

import classNames from 'classnames';

import { Filters } from 'components/Filters/components/Filters/Filters';
import { LazySorting, LazySortingProps } from 'components/Filters/LazySorting';

import { styles } from './styles';

interface SortFilterPanelProps {
    sorting: LazySortingProps;
    itemsLength: number;
    placeholder: JSX.Element;
    filters: any;
    setSelectedFilters: (key: string, values: any) => void;
    resetFilters: () => void;
    exportData: () => void;
    isShowFilters?: boolean;
    filtersCount?: number;
}

export function SortFilterPanel({
    sorting,
    itemsLength,
    placeholder,
    isShowFilters = false,
    filters,
    setSelectedFilters,
    resetFilters,
    filtersCount,
    exportData
}: SortFilterPanelProps) {
    const classes = styles();

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const onToglleFilterDropdown = (isOpen: boolean): void => {
        setIsDropdownOpen(!isOpen);
    };

    const onCloseDropdown = (): void => {
        setIsDropdownOpen(false);
    };

    const onSetSelectedFilters = (key: string, filtersObj: any): void => {
        setSelectedFilters(key, filtersObj);
    };

    const onResetFilters = useCallback((): void => {
        setIsDropdownOpen(false);
        resetFilters();
    }, [setIsDropdownOpen, resetFilters]);

    const onExportData = useCallback((): void => {
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
