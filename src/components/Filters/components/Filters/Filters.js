import { Divider } from '@mui/material';

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
            const filterProps = {
                key,
                option: renderFilter,
                onSetSelectedFilters: onSetSelectedFilters
            };
            const divider = filters[key].divider;

            switch (renderFilter.componentType) {
                case FilterComponent.Input:
                    componentToRender = <InputFilter {...filterProps} />;

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
                    componentToRender = null;
            }

            return (
                <div key={`${componentToRender.key}-component`}>
                    <div className={classNames(classes.component, !divider && 'no-padding')}>
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
