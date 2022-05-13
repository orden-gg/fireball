import React, { useCallback } from 'react';
import { Avatar, Chip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import gotchiverseUtils from 'utils/gotchiverseUtils';

export default function MultiAutocompleteFilter({ option, onSetSelectedFilters }) {
    const onHandleAutocompleteChange = useCallback((event, values) => {
        const selectedValues = [...values.map(value => ({ ...value, isSelected: true }))];

        onSetSelectedFilters([option.key], {
            ...option,
            selectedValue: selectedValues
        });
    }, [option, onSetSelectedFilters]);

    return (
        <Autocomplete
                id={`${option.key}-autocomplete`}
                multiple
                value={option.items.filter(item => item.isSelected)}
                onChange={onHandleAutocompleteChange}
                options={option.items}
                getOptionLabel={option => option.title}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => (
                    <TextField {...params} size='small' label={option.title} />
                )}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => {
                        return (
                            <Chip
                                label={option}
                                size='small'
                                avatar={
                                    <Avatar src={gotchiverseUtils.getGuildImg(option)} alt={option} />
                                }
                                {...getTagProps({ index })}
                            />
                        );
                    })
                }
            />
    );
}
