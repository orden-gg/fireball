import { useContext, useEffect, useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { BaazaarContext } from 'contexts/BaazaarContext';
import collaterals from 'data/collaterals';

import { AdvancedSearch } from './AdvancedSearch';
import { FastSearch } from './FastSearch';

import styles from './styles';

export default function Stats({ runFilterWatcher, fastSearch, setFastSearch, runInstantFiltering }) {
    const classes = styles();
    const {
        minBRS,
        setMinBRS,
        minKIN,
        setMinKIN,
        sliderRange,
        setSliderRange,
        addStat,
        stats,
        selectedTraits,
        setSelectedTraits,
        clearAllStats,
        collateral,
        setCollateral
    } = useContext(BaazaarContext);
    const [sliderIsValid, setSliderToValid] = useState(true);

    const onMinBRSChange = (event) => {
        setMinBRS(event.target.value);
        runFilterWatcher();
    };

    const onMinKINChange = (event) => {
        setMinKIN(event.target.value);
        runFilterWatcher();
    };

    const onTraitsChange = (event, value) => {
        setSelectedTraits(value);
    };

    const onAddTraitClick = () => {
        addStat();
    };

    const onSliderChange = (event) => {
        setSliderRange(event.target.value);
    };

    const onRangeChange = (event, indexInRange) => {
        const newValue = parseInt(event.target.value);
        const cachedRange = [...sliderRange];

        if (isNaN(newValue)) {
            cachedRange[indexInRange] = 0;
        } else {
            cachedRange[indexInRange] = newValue;
        }

        setSliderToValid(cachedRange[0] <= cachedRange[1] &&
            cachedRange[0] >= -20 && cachedRange[1] >= -20 &&
            cachedRange[0] <= 120 && cachedRange[1] <= 120
        );

        setSliderRange(cachedRange);
    };

    const handleSearchTypeChange = () => {
        setFastSearch(!fastSearch);
        clearAllStats();
        runFilterWatcher();
    };

    useEffect(() => {
        runInstantFiltering();
    }, [collateral, stats]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel>Collateral</InputLabel>
                    <Select
                        label='Collateral'
                        value={collateral}
                        fullWidth
                        size='small'
                        onChange={(event) => {
                            setCollateral(event.target.value);
                        }}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        {
                            collaterals.map((coll, index) => {
                                return <MenuItem key={index} value={coll.address}>
                                    {coll.name}
                                </MenuItem>;
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    className={classes.smallInput}
                    type='text'
                    variant='outlined'
                    fullWidth
                    size={'small'}
                    label={'BRS min'}
                    defaultValue={minBRS}
                    onChange={onMinBRSChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    className={classes.smallInput}
                    type='text'
                    variant='outlined'
                    fullWidth
                    size={'small'}
                    label={'KIN min'}
                    defaultValue={minKIN}
                    onChange={onMinKINChange}
                />
            </Grid>
            <Grid item xs={12}>
                <ToggleButtonGroup
                    color="primary"
                    value={fastSearch}
                    size={'small'}
                    exclusive
                    fullWidth
                    onChange={handleSearchTypeChange}
                >
                    <ToggleButton className={classes.toggleItem} value={true}>Fast search</ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={false}>Advanced</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                {
                    fastSearch ? <FastSearch runFilterWatcher={runFilterWatcher} /> : <AdvancedSearch
                        selectedTraits={selectedTraits}
                        onTraitsChange={onTraitsChange}
                        sliderRange={sliderRange}
                        onSliderChange={onSliderChange}
                        onRangeChange={onRangeChange}
                        sliderIsValid={sliderIsValid}
                        onAddTraitClick={onAddTraitClick}
                    />
                }
            </Grid>
        </Grid>
    );
}
