import React, { useCallback, useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import styles from './styles';

export default function MultiAutocomplete({ options, onSetSelectedFilters }) {
    const classes = styles();

    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const selectedOptions = options.items.filter(item => item.isSelected);

        setSelectedOptions(selectedOptionsCache => [...selectedOptions, ...selectedOptionsCache]);
    }, [options]);

    const onHandleAutocompleteChange = useCallback((event, values) => {
        const selectedValues = [...values.map(value => ({ ...value, isSelected: true }))];

        setSelectedOptions(selectedValues);
        onSetSelectedFilters([options.key], {
            ...options,
            selectedValue: selectedValues
        });
    }, [options, onSetSelectedFilters]);

    return (
        <div className={classes.wrapper}>
            <div>{options.placeholder}:</div>
            <Autocomplete
                id={`${options.key}-autocomplete`}
                multiple
                style={{ width: 400 }}
                value={selectedOptions}
                onChange={onHandleAutocompleteChange}
                options={options.items}
                getOptionLabel={option => option.title}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => (
                    <TextField {...params} size='small' label={options.placeholder} />
                )}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => {
                        return (
                            <Chip
                                label={option.title}
                                size='small'
                                {...getTagProps({ index })}
                            />
                        );
                    })
                }
            />
        </div>
    );
}
