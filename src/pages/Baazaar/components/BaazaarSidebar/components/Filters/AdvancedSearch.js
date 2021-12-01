import React from "react";
import {
    Box,
    Button,
    Grid,
    Slider,
    TextField,
    ToggleButton,
    ToggleButtonGroup, Tooltip
} from "@mui/material";

import styles from "./styles";


export default function AdvancedSearch({selectedTraits, onTraitsChange, sliderRange, onSliderChange, onRangeChange, sliderIsValid, onAddTraitClick}) {
    const classes = styles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ToggleButtonGroup
                    value={selectedTraits}
                    exclusive
                    onChange={(event, value) => onTraitsChange(event, value)}
                    color='primary'
                    aria-label='gotchis sort'
                    fullWidth
                    size={'small'}
                >
                    <ToggleButton className={classes.toggleItem} value={'NRG'} aria-label='modified rarity score'>
                        <Tooltip title='NRG' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>⚡</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={'AGG'} aria-label='modified rarity score'>
                        <Tooltip title='AGG' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>👹</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={'SPK'} aria-label='modified rarity score'>
                        <Tooltip title='SPK' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>👻</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={'BRN'} aria-label='modified rarity score'>
                        <Tooltip title='BRN' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🧠</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={'EYS'} aria-label='modified rarity score'>
                        <Tooltip title='EYS' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>👀</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={'EYC'} aria-label='modified rarity score'>
                        <Tooltip title='EYC' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>👁</span></Box>
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <Slider
                    min={0}
                    max={99}
                    value={sliderRange}
                    onChange={onSliderChange}
                    valueLabelDisplay="auto"
                    disableSwap
                    size={'small'}
                />
            </Grid>
            <Grid item xs={12} className={classes.rangeSliderOuter}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            type='text'
                            variant={"standard"}
                            size={'small'}
                            fullWidth
                            value={sliderRange[0]}
                            onChange={(event) => onRangeChange(event, 0)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type='text'
                            variant={"standard"}
                            size={'small'}
                            fullWidth
                            value={sliderRange[1]}
                            onChange={(event) => onRangeChange(event, 1)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            fullWidth
                            disabled={!sliderIsValid}
                            onClick={onAddTraitClick}
                            size={'small'}
                        >Add</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
