import React from 'react';

import { FilterComponent } from 'data/filterTypes';

import MultiButtonSelectionFilter from '../MultiButtonSelectionFilter/MultiButtonSelectionFilter';
import Input from '../InputFilter/InputFilter';

import styles from './styles';

export default function Filters({ filters, onSetSelectedFilters }) {
    const classes = styles();

    const renderFiltersComponents = (renderFilters) => {
        return Object.entries(renderFilters).map(([key, renderFilter]) => {
            let componentToRender;

            switch (renderFilter.componentType) {
                case FilterComponent.MultipleAutocomplete:
                    componentToRender = <MultiButtonSelectionFilter key={key} option={renderFilter} onSetSelectedFilters={onSetSelectedFilters} />;

                    break;
                case FilterComponent.Input:
                    componentToRender = <Input key={key} option={renderFilter} onSetSelectedFilters={onSetSelectedFilters} />;

                    break;
                default:
                    componentToRender = null;
            }

            return componentToRender;
        });
    }

    return (
        <div className={classes.filtersWrapper}>
            { renderFiltersComponents(filters) }
        </div>
    );
}
