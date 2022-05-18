import React, { useCallback, useEffect, useState } from 'react';
import { Slider } from '@mui/material';

import CustomTooltip from 'components/custom/CustomTooltip';

import styles from './styles';

export default function RangeSliderFilter({ option, onSetSelectedFilters }) {
    const classes = styles();
    const [currentValue, setCurrentValue] = useState([]);

    useEffect(() => {
        setCurrentValue(option.value);
    }, [option.value]);

    const onSliderChange = value => {
        setCurrentValue(value);
    };

    const onSliderChangeCommited = useCallback((value) => {
        onSetSelectedFilters(option.key, value)
    }, [option.key, onSetSelectedFilters]);

    return (
        <div className={classes.wrapper}>
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
