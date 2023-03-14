import { useCallback } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface MultiAutocompleteFilterProps {
  filter: any;
  onSetSelectedFilters: (key: string, value: any[]) => void;
  isDisabled: boolean;
}

export function MultiAutocompleteFilter({ filter, onSetSelectedFilters, isDisabled }: MultiAutocompleteFilterProps) {
  const onHandleAutocompleteChange = useCallback(
    (event: any, values: any[]) => {
      onSetSelectedFilters(filter.key, values);
    },
    [filter, onSetSelectedFilters]
  );

  return (
    <Autocomplete
      id={`${filter.key}-autocomplete`}
      multiple
      value={filter.items.filter((item: any) => item.isSelected)}
      onChange={onHandleAutocompleteChange}
      options={filter.items}
      getOptionLabel={(option: any) => option.title}
      isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
      renderInput={(params) => <TextField {...params} size='small' label={filter.title} />}
      renderTags={filter.renderTagsFn}
      disabled={isDisabled}
    />
  );
}
