import { useCallback, useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

interface CheckboxFilterProps {
    filter: any;
    onSetSelectedFilters: (key: string, value: boolean) => void;
}

export function CheckboxFilter({ filter, onSetSelectedFilters }: CheckboxFilterProps) {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        setIsChecked(filter.value);
    }, [filter.value]);

    const onCheckboxChange = useCallback((value: boolean) => {
        setIsChecked(value);

        onSetSelectedFilters(filter.key, value);
    }, [filter, onSetSelectedFilters]);

    return (
        <FormGroup>
            <FormControlLabel
                label={filter.title}
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
