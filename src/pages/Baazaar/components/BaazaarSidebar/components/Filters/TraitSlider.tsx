import { useContext, useState } from 'react';
import { Button, Grid, Slider } from '@mui/material';
import classNames from 'classnames';

import { BaazaarContext } from 'contexts/BaazaarContext';

import styles from './styles';

const traitsEmojis = {
    NRG: '⚡️',
    AGG: '👹',
    SPK: '👻',
    BRN: '🧠',
    EYS: '👀',
    EYC: '👁'
};

interface TraitSliderProps {
    type: any;
    runFilterWatcher: () => void;
}

export function TraitSlider({ type, runFilterWatcher }: TraitSliderProps) {
    const classes = styles();

    const [sliderRange, setSliderRange] = useState<number[]>([-20, 120]);
    const { changeSingleStat } = useContext<any>(BaazaarContext);

    const onSliderChange = (event: any, value: any): void => {
        setSliderRange(value);
        changeSingleStat(type, value);
        executeFilterWatching();
    };

    const executeFilterWatching = (): void => {
        runFilterWatcher();
    };

    return (
        <Grid container spacing={1} className={classes.traitsWrapper}>
            <Grid item xs={2}>
                {traitsEmojis[type]}
            </Grid>
            <Grid item xs={10}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Slider
                            className={classes.slider}
                            min={-20}
                            max={120}
                            value={sliderRange}
                            onChange={(event, value) => onSliderChange(null, value)}
                            valueLabelDisplay='auto'
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
