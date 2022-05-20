import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import styles from './styles';

export default function InputFilter({ option, onSetSelectedFilters }) {
    const classes = styles();

    const [currentValue, setCurrentValue] = useState([]);

    useEffect(() => {
        setCurrentValue(option.value);
    }, [option.value]);

    const onInputChange = useCallback(value => {
        setCurrentValue(value);

        onSetSelectedFilters(option.key, value);
    }, [option, onSetSelectedFilters]);

    return (
        <div className={classes.wrapper}>
            { option.title && (
                <span className={classes.title}>{option.title}</span>
            )}
            <TextField
                variant='outlined'
                size='small'
                label={option.placeholder}
                value={currentValue}
                onChange={event => onInputChange(event.target.value)}
                className={classes.input}
            ></TextField>
        </div>
    );
}
