import React, { useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const defaultValue = {
    title: '',
    value: '',
    queryParamValue: '',
    isSelected: false
};

export default function SingleAutocompleteFilter({ option, onSetSelectedFilters }) {
    const [currentValue, setCurrentValue] = useState(defaultValue);

    useEffect(() => {
        const selectedItem = option.items.find(item => item.isSelected);
        const selectedValue = selectedItem ? selectedItem : defaultValue;

        setCurrentValue(selectedValue);
    }, [option.items]);

    const onHandleChange = useCallback((event, value) => {
        const selectedValue = value ? value.value : '';

        setCurrentValue(value);
        onSetSelectedFilters(option.key, selectedValue);
    }, [option, onSetSelectedFilters]);

    return (
        <Autocomplete
            id={`${option.key}-autocomplete`}
            disablePortal
            value={currentValue}
            getOptionLabel={option => option.title || ''}
            isOptionEqualToValue={(option, value) => option.isSelected === value.isSelected}
            options={option.items}
            disabled={option.items.length === 0}
            onChange={onHandleChange}
            renderInput={params => (
                <TextField {...params} label={option.title} size='small' />
            )}
        />
    );
}
