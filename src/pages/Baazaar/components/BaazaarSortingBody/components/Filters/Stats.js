import React, {useContext, useEffect, useState} from "react";
import {
    Grid,
    Button,
    TextField,
    Checkbox,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Slide, Slider, Chip, Stack
} from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import useStyles from "./styles";

export default function Stats() {
    const classes = useStyles();
    const [chips, setChips] = useState([]);
    const {minBRS, setMinBRS, sliderRange, setSliderRange, stats, addStat, selectedTraits, setSelectedTraits} = useContext(BaazaarContext);

    const onMinBRSChange = (event) => {
        setMinBRS(event.target.value);
    };

    const onTraitsChange = (event) => {
        setSelectedTraits(event.target.value);
    };

    const onAddTraitClick = () => {
        addStat();
    };

    const valuetext = () => {
        return `${sliderRange[0]}-${sliderRange[1]}`;
    };

    const onSliderChange = (event) => {
        setSliderRange(event.target.value);
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
                                defaultValue={selectedTraits}
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
                        <Slider
                            min={0}
                            max={99}
                            defaultValue={sliderRange}
                            onChange={onSliderChange}
                            valueLabelDisplay="auto"
                            disableSwap
                            // getAriaValueText={valuetext}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            fullWidth
                            onClick={onAddTraitClick}
                        >Add</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}