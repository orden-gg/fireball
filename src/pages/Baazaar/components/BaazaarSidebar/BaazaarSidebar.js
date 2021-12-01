import React, { useContext } from 'react';
import {
    Grid, Box, FormControl, InputLabel, MenuItem, Select,
    TextField, ToggleButton, Tooltip, ToggleButtonGroup
} from '@mui/material';
import { BaazaarContext } from "../../../../contexts/BaazaarContext";
import { listingTypes } from "../../../../data/types";

import GotchiFilters from "./components/Filters/GotchiFilters";
import RealmFilters from "./components/Filters/RealmFilters";
import gotchiPlaceholder from '../../../../assets/images/logo.png';
import warehousePlaceholder from '../../../../assets/wearables/15.svg';
import ticketsPlaceholder from '../../../../assets/tickets/rare.svg';
import realmPlaceholder from '../../../../assets/images/icons/kek.png';
import closedPortals from '../../../../assets/images/portal-sealed.svg';
import consumables from '../../../../assets/wearables/127.svg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ghst from '../../../../assets/images/ghst-doubleside.gif';


import styles from './styles';


export default function BaazaarSidebar({runFilterWatcher, runInstantFiltering}) {
    const classes = styles();
    const { setSortingOrder, selectedGoodsType, setSelectedGoodsType, priceFrom, setPriceFrom, priceTo, setPriceTo, rarity, setRarity, sortingOrder } = useContext(BaazaarContext);

    const onRarityChange = (event) => {
        setRarity(event.target.value);
    };

    const onTypeChange = (event, value) => {
        if (value && selectedGoodsType !== value) setSelectedGoodsType(value);
    };

    const onSortByChange = (event, value) => {
        setSortingOrder(value);
    };

    const onPriceFromChange = (event) => {
        setPriceFrom(event.target.value);
        runFilterWatcher();
    };

    const onPriceToChange = (event) => {
        setPriceTo(event.target.value);
        runFilterWatcher();
    };

    const checkContainerVisibility = (visibleContainers) => {
        return visibleContainers.indexOf(selectedGoodsType) !== -1;
    };

    return (
        <Grid className={classes.sidebar} item xs={12} sm={12} md={3} lg={3} xl={2}>
            <Box className={classes.sidebarInner}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            value={selectedGoodsType}
                            exclusive
                            onChange={(event, value) => onTypeChange(event, value)}
                            color='primary'
                            aria-label='gotchis sort'
                            fullWidth
                            size={'small'}
                        >
                            <ToggleButton className={classes.toggleItem} value={listingTypes.aavegotchi} aria-label='modified rarity score'>
                                <Tooltip title='Aavegotchi' placement='top' followCursor>
                                    <img src={gotchiPlaceholder} />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.closedPortal} aria-label='modified rarity score'>
                                <Tooltip title='Closed portals' placement='top' followCursor>
                                    <img src={closedPortals} />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.wearable} aria-label='modified rarity score'>
                                <Tooltip title='Wearables' placement='top' followCursor>
                                    <img src={warehousePlaceholder} />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.consumable} aria-label='modified rarity score'>
                                <Tooltip title='Consumables' placement='top' followCursor>
                                    <img src={consumables} />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.tickets} aria-label='modified rarity score'>
                                <Tooltip title='Tickets' placement='top' followCursor>
                                    <img src={ticketsPlaceholder} />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.realm} aria-label='modified rarity score'>
                                <Tooltip title='Realm' placement='top' followCursor>
                                    <img src={realmPlaceholder} />
                                </Tooltip>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    {
                        checkContainerVisibility([
                            listingTypes.aavegotchi,
                            listingTypes.closedPortal,
                            listingTypes.wearable,
                            listingTypes.consumable,
                            listingTypes.tickets,
                            listingTypes.realm
                        ]) && <Grid className={classes.filterWrap} item xs={12}>
                            <ToggleButtonGroup
                                value={sortingOrder}
                                exclusive
                                onChange={(event, value) => onSortByChange(event, value)}
                                color='primary'
                                aria-label='gotchis sort'
                                fullWidth
                                size={'small'}
                            >
                                <ToggleButton className={classes.toggleItem} value={'priceInWei-asc'} aria-label='modified rarity score'>
                                    <img src={ghst} />
                                    <ArrowDownwardIcon />
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={'priceInWei-desc'} aria-label='modified rarity score'>
                                    <img src={ghst} />
                                    <ArrowUpwardIcon />
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={'timeCreated-desc'} aria-label='modified rarity score'>
                                    <AccessTimeIcon />
                                    <ArrowDownwardIcon />
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={'timeCreated-asc'} aria-label='modified rarity score'>
                                    <AccessTimeIcon />
                                    <ArrowUpwardIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    }
                    {
                        checkContainerVisibility([
                            listingTypes.aavegotchi,
                            listingTypes.closedPortal,
                            listingTypes.wearable,
                            listingTypes.consumable,
                            listingTypes.tickets,
                            listingTypes.realm
                        ]) && <Grid className={classes.filterWrap} item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        className={classes.smallInput}
                                        fullWidth
                                        value={priceFrom}
                                        label='From'
                                        variant='outlined'
                                        size={'small'}
                                        onChange={onPriceFromChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        className={classes.smallInput}
                                        fullWidth
                                        value={priceTo}
                                        label='To'
                                        variant='outlined'
                                        size={'small'}
                                        onChange={onPriceToChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                    {
                        checkContainerVisibility([
                            listingTypes.wearable,
                            listingTypes.consumable,
                            listingTypes.tickets
                        ]) && <Grid className={classes.filterWrap} item xs={12}>
                            <FormControl variant='outlined' className={classes.formControl}>
                                <InputLabel>Rarity</InputLabel>
                                <Select
                                    label='Rarity'
                                    value={rarity}
                                    size={'small'}
                                    onChange={onRarityChange}
                                >
                                    <MenuItem value={''}><em>All</em></MenuItem>
                                    <MenuItem className={classes.common} value={'0'}>Common</MenuItem>
                                    <MenuItem className={classes.uncommon} value={'1'}>Uncommon</MenuItem>
                                    <MenuItem className={classes.rare} value={'2'}>Rare</MenuItem>
                                    <MenuItem className={classes.legendary} value={'3'}>Legendary</MenuItem>
                                    <MenuItem className={classes.mythical} value={'4'}>Mythical</MenuItem>
                                    <MenuItem className={classes.godlike} value={'5'}>Godlike</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    }
                    {
                        checkContainerVisibility([
                            listingTypes.aavegotchi
                        ]) && <Grid item xs={12}>
                            <GotchiFilters runFilterWatcher={runFilterWatcher} runInstantFiltering={runInstantFiltering} />
                        </Grid>
                    }
                    {
                        checkContainerVisibility([
                            listingTypes.realm
                        ]) && <Grid item xs={12}>
                            <RealmFilters runFilterWatcher={runFilterWatcher} runInstantFiltering={runInstantFiltering} />
                        </Grid>
                    }
                </Grid>
            </Box>
        </Grid>
    );
}
