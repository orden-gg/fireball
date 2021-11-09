import React, { useContext } from "react";
import {Grid, Button, InputLabel, Select, MenuItem, FormControl, TextField} from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import useStyles from "./styles";
import {fomo, fud, kek, alpha} from "../../../../../../data/icons";

const districts = [1,2,3,4,5,14,15,16,17,18,19,20,21,22,39,40,41,42,43];

export default function RealmFilters({handleFindClick}) {
    const classes = useStyles();

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

    const onFindClick = () => {
        handleFindClick();
    };

    return (
        <Grid container spacing={2} className={classes.rootContainer}>
            <Grid item xs={12} md={10}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                            <Grid item xs={6}>
                                <FormControl variant='outlined' className={classes.formControl}>
                                    <InputLabel>Size</InputLabel>
                                    <Select
                                        label={'Size'}
                                        value={sizeFilter}
                                        fullWidth
                                        size={"small"}
                                        onChange={(event) => {
                                            setSizeFilter(event.target.value);
                                        }}
                                    >
                                        <MenuItem value={'4'}>All</MenuItem>
                                        <MenuItem value={'0'}>8x8</MenuItem>
                                        <MenuItem value={'1'}>16x16</MenuItem>
                                        <MenuItem value={'2'}>64x32</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    className={classes.field}
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
                                            setFudFilter(null);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    className={classes.field}
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
                                            setFomoFilter(null);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    className={classes.field}
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
                                            setAlphaFilter(null);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    className={classes.field}
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
                                            setKekFilter(null);
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button
                    variant={"contained"}
                    color={'primary'}
                    fullWidth
                    onClick={() => onFindClick()}
                >Filter</Button>
            </Grid>
        </Grid>
    );
}
