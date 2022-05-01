import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import styles from './styles';

export default function MultiAutocomplete({ option, onSetSelectedFilters }) {
    const classes = styles();

    const [currentValue, setCurrentValue] = useState([]);

    useEffect(() => {
        setCurrentValue(option.value);
    }, [option.value]);

    const onInputChange = useCallback((value) => {
        setCurrentValue(value);

        onSetSelectedFilters([option.key], {
            ...option,
            selectedValue: value
        });
    }, [option, onSetSelectedFilters]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>{option.title}</div>
            <TextField
                variant='outlined'
                size='small'
                label={option.placeholder}
                value={currentValue}
                onChange={event => onInputChange(event.target.value)}
            ></TextField>
        </div>
    );
}
