import { useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function MultiAutocompleteFilter({ option, onSetSelectedFilters }) {
    const onHandleAutocompleteChange = useCallback((event, values) => {
        onSetSelectedFilters(option.key, values);
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
            renderInput={params => (
                <TextField {...params} size='small' label={option.title} />
            )}
            renderTags={option.renderTagsFn}
        />
    );
}
