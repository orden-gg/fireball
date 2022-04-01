import styled from '@emotion/styled';
import { Autocomplete, Button, ButtonGroup, Chip, FormControlLabel, FormGroup, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';

import styles from './styles';
import collaterals from 'data/collaterals';
import CustomTooltip from 'components/custom/CustomTooltip';
import CustomToggleButtonGroup from 'components/custom/CustomToggleButtonGroup';

export default function GotchiFilters({ gotchis, setGotchis, defaultSorting }) {
    const classes = styles();

    const [value, setValue] = useState([]);

    // useEffect(() => {
    //     console.log('🤖', value)
    // }, [value])

    return (
        <>
            <div className={classes.section}>
                <Autocomplete
                    multiple
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    // id='tags-standart'
                    options={collaterals}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size='small'
                            label='Collaterals'
                        />
                    )}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip
                                label={option.name}
                                size='small'
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                />
                </div>
        </>
    )
}
