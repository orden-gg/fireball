import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

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
        <FormGroup>
            <FormControlLabel
                label={option.title}
                control={
                    <Checkbox
                        checked={isChecked}
                        onChange={(event) => onCheckboxChange(event.target.checked)}
                    />
                }
            />
        </FormGroup>
    );
}
