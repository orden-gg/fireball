import React, {useContext, useState} from "react";
import {Button, Grid, Slider} from "@mui/material";
import { BaazaarContext } from '../../../../../../contexts/BaazaarContext';

import classNames from "classnames";

import styles from "./styles";


let traitsEmojis = {
    NRG: '⚡️',
    AGG: '👹',
    SPK: '👻',
    BRN: '🧠',
    EYS: '👀',
    EYC: '👁'
};

export default function TraitSlider({type, runFilterWatcher}) {
    const classes = styles();
    const [sliderRange, setSliderRange] = useState([0,99]);
    const { changeSingleStat } = useContext(BaazaarContext);

    const onSliderChange = (event, value) => {
        setSliderRange(value);
        changeSingleStat(type, value);
        executeFilterWatching();
    };

    const executeFilterWatching = () => {
        runFilterWatcher();
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={2}>
                {traitsEmojis[type]}
            </Grid>
            <Grid item xs={10}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Slider
                            className={classes.slider}
                            min={0}
                            max={99}
                            value={sliderRange}
                            onChange={(event, value) => onSliderChange(null, value)}
                            valueLabelDisplay="auto"
                            disableSwap
                            size={'small'}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.traitsContainer}>
                        <Grid container>
                            <Grid item xs={6} className={classes.checkRangeOuter}>
                                <Button
                                    className={classNames(classes.checkRange, 'rare')}
                                    size={'small'}
                                    fullWidth
                                    onClick={() => {
                                        onSliderChange(null,[2, 9]);
                                        executeFilterWatching();
                                    }}
                                >
                                    Rare low
                                </Button>
                            </Grid>
                            <Grid item xs={6} className={classes.checkRangeOuter}>
                                <Button
                                    className={classNames(classes.checkRange, 'rare')}
                                    size={'small'}
                                    fullWidth
                                    onClick={() => {
                                        onSliderChange(null,[91, 97]);
                                        executeFilterWatching();
                                    }}
                                >
                                    Rare high
                                </Button>
                            </Grid>
                            <Grid item xs={6} className={classes.checkRangeOuter}>
                                <Button
                                    className={classes.checkRange}
                                    size={'small'}
                                    fullWidth
                                    onClick={() => {
                                        onSliderChange(null,[0, 1]);
                                        executeFilterWatching();
                                    }}
                                >
                                    Myth low
                                </Button>
                            </Grid>
                            <Grid item xs={6} className={classes.checkRangeOuter}>
                                <Button
                                    className={classes.checkRange}
                                    size={'small'}
                                    fullWidth
                                    onClick={() => {
                                        onSliderChange(null,[98, 99]);
                                        executeFilterWatching();
                                    }}
                                >
                                    Myth high
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
