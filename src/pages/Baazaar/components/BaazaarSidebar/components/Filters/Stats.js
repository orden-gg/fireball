import React, { useContext, useState } from "react";
import { Grid, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import AdvancedSearch from "./AdvancedSearch";
import FastSearch from "./FastSearch";
import useStyles from "./styles";

export default function Stats({runFilterWatcher, fastSearch, setFastSearch}) {
    const classes = useStyles();
    const {
        minBRS,
        setMinBRS,
        sliderRange,
        setSliderRange,
        addStat,
        selectedTraits,
        setSelectedTraits,
        clearAllStats
    } = useContext(BaazaarContext);
    const [sliderIsValid, setSliderToValid] = useState(true);

    const onMinBRSChange = (event) => {
        setMinBRS(event.target.value);
        runFilterWatcher();
    };

    const onTraitsChange = (event, value) => {
        setSelectedTraits(value);
    };

    const onAddTraitClick = () => {
        addStat();
        runFilterWatcher();
    };

    const onSliderChange = (event) => {
        setSliderRange(event.target.value);
    };

    const onRangeChange = (event, indexInRange) => {
        const newValue = parseInt(event.target.value);
        const cachedRange = [...sliderRange];

        if (isNaN(newValue)) {
            cachedRange[indexInRange] = 0
        } else {
            cachedRange[indexInRange] = newValue;
        }

        setSliderToValid(cachedRange[0] <= cachedRange[1] &&
            cachedRange[0] >= 0 && cachedRange[1] >= 0 &&
            cachedRange[0] <= 99 && cachedRange[1] <= 99
        );

        setSliderRange(cachedRange);
    };

    const handleSearchTypeChange = () => {
        setFastSearch(!fastSearch);
        clearAllStats();
        runFilterWatcher();
    };

    return (
        <Grid container spacing={2}>
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