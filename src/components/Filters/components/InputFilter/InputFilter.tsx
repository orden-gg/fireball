import { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import { styles } from './styles';

interface InputFilterProps {
    filter: any;
    onSetSelectedFilters: (key: string, value: string) => void;
}

export function InputFilter({ filter, onSetSelectedFilters }: InputFilterProps) {
    const classes = styles();

    const [currentValue, setCurrentValue] = useState<string>('');

    useEffect(() => {
        setCurrentValue(filter.value);
    }, [filter.value]);

    const onInputChange = useCallback((value: string) => {
        setCurrentValue(value);

        onSetSelectedFilters(filter.key, value);
    }, [filter, onSetSelectedFilters]);

    return (
        <div className={classes.wrapper}>
            { filter.title && (
                <span className={classes.title}>{filter.title}</span>
            )}
            <TextField
                variant='outlined'
                size='small'
                label={filter.placeholder}
                value={currentValue}
                onChange={event => onInputChange(event.target.value)}
                className={classes.input}
            ></TextField>
        </div>
    );
}
