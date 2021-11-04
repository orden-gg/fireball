import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, Checkbox, InputLabel, Select, MenuItem, FormControl, Chip } from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import useStyles from "./styles";
import Stats from "./Stats";
import Name from "./Name";
import Id from "./Id";
import classNames from 'classnames';
import { baazaarFilteringTypes } from '../../../../../../data/types'

export default function Filters({handleFindClick}) {
    const classes = useStyles();
    const [chips, setChips] = useState([]);
    const {filteringType, setFilteringType, exactMatch, setExactMatch, stats, removeStat} = useContext(BaazaarContext);

    const onFindClick = () => {
        handleFindClick();
    };

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

    const onFilteringTypeChange = (event) => {
        setFilteringType(event.target.value);
    };

    const onExactMatchChange = () => {
        setExactMatch(!exactMatch);
    };

    const onChipDelete = (event) => {
        removeStat(event);
    };

    useEffect(() => {
        setChips(getChips())
    }, [stats]);

    return (
        <Grid container spacing={2} className={classes.rootContainer} direction={'column'}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                        <FormControl variant='outlined' className={classes.formControl} size={'small'}>
                            <InputLabel>Filter by</InputLabel>
                            <Select
                                label='Filter by'
                                value={filteringType}
                                onChange={onFilteringTypeChange}
                            >
                                <MenuItem value={baazaarFilteringTypes.stats}>Stats</MenuItem>
                                <MenuItem value={baazaarFilteringTypes.name}>Name</MenuItem>
                                <MenuItem value={baazaarFilteringTypes.id}>Id</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {
                            filteringType === baazaarFilteringTypes.stats && <Stats />
                        }
                        {
                            (filteringType === baazaarFilteringTypes.name || filteringType === baazaarFilteringTypes.id) &&
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    {
                                        filteringType === baazaarFilteringTypes.name && <Name />
                                    }
                                    {
                                        filteringType === baazaarFilteringTypes.id && <Id />
                                    }
                                </Grid>
                                <Grid item xs={4}>
                                    <Checkbox
                                        edge="start"
                                        checked={exactMatch}
                                        onClick={onExactMatchChange}
                                    />
                                    <span className={classes.checkboxLabel}>Exact</span>
                                </Grid>
                            </Grid>
                        }
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
            </Grid>
            {
                (!!chips.length && filteringType === baazaarFilteringTypes.stats) && <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid
                            item xs={12}
                            className={classes.stackOfChipsOuter}
                        >
                            <div className={classNames(classes.stackOfChips, "custom-scroll")}>
                                {
                                    chips.map((item, id) => {
                                        return <Chip
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
    );
}
