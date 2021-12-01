import React, {useContext, useEffect} from "react";
import {
    Grid,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    TextField,
    ToggleButton,
    Tooltip,
    Box,
    ToggleButtonGroup
} from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";

import { fomo, fud, kek, alpha } from "../../../../../../data/icons";
import classNames from "classnames";

import styles from "./styles";


const districts = [1,2,3,4,5,14,15,16,17,18,19,20,21,22,39,40,41,42,43];

export default function RealmFilters({runFilterWatcher, runInstantFiltering}) {
    const classes = styles();

    const {
        districtFilter,
        setDistrictFilter,
        sizeFilter,
        setSizeFilter,
        alphaFilter,
        setAlphaFilter,
        kekFilter,
        setKekFilter,
        fomoFilter,
        setFomoFilter,
        fudFilter,
        setFudFilter
    } = useContext(BaazaarContext);

    useEffect(() => {
        runInstantFiltering();
    }, [districtFilter, sizeFilter])

    return (
        <Grid container spacing={2} className={classes.rootContainer}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl variant='outlined' className={classes.formControl}>
                                    <InputLabel>District</InputLabel>
                                    <Select
                                        label={'District'}
                                        value={districtFilter}
                                        fullWidth
                                        size={"small"}
                                        onChange={(event) => {
                                            setDistrictFilter(event.target.value);
                                        }}
                                    >
                                        <MenuItem value={0}>All</MenuItem>
                                        {
                                            districts.map((item, index) => {
                                                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                                                })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    value={sizeFilter}
                                    exclusive
                                    onChange={(event) => {
                                        setSizeFilter(event.target.value);
                                    }}
                                    color='primary'
                                    aria-label='gotchis sort'
                                    fullWidth
                                    size={'small'}
                                >
                                    <ToggleButton className={classes.toggleItem} value={'4'} aria-label='modified rarity score'>
                                        All
                                    </ToggleButton>
                                    <ToggleButton className={classes.toggleItem} value={'0'} aria-label='modified rarity score'>
                                        8x8
                                    </ToggleButton>
                                    <ToggleButton className={classes.toggleItem} value={'1'} aria-label='modified rarity score'>
                                        16x16
                                    </ToggleButton>
                                    <ToggleButton className={classes.toggleItem} value={'2'} aria-label='modified rarity score'>
                                        64x32
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    className={classNames(classes.field, classes.smallInput)}
                                    type='text'
                                    variant='outlined'
                                    fullWidth
                                    size={'small'}
                                    label={<span className='booster'><img src={fud}/> min</span>}
                                    value={fudFilter}
                                    onChange={(event) => {
                                        if (event.target.value && event.target.value >= 0) {
                                            setFudFilter(event.target.value);
                                        } else {
                                            setFudFilter('');
                                        }
                                        runFilterWatcher();
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classNames(classes.field, classes.smallInput)}
                                    type='text'
                                    variant='outlined'
                                    fullWidth
                                    size={'small'}
                                    label={<span className='booster'><img src={fomo}/> min</span>}
                                    value={fomoFilter}
                                    onChange={(event) => {
                                        if (event.target.value && event.target.value >= 0) {
                                            setFomoFilter(event.target.value);
                                        } else {
                                            setFomoFilter('');
                                        }
                                        runFilterWatcher();
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classNames(classes.field, classes.smallInput)}
                                    type='text'
                                    variant='outlined'
                                    fullWidth
                                    size={'small'}
                                    label={<span className='booster'><img src={alpha}/> min</span>}
                                    value={alphaFilter}
                                    onChange={(event) => {
                                        if (event.target.value && event.target.value >= 0) {
                                            setAlphaFilter(event.target.value);
                                        } else {
                                            setAlphaFilter('');
                                        }
                                        runFilterWatcher();
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classNames(classes.field, classes.smallInput)}
                                    type='text'
                                    variant='outlined'
                                    fullWidth
                                    size={'small'}
                                    label={<span className='booster'><img src={kek}/> min</span>}
                                    value={kekFilter}
                                    onChange={(event) => {
                                        if (event.target.value && event.target.value >= 0) {
                                            setKekFilter(event.target.value);
                                        } else {
                                            setKekFilter('');
                                        }
                                        runFilterWatcher();
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
