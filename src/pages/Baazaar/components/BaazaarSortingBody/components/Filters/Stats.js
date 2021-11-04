import React, {useContext, useState} from "react";
import { Grid, Button, TextField, InputLabel, Select, MenuItem, FormControl, Slider } from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import useStyles from "./styles";

export default function Stats() {
    const classes = useStyles();
    const {
        minBRS,
        setMinBRS,
        sliderRange,
        setSliderRange,
        addStat,
        selectedTraits,
        setSelectedTraits
    } = useContext(BaazaarContext);
    const [sliderIsValid, setSliderToValid] = useState(true);

    const onMinBRSChange = (event) => {
        setMinBRS(event.target.value);
    };

    const onTraitsChange = (event) => {
        setSelectedTraits(event.target.value);
    };

    const onAddTraitClick = () => {
        addStat();
    };

    const onSliderChange = (event) => {
        setSliderRange(event.target.value);
    };

    const onRangeChange = (event, indexInRange) => {
        const oldValue = sliderRange[indexInRange];
        const newValue = parseInt(event.target.value);
        const cachedRange = [...sliderRange];
        const indexOfSecondRangeValue = indexInRange === 0 ? 1 : 0;

        if (indexInRange === 0 && cachedRange[1] < newValue) {

        }

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

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={'BRS min'}
                            defaultValue={minBRS}
                            onChange={onMinBRSChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <FormControl variant='outlined' className={classes.formControl} size={'small'}>
                            <InputLabel>Trait</InputLabel>
                            <Select
                                label='Trait'
                                value={selectedTraits}
                                onChange={onTraitsChange}
                            >
                                <MenuItem value={'NRG'}>NRG</MenuItem>
                                <MenuItem value={'AGG'}>AGG</MenuItem>
                                <MenuItem value={'SPK'}>SPK</MenuItem>
                                <MenuItem value={'BRN'}>BRN</MenuItem>
                                <MenuItem value={'EYS'}>EYS</MenuItem>
                                <MenuItem value={'EYC'}>EYC</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2} className={classes.sliderContainer}>
                            <Grid item xs={2}>
                                <TextField
                                    type='text'
                                    variant={"standard"}
                                    size={'small'}
                                    fullWidth
                                    value={sliderRange[0]}
                                    onChange={(event) => onRangeChange(event, 0)}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Slider
                                    min={0}
                                    max={99}
                                    value={sliderRange}
                                    onChange={onSliderChange}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    type='text'
                                    variant={"standard"}
                                    size={'small'}
                                    fullWidth
                                    value={sliderRange[1]}
                                    onChange={(event) => onRangeChange(event, 1)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            fullWidth
                            disabled={!sliderIsValid}
                            onClick={onAddTraitClick}
                        >Add</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}