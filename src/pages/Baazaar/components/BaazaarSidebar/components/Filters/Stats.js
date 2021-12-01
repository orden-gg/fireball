import React, {useContext, useEffect, useState} from "react";
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import AdvancedSearch from "./AdvancedSearch";
import FastSearch from "./FastSearch";

import styles from "./styles";


export default function Stats({runFilterWatcher, fastSearch, setFastSearch, runInstantFiltering}) {
    const classes = styles();
    const {
        minBRS,
        setMinBRS,
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

    useEffect(() => {
        runInstantFiltering();
    }, [collateral, stats]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel>Collateral</InputLabel>
                    <Select
                        label={'Collateral'}
                        value={collateral}
                        fullWidth
                        size={"small"}
                        onChange={(event) => {
                            setCollateral(event.target.value);
                        }}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='0x20d3922b4a1a8560e1ac99fba4fade0c849e2142'>maWETH</MenuItem>
                        <MenuItem value='0x9719d867a500ef117cc201206b8ab51e794d3f82'>maUSDC</MenuItem>
                        <MenuItem value='0xe0b22e0037b130a9f56bbb537684e6fa18192341'>maDAI</MenuItem>
                        <MenuItem value='0x8c8bdbe9cee455732525086264a4bf9cf821c498'>maUNI</MenuItem>
                        <MenuItem value='0x823cd4264c1b951c9209ad0deaea9988fe8429bf'>maAAVE</MenuItem>
                        <MenuItem value='0xf4b8888427b00d7caf21654408b7cba2ecf4ebd9'>maTUSD</MenuItem>
                        <MenuItem value='0x98ea609569bd25119707451ef982b90e3eb719cd'>maLINK</MenuItem>
                        <MenuItem value='0xe20f7d1f0ec39c4d5db01f53554f2ef54c71f613'>maYFI</MenuItem>
                        <MenuItem value='0xdae5f1590db13e3b40423b5b5c5fbf175515910b'>maUSDT</MenuItem>
                        <MenuItem value='0x28424507fefb6f7f8e9d3860f56504e4e5f5f390'>amWETH</MenuItem>
                        <MenuItem value='0x27f8d03b3a2196956ed754badc28d73be8830a6e'>amDAI</MenuItem>
                        <MenuItem value='0x60d55f02a771d515e077c9c2403a1ef324885cec'>amUSDT</MenuItem>
                        <MenuItem value='0x8df3aad3a84da6b69a4da8aec3ea40d9091b2ac4'>amWMATIC</MenuItem>
                        <MenuItem value='0x1d2a0e5ec8e5bbdca5cb219e649b565d8e5c3360'>amAAVE</MenuItem>
                        <MenuItem value='0x5c2ed810328349100a66b82b78a1791b101c9d61'>amWBTC</MenuItem>
                        <MenuItem value='0x1a13f4ca1d028320a707d99520abfefca3998b7f'>amUSDC</MenuItem>
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