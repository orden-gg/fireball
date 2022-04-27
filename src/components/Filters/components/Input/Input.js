import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import styles from './styles';

export default function MultiAutocomplete({ options, onSetSelectedFilters }) {
    const classes = styles();

    const [currentValue, setCurrentValue] = useState([]);

    useEffect(() => {
        setCurrentValue(options.value);
    }, [options.value]);

    const onInputChange = useCallback((value) => {
        setCurrentValue(value);

        onSetSelectedFilters([options.key], {
            ...options,
            selectedValue: value
        });
    }, [options, onSetSelectedFilters]);

    return (
        <div className={classes.wrapper}>
            <div>{options.placeholder}:</div>
            <TextField
                variant='outlined'
                label={options.placeholder}
                value={currentValue}
                onChange={event => onInputChange(event.target.value)}
            ></TextField>
        </div>
    );
}
