import { useCallback, useEffect, useState } from 'react';
import { Slider, TextField } from '@mui/material';

import _ from 'lodash';

import { IconUtils } from 'utils';

import { styles } from './styles';

interface RangeSliderFilterProps {
  filter: any;
  onSetSelectedFilters: (key: string, value: number[]) => void;
  isDisabled: boolean;
}

export function RangeSliderFilter({ filter, onSetSelectedFilters, isDisabled }: RangeSliderFilterProps) {
  const classes = styles();

  const [currentValue, setCurrentValue] = useState<number[]>([]);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  const floatNumberPattern: string = '[0-9]+([,|.][0-9]+)?';

  useEffect(() => {
    setCurrentValue(filter.value);
    setMinValue(filter.value[0]);
    setMaxValue(filter.value[1]);
  }, [filter.value]);

  const onSliderChange = (value: number[]) => {
    setCurrentValue(value);
  };

  const onMinInputChange = useCallback(
    (value: string) => {
      const numValue: number = Number(value);

      setMinValue(numValue);

      const predicate =
        value.match(floatNumberPattern) && numValue >= filter.min && numValue <= filter.max && numValue <= maxValue;

      if (predicate) {
        const currentValueToSet = [Number(value), Number(maxValue)];

        setCurrentValue(currentValueToSet);
        onHandleInputDebounce(filter.key, currentValueToSet);
      }
    },
    [maxValue, filter, onSetSelectedFilters]
  );

  const onMaxInputChange = useCallback(
    (value: string) => {
      const numValue: number = Number(value);

      setMaxValue(numValue);

      const predicate =
        value.match(floatNumberPattern) && numValue >= filter.min && numValue <= filter.max && numValue >= minValue;

      if (predicate) {
        const currentValueToSet = [Number(minValue), Number(value)];

        setCurrentValue(currentValueToSet);
        onHandleInputDebounce(filter.key, currentValueToSet);
      }
    },
    [minValue, filter, onSetSelectedFilters]
  );

  const onHandleInputDebounce = _.debounce((key: string, value: number[]) => {
    onSetSelectedFilters(key, value);
  }, 500);

  const updateMinValue = (value: number) => {
    setMinValue(value);
  };

  const updateMaxValue = (value: number) => {
    setMinValue(value);
  };

  const onSliderChangeCommited = useCallback(
    (value: number[]) => {
      updateMinValue(value[0]);
      updateMaxValue(value[1]);
      onSetSelectedFilters(filter.key, value);
    },
    [filter.key, onSetSelectedFilters]
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.range}>
        <div className={classes.title}>
          {filter.title}
          {filter.isShowIcon && (
            <span style={{ ...filter.iconProps, marginLeft: filter.title ? 4 : 0 }}>
              {IconUtils.getIconByName(filter.iconName, filter.iconProps)}
            </span>
          )}
        </div>

        <Slider
          min={filter.min}
          max={filter.max}
          value={currentValue}
          onChange={(event, value) => onSliderChange(value as number[])}
          onChangeCommitted={(event, value) => onSliderChangeCommited(value as number[])}
          valueLabelDisplay='auto'
          disableSwap
          size='small'
          disabled={isDisabled}
        />
      </div>

      <div className={classes.inputs}>
        <TextField
          className={classes.textField}
          variant='outlined'
          size='small'
          label='min'
          inputProps={{ type: 'number' }}
          value={minValue}
          onChange={(event) => onMinInputChange(event.target.value)}
          disabled={isDisabled}
        ></TextField>
        <TextField
          className={classes.textField}
          variant='outlined'
          size='small'
          label='max'
          inputProps={{ type: 'number' }}
          value={maxValue}
          onChange={(event) => onMaxInputChange(event.target.value)}
          disabled={isDisabled}
        ></TextField>
      </div>
    </div>
  );
}
