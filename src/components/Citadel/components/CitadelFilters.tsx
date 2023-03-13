import { useCallback, useEffect, useState } from 'react';

import { Button } from '@mui/material';

import classNames from 'classnames';
import { ParsedQuery } from 'query-string';

import { Filters } from 'components/Filters/components/Filters/Filters';

import { FilterUtils } from 'utils';

import { filtersData } from 'data/filters.data';

import { FilterStyles } from '../styles';

const sizesFilter = { ...filtersData.size, divider: true };

sizesFilter.items = [
  ...sizesFilter.items,
  {
    title: 'Partners (64x64)',
    value: '4',
    isSelected: false,
    queryParamValue: '4'
  },
  {
    title: 'Guardian (64x64)',
    value: '5',
    isSelected: false,
    queryParamValue: '5'
  }
];

const initialFilters = {
  size: sizesFilter,
  district: { ...filtersData.district }
};

interface CitadelFiltersProps {
  onFiltersChange: (filters: CustomAny) => void;
  queryParams: ParsedQuery<string>;
  onExportData: () => void;
}

export function CitadelFilters({ onFiltersChange, queryParams, onExportData }: CitadelFiltersProps) {
  const [currentFilters, setCurrentFilters] = useState<CustomAny>({ ...initialFilters });
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const classes = FilterStyles();

  const onToglleFilterDropdown = (isOpen: boolean) => {
    setIsDropdownOpen(!isOpen);
  };

  const onSetSelectedFilters = (key: string, selectedValue: CustomAny | CustomAny[]) => {
    FilterUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
  };

  const renderFilterBody = () => {
    if (isDropdownOpen) {
      return (
        <div className={classes.filtersDropdown}>
          <Filters filters={initialFilters} onSetSelectedFilters={onSetSelectedFilters} />

          <div className={classes.buttonsWrapper}>
            <Button variant='contained' color='warning' size='small' onClick={onResetFilters}>
              Reset
            </Button>

            <Button variant='contained' color='secondary' size='small' onClick={onExportData}>
              Export data (.json)
            </Button>
          </div>
        </div>
      );
    }
  };

  const onResetFilters = useCallback(() => {
    FilterUtils.resetFilters(currentFilters, setCurrentFilters);
  }, [currentFilters]);

  useEffect(() => {
    setCurrentFilters((currentFiltersCache: CustomAny) =>
      FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
    );

    return () => onResetFilters();
  }, []);

  useEffect(() => {
    FilterUtils.onFiltersUpdate(
      currentFilters,
      FilterUtils.getActiveFiltersCount,
      setActiveFiltersCount,
      onFiltersChange
    );
  }, [currentFilters]);

  return (
    <div className={classNames(classes.dropdownContainer, 'citadel-filters', isDropdownOpen && 'opened')}>
      <Button
        className={classNames(classes.filterButton, isDropdownOpen && 'active')}
        color='primary'
        onClick={() => onToglleFilterDropdown(isDropdownOpen)}
      >
        Filters
      </Button>

      {Boolean(activeFiltersCount) && <span className={classes.filtersCount}>{activeFiltersCount}</span>}

      {renderFilterBody()}
    </div>
  );
}
