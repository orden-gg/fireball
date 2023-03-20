import React from 'react';

import { Divider } from '@mui/material';

import classNames from 'classnames';
import _ from 'lodash';

import { FilterComponentType } from 'shared/constants';

import { CheckboxFilter } from '../CheckboxFilter/CheckboxFilter';
import { InputFilter } from '../InputFilter/InputFilter';
import { MultiAutocompleteFilter } from '../MultiAutocompleteFilter/MultiAutocompleteFilter';
import { MultiButtonSelectionFilter } from '../MultiButtonSelectionFilter/MultiButtonSelectionFilter';
import { RangeSliderFilter } from '../RangeSliderFilter/RangeSliderFilter';
import { SingleAutocompleteFilter } from '../SingleAutocompleteFilter/SingleAutocompleteFilter';
import { styles } from './styles';

interface FiltersProps {
  filters: CustomAny;
  onSetSelectedFilters: (key: string, selectedValue: CustomAny) => void;
  className?: string;
  isFiltersDisabled?: boolean;
}

export function Filters({ filters, onSetSelectedFilters, className, isFiltersDisabled = false }: FiltersProps) {
  const classes = styles();

  // TODO replace object type with appropriate one
  const renderFiltersComponents = (renderFilters: Object) => {
    return Object.entries(renderFilters).map(([key, renderFilter]) => {
      let componentToRender: JSX.Element;
      const filterProps = {
        filter: renderFilter,
        onSetSelectedFilters: onSetSelectedFilters,
        isDisabled: isFiltersDisabled
      };
      const divider: boolean = filters[key].divider;

      switch (renderFilter.componentType) {
        case FilterComponentType.Input:
          componentToRender = <InputFilter {...filterProps} />;

          break;
        case FilterComponentType.Checkbox:
          componentToRender = <CheckboxFilter {...filterProps} />;

          break;
        case FilterComponentType.MultipleAutocomplete:
          componentToRender = <MultiAutocompleteFilter {...filterProps} />;

          break;
        case FilterComponentType.MultiButtonSelection:
          componentToRender = (
            <MultiButtonSelectionFilter
              {...{
                filter: renderFilter,
                onSetSelectedFilters: _.debounce((key: string, selectedValue: CustomAny) => {
                  onSetSelectedFilters(key, selectedValue);
                }, 1000),
                isDisabled: isFiltersDisabled
              }}
            />
          );

          break;
        case FilterComponentType.SingleAutocomplete:
          componentToRender = <SingleAutocompleteFilter {...filterProps} />;

          break;
        case FilterComponentType.RangeSlider:
          componentToRender = <RangeSliderFilter {...filterProps} />;

          break;
        default:
          componentToRender = <React.Fragment key={Math.random() * Date.now()}></React.Fragment>;
      }

      return (
        <div key={`${componentToRender}${key}-component`}>
          <div className={classNames(classes.component, renderFilter.class, !divider && 'no-padding-bottom')}>
            {componentToRender}
          </div>
          {divider && <Divider className={classes.divider} />}
        </div>
      );
    });
  };

  return <div className={classNames(classes.wrapper, className)}>{renderFiltersComponents(filters)}</div>;
}
