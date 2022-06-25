import React from 'react';
import { Divider } from '@mui/material';

import classNames from 'classnames';

import { FilterComponent } from 'shared/constants';

import { InputFilter } from '../InputFilter/InputFilter';
import { CheckboxFilter } from '../CheckboxFilter/CheckboxFilter';
import { MultiAutocompleteFilter } from '../MultiAutocompleteFilter/MultiAutocompleteFilter';
import { MultiButtonSelectionFilter } from '../MultiButtonSelectionFilter/MultiButtonSelectionFilter';
import { SingleAutocompleteFilter } from '../SingleAutocompleteFilter/SingleAutocompleteFilter';
import { RangeSliderFilter } from '../RangeSliderFilter/RangeSliderFilter';

import { styles } from './styles';

interface FiltersProps {
    filters: any;
    onSetSelectedFilters: (key: string, selectedValue: any) => void;
    className?: string;
}

export function Filters({ filters, onSetSelectedFilters, className }: FiltersProps) {
    const classes = styles();

    // TODO replace object type with appropriate one
    const renderFiltersComponents = (renderFilters: Object) => {
        return Object.entries(renderFilters).map(([key, renderFilter]) => {
            let componentToRender: JSX.Element;
            const filterProps = {
                key,
                filter: renderFilter,
                onSetSelectedFilters: onSetSelectedFilters
            };
            const divider: boolean = filters[key].divider;

            switch (renderFilter.componentType) {
                case FilterComponent.Input:
                    componentToRender = <InputFilter {...filterProps} />;

                    break;
                case FilterComponent.Checkbox:
                    componentToRender = <CheckboxFilter {...filterProps} />;

                    break;
                case FilterComponent.MultipleAutocomplete:
                    componentToRender = <MultiAutocompleteFilter {...filterProps} />;

                    break;
                case FilterComponent.MultiButtonSelection:
                    componentToRender = <MultiButtonSelectionFilter {...filterProps} />;

                    break;
                case FilterComponent.SingleAutocomplete:
                    componentToRender = <SingleAutocompleteFilter {...filterProps} />;

                    break;
                case FilterComponent.RangeSlider:
                    componentToRender = <RangeSliderFilter {...filterProps} />;

                    break;
                default:
                    componentToRender = <React.Fragment key={Math.random() * Date.now()}></React.Fragment>;
            }

            return (
                <div key={`${componentToRender.key}-component`}>
                    <div className={classNames(classes.component, renderFilter.class, !divider && 'no-padding-bottom')}>
                        { componentToRender }
                    </div>
                    { divider && (
                        <Divider className={classes.divider} />
                    )}
                </div>
            );
        });
    };

    return (
        <div className={classNames(classes.wrapper, className)}>
            { renderFiltersComponents(filters) }
        </div>
    );
}
