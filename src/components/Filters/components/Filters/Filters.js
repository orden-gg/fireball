import React from 'react';

import classNames from 'classnames';

import { FilterComponent } from 'data/filterTypes';

import InputFilter from '../InputFilter/InputFilter';
import MultiAutocompleteFilter from '../MultiAutocompleteFilter/MultiAutocompleteFilter';
import MultiButtonSelectionFilter from '../MultiButtonSelectionFilter/MultiButtonSelectionFilter';
import SingleAutocompleteFilter from '../SingleAutocompleteFilter/SingleAutocompleteFilter';
import RangeSliderFilter from '../RangeSliderFilter/RangeSliderFilter';

import styles from './styles';

export default function Filters({ filters, onSetSelectedFilters, className }) {
    const classes = styles();

    const renderFiltersComponents = (renderFilters) => {
        return Object.entries(renderFilters).map(([key, renderFilter]) => {
            let componentToRender;

            switch (renderFilter.componentType) {
                case FilterComponent.Input:
                    componentToRender = <InputFilter key={key} option={renderFilter} onSetSelectedFilters={onSetSelectedFilters} />;

                    break;
                case FilterComponent.MultipleAutocomplete:
                    componentToRender = <MultiAutocompleteFilter key={key} option={renderFilter} onSetSelectedFilters={onSetSelectedFilters} />;

                    break;
                case FilterComponent.MultiButtonSelection:
                    componentToRender = <MultiButtonSelectionFilter key={key} option={renderFilter} onSetSelectedFilters={onSetSelectedFilters} />;

                    break;
                case FilterComponent.SingleAutocomplete:
                    componentToRender = <SingleAutocompleteFilter key={key} option={renderFilter} onSetSelectedFilters={onSetSelectedFilters} />;

                    break;
                case FilterComponent.RangeSlider:
                    componentToRender = <RangeSliderFilter key={key} option={renderFilter} onSetSelectedFilters={onSetSelectedFilters} />;

                    break;
                default:
                    componentToRender = null;
            }

            return componentToRender;
        });
    }

    return (
        <div className={classNames(classes.wrapper, className)}>
            { renderFiltersComponents(filters) }
        </div>
    );
}
