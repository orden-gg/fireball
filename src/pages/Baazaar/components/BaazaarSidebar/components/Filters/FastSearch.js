import React from "react";
import { Grid } from "@mui/material";
import TraitSlider from "./TraitSlider";

export default function AdvancedSearch({runFilterWatcher}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TraitSlider
                    type={'NRG'}
                    runFilterWatcher={runFilterWatcher}
                />
            </Grid>
            <Grid item xs={12}>
                <TraitSlider
                    type={'AGG'}
                    runFilterWatcher={runFilterWatcher}
                />
            </Grid>
            <Grid item xs={12}>
                <TraitSlider
                    type={'SPK'}
                    runFilterWatcher={runFilterWatcher}
                />
            </Grid>
            <Grid item xs={12}>
                <TraitSlider
                    type={'BRN'}
                    runFilterWatcher={runFilterWatcher}
                />
            </Grid>
            <Grid item xs={12}>
                <TraitSlider
                    type={'EYS'}
                    runFilterWatcher={runFilterWatcher}
                />
            </Grid>
            <Grid item xs={12}>
                <TraitSlider
                    type={'EYC'}
                    runFilterWatcher={runFilterWatcher}
                />
            </Grid>
        </Grid>
    );
}
