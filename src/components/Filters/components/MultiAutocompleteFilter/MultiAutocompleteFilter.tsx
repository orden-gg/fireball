import { useCallback } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface MultiAutocompleteFilterProps {
  filter: CustomAny;
  onSetSelectedFilters: (key: string, value: CustomAny[]) => void;
  isDisabled: boolean;
}

export function MultiAutocompleteFilter({ filter, onSetSelectedFilters, isDisabled }: MultiAutocompleteFilterProps) {
  const onHandleAutocompleteChange = useCallback(
    (event: CustomAny, values: CustomAny[]) => {
      onSetSelectedFilters(filter.key, values);
    },
    [filter, onSetSelectedFilters]
  );

  return (
    <Autocomplete
      id={`${filter.key}-autocomplete`}
      multiple
      value={filter.items.filter((item: CustomAny) => item.isSelected)}
      onChange={onHandleAutocompleteChange}
      options={filter.items}
      getOptionLabel={(option: CustomAny) => option.title}
      isOptionEqualToValue={(option: CustomAny, value: CustomAny) => option.value === value.value}
      renderInput={(params) => <TextField {...params} size='small' label={filter.title} />}
      renderTags={filter.renderTagsFn}
      disabled={isDisabled}
    />
  );
}
