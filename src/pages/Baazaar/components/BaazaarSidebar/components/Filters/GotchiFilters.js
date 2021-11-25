import React, { useContext, useEffect, useState } from "react";
import {
    Grid,
    Checkbox,
    Chip,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import useStyles from "./styles";
import Stats from "./Stats";
import Name from "./Name";
import Id from "./Id";
import classNames from 'classnames';
import { baazaarFilteringTypes } from '../../../../../../data/types';

export default function GotchiFilters({runFilterWatcher, runInstantFiltering}) {
    const classes = useStyles();
    const [chips, setChips] = useState([]);
    const [fastSearch, setFastSearch] = useState(true);
    const {filteringType, setFilteringType, exactMatch, setExactMatch, stats, removeStat, clearAllStats} = useContext(BaazaarContext);

    const getChips = () => {
        let chipsList = [];

        for (let chip in stats) {
            if (stats.hasOwnProperty(chip)) {
                stats[chip].forEach((item, id) => {
                    chipsList.push({
                        name: chip,
                        value: item,
                        id
                    })
                });
            }
        }

        return chipsList;
    };

    const onFilteringTypeChange = (event, value) => {
        setFilteringType(value);
        clearAllStats();
        runFilterWatcher();
    };

    const onExactMatchChange = () => {
        setExactMatch(!exactMatch);
        runFilterWatcher();
    };

    const onChipDelete = (event) => {
        removeStat(event);
        runFilterWatcher();
    };

    useEffect(() => {
        setChips(getChips())
    }, [stats]);

    useEffect(() => {
        runInstantFiltering();
    }, [exactMatch]);

    return (
        <Grid container spacing={2} className={classes.rootContainer} direction={'column'}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            value={filteringType}
                            exclusive
                            onChange={(event, value) => onFilteringTypeChange(event, value)}
                            color='primary'
                            aria-label='gotchis sort'
                            fullWidth
                            size={'small'}
                        >
                            <ToggleButton className={classes.toggleItem} value={baazaarFilteringTypes.stats} aria-label='modified rarity score'>
                                Stats
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={baazaarFilteringTypes.name} aria-label='modified rarity score'>
                                Name
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={baazaarFilteringTypes.id} aria-label='modified rarity score'>
                                Id
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            filteringType === baazaarFilteringTypes.stats && <Stats
                                fastSearch={fastSearch}
                                setFastSearch={setFastSearch}
                                runFilterWatcher={runFilterWatcher}
                                runInstantFiltering={runInstantFiltering}
                            />
                        }
                        {
                            (filteringType === baazaarFilteringTypes.name || filteringType === baazaarFilteringTypes.id) &&
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    {
                                        filteringType === baazaarFilteringTypes.name && <Name runFilterWatcher={runFilterWatcher} />
                                    }
                                    {
                                        filteringType === baazaarFilteringTypes.id && <Id runFilterWatcher={runFilterWatcher} />
                                    }
                                </Grid>
                                <Grid item xs={5}>
                                    <Checkbox
                                        edge="start"
                                        size={'small'}
                                        checked={exactMatch}
                                        onClick={onExactMatchChange}
                                    />
                                    <span className={classes.checkboxLabel}>Exact</span>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    {
                        (!fastSearch && !!chips.length && filteringType === baazaarFilteringTypes.stats) && <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid
                                    item xs={12}
                                    className={classes.stackOfChipsOuter}
                                >
                                    <div className={classNames(classes.stackOfChips, "custom-scroll")}>
                                        {
                                            chips.map((item, id) => {
                                                return <Chip
                                                    className={classes.singleChip}
                                                    key={id}
                                                    label={item.name + ": " + item.value[0] + "-" + item.value[1]}
                                                    variant="outlined"
                                                    onDelete={() => onChipDelete(item)}
                                                />
                                            })
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}
