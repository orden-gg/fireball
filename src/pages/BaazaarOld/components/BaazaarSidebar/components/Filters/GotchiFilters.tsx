import { useContext, useEffect, useState } from 'react';
import { Grid, Checkbox, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import classNames from 'classnames';

import { BaazaarFilteringTypes } from 'shared/constants';
import { BaazaarContext } from 'contexts/BaazaarContext';

import { Id } from './Id';
import { Name } from './Name';
import { Stats } from './Stats';

import { styles } from './styles';

interface GotchiFiltersProps {
    runFilterWatcher: () => void;
    runInstantFiltering: () => void;
}

export function GotchiFilters({ runFilterWatcher, runInstantFiltering }: GotchiFiltersProps) {
    const classes = styles();

    const [chips, setChips] = useState<any[]>([]);
    const [fastSearch, setFastSearch] = useState<boolean>(true);
    const { filteringType, setFilteringType, exactMatch, setExactMatch, stats, removeStat, clearAllStats } = useContext<any>(BaazaarContext);

    const getChips = (): any[] => {
        const chipsList: any[] = [];

        for (const chip in stats) {
            if (stats.hasOwnProperty(chip)) {
                stats[chip].forEach((item: any, index: number) => {
                    chipsList.push({
                        name: chip,
                        value: item,
                        index
                    });
                });
            }
        }

        return chipsList;
    };

    const onFilteringTypeChange = (event: any, value: any): void => {
        setFilteringType(value);
        clearAllStats();
        runFilterWatcher();
    };

    const onExactMatchChange = (): void => {
        setExactMatch(!exactMatch);
        runFilterWatcher();
    };

    const onChipDelete = (event: any): void => {
        removeStat(event);
        runFilterWatcher();
    };

    useEffect(() => {
        setChips(getChips());
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
                            <ToggleButton className={classes.toggleItem} value={BaazaarFilteringTypes.Stats} aria-label='modified rarity score'>
                                Stats
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={BaazaarFilteringTypes.Name} aria-label='modified rarity score'>
                                Name
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={BaazaarFilteringTypes.Id} aria-label='modified rarity score'>
                                Id
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            filteringType === BaazaarFilteringTypes.Stats && <Stats
                                fastSearch={fastSearch}
                                setFastSearch={setFastSearch}
                                runFilterWatcher={runFilterWatcher}
                                runInstantFiltering={runInstantFiltering}
                            />
                        }
                        {
                            (filteringType === BaazaarFilteringTypes.Name || filteringType === BaazaarFilteringTypes.Id) &&
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    {
                                        filteringType === BaazaarFilteringTypes.Name && <Name runFilterWatcher={runFilterWatcher} />
                                    }
                                    {
                                        filteringType === BaazaarFilteringTypes.Id && <Id runFilterWatcher={runFilterWatcher} />
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
                        (!fastSearch && !!chips.length && filteringType === BaazaarFilteringTypes.Stats) && <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid
                                    item xs={12}
                                    className={classes.stackOfChipsOuter}
                                >
                                    <div className={classNames(classes.stackOfChips, 'custom-scroll')}>
                                        {
                                            chips.map((item: any, index: number) => {
                                                return <Chip
                                                    className={classes.singleChip}
                                                    key={index}
                                                    label={item.name + ': ' + item.value[0] + ' <> ' + item.value[1]}
                                                    variant="outlined"
                                                    onDelete={() => onChipDelete(item)}
                                                />;
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
