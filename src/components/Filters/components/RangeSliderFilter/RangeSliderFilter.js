import React, { useCallback, useEffect, useState } from 'react';
import { Slider, TextField } from '@mui/material';

import styles from './styles';
import CustomTooltip from 'components/custom/CustomTooltip';

export default function RangeSliderFilter({ option, onSetSelectedFilters }) {
    const classes = styles();
    const [currentValue, setCurrentValue] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    const floatNumberPattern = '[0-9]+([,|.][0-9]+)?';

    useEffect(() => {
        setCurrentValue(option.value);
    }, [option.value]);

    useEffect(() => {
        setMinValue(option.min);
        setMaxValue(option.max);
    }, [option]);

    const onSliderChange = (value) => {
        setCurrentValue(value);
    }

    const onMinInputChange = useCallback(value => {
        setMinValue(value);

        if (value.match(floatNumberPattern)) {
            if (value >= option.min && value <= option.max) {
                const currentValueToSet = [parseFloat(value), maxValue];

                setCurrentValue(currentValueToSet);
                onSetSelectedFilters(option.key, currentValueToSet);
            }
        }
    }, [maxValue, option, onSetSelectedFilters]);

    const onMaxInputChange = useCallback((value) => {
        setMaxValue(value);

        if (value.match(floatNumberPattern)) {
            if (value >= option.min && value <= option.max) {
                const currentValueToSet = [minValue, parseFloat(value)];

                setCurrentValue(currentValueToSet);
                onSetSelectedFilters(option.key, currentValueToSet);
            }
        }
    }, [minValue, option, onSetSelectedFilters]);

    const onSliderChangeCommited = useCallback(value => {
        onSetSelectedFilters(option.key, value);
    }, [option.key, onSetSelectedFilters]);

    return (
        <div className={classes.wrapper}>
            <TextField
                className={classes.textFiled}
                variant='outlined'
                size='small'
                label='min'
                inputProps={{ type: 'number' }}
                value={minValue}
                onChange={event => onMinInputChange(event.target.value)}
            ></TextField>
            <TextField
                className={classes.textFiled}
                variant='outlined'
                size='small'
                label='max'
                inputProps={{ type: 'number' }}
                value={maxValue}
                onChange={event => onMaxInputChange(event.target.value)}
            ></TextField>

            <CustomTooltip
                title={<span>{option.tooltip}</span>}
                placement='top'
                followCursor
            >
                <span className={classes.tooltipInner}>
                    {option.icon ? option.icon : option.title}
                </span>
            </CustomTooltip>

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
    );
}
