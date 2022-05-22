import React, { useCallback, useEffect, useState } from 'react';
import { Slider, TextField } from '@mui/material';

import styles from './styles';

export default function RangeSliderFilter({ option, onSetSelectedFilters }) {
    const classes = styles();
    const [currentValue, setCurrentValue] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    const floatNumberPattern = '[0-9]+([,|.][0-9]+)?';

    useEffect(() => {
        setCurrentValue(option.value);
        setMinValue(option.value[0]);
        setMaxValue(option.value[1]);
    }, [option.value]);

    const onSliderChange = (value) => {
        setCurrentValue(value);
    }

    const onMinInputChange = useCallback(value => {
        setMinValue(value);

        const predicate = value.match(floatNumberPattern) && value >= option.min && value <= option.max && value <= maxValue;

        if (predicate) {
            const currentValueToSet = [Number(value), Number(maxValue)];

            setCurrentValue(currentValueToSet);
            onSetSelectedFilters(option.key, currentValueToSet);
        }
    }, [maxValue, option, onSetSelectedFilters]);

    const onMaxInputChange = useCallback(value => {
        setMaxValue(value);

        const predicate = value.match(floatNumberPattern) && value >= option.min && value <= option.max && value >= minValue;

        if (predicate) {
            const currentValueToSet = [Number(minValue), Number(value)];

            setCurrentValue(currentValueToSet);
            onSetSelectedFilters(option.key, currentValueToSet);
        }
    }, [minValue, option, onSetSelectedFilters]);

    const updateMinValue = (value) => {
        setMinValue(value);
    }

    const updateMaxValue = (value) => {
        setMinValue(value);
    }

    const onSliderChangeCommited = useCallback(value => {
        updateMinValue(value[0]);
        updateMaxValue(value[1]);
        onSetSelectedFilters(option.key, value);
    }, [option.key, onSetSelectedFilters]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.range}>
                <div className={classes.title}>
                    {option.title}
                </div>

                <Slider
                    min={option.min}
                    max={option.max}
                    value={currentValue}
                    onChange={(event, value) => onSliderChange(value)}
                    onChangeCommitted={(event, value) => onSliderChangeCommited(value)}
                    valueLabelDisplay='auto'
                    disableSwap
                    size='small'
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
                    onChange={event => onMinInputChange(event.target.value)}
                ></TextField>
                <TextField
                    className={classes.textField}
                    variant='outlined'
                    size='small'
                    label='max'
                    inputProps={{ type: 'number' }}
                    value={maxValue}
                    onChange={event => onMaxInputChange(event.target.value)}
                ></TextField>
            </div>
        </div>
    );
}
