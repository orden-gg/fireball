import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';

export default function CheckboxFilter({ option, onSetSelectedFilters }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(option.value);
    }, [option.value]);

    const onCheckboxChange = useCallback(value => {
        setIsChecked(value);

        onSetSelectedFilters(option.key, value);
    }, [option, onSetSelectedFilters]);

    return (
        <div>
            <Checkbox
                edge="start"
                size='small'
                checked={isChecked}
                onChange={(event) => onCheckboxChange(event.target.checked)}
            />
                <span>{option.title}</span>
        </div>
    );
}
