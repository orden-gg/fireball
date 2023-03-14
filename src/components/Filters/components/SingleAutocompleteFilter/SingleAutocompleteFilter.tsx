import { useCallback, useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { FilterItemOption } from 'shared/models';

const defaultValue: FilterItemOption = {
  title: '',
  value: '',
  queryParamValue: '',
  isSelected: false
};

interface SingleAutocompleteFilterProps {
  filter: CustomAny;
  onSetSelectedFilters: (key: string, value: CustomAny) => void;
  isDisabled: boolean;
}

export function SingleAutocompleteFilter({ filter, onSetSelectedFilters, isDisabled }: SingleAutocompleteFilterProps) {
  const [currentValue, setCurrentValue] = useState<CustomAny>(defaultValue);

  useEffect(() => {
    const selectedItem: CustomAny = filter.items.find((item: CustomAny) => item.isSelected);
    const selectedValue: CustomAny = selectedItem ? selectedItem : defaultValue;

    setCurrentValue(selectedValue);
  }, [filter.items]);

  const onHandleChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, value: CustomAny) => {
      const selectedValue: string = value ? value.value : '';

      setCurrentValue(value);
      onSetSelectedFilters(filter.key, selectedValue);
    },
    [filter, onSetSelectedFilters]
  );

  return (
    <Autocomplete
      id={`${filter.key}-autocomplete`}
      disablePortal
      value={currentValue}
      getOptionLabel={(option) => option.title || ''}
      isOptionEqualToValue={(option, value) => option.isSelected === value.isSelected || true}
      options={filter.items}
      disabled={filter.items.length === 0 || isDisabled}
      onChange={onHandleChange}
      renderInput={(params) => <TextField {...params} label={filter.title} size='small' />}
    />
  );
}
