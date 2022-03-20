import React, { useContext } from 'react';
import {
    Grid, Box, FormControl, InputLabel, MenuItem, Select,
    TextField, ToggleButton, Tooltip, ToggleButtonGroup, Typography
} from '@mui/material';
import { BaazaarContext } from 'contexts/BaazaarContext';
import { listingTypes } from 'data/types';

import GotchiFilters from './components/Filters/GotchiFilters';
import RealmFilters from './components/Filters/RealmFilters';
import gotchiPlaceholder from 'assets/images/gotchi-placeholder.svg';
import warehousePlaceholder from 'assets/images/wearables/15.svg';
import ticketsPlaceholder from 'assets/images/tickets/rare.svg';
import realmPlaceholder from 'assets/images/icons/kek.png';
import closedPortals from 'assets/images/portals/h1-sealed.svg';
import openedPortals from 'assets/images/portals/h1-open.svg';
import consumables from 'assets/images/wearables/127.svg';
import activity from 'assets/images/icons/activity.svg';
import listing from 'assets/images/icons/listing.svg';
import sold from 'assets/images/icons/sold.svg';
import purchased from 'assets/images/icons/purchase.svg';
import baazaar from 'assets/images/baazaar.png';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ghst from 'assets/images/animated/ghst-token.gif';

import styles from './styles';

export default function BaazaarSidebar({runFilterWatcher, runInstantFiltering, setSelectedLocalGoods, setPage}) {
    const classes = styles();
    const { setSortingOrder, selectedGoodsType, setSelectedGoodsType, priceFrom, setPriceFrom, priceTo, setPriceTo, rarity, setRarity, sortingOrder, selectedListingType, setSelectedListingType } = useContext(BaazaarContext);

    const onRarityChange = (event) => {
        setRarity(event.target.value);
    };

    const onTypeChange = (event, value) => {
        if (value && selectedGoodsType !== value) {
            setPage(1);
            setSelectedLocalGoods([]);
            setSelectedGoodsType(value);
        }
    };

    const onListingTypeChange = (event, value) => {
        if (value && selectedGoodsType !== value) {
            setPage(1);
            setSelectedLocalGoods([]);
            setSelectedListingType(value);
        }
    }

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
                            className={classes.mainToggleTop}
                        >
                            <ToggleButton className={classes.toggleItem} value={listingTypes.aavegotchi} aria-label='modified rarity score'>
                                <Tooltip title='Aavegotchi' placement='top' followCursor>
                                    <img src={gotchiPlaceholder} alt='gotchi' />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.closedPortal} aria-label='modified rarity score'>
                                <Tooltip title='Closed portals' placement='top' followCursor>
                                    <img src={closedPortals} alt='closed-portals' />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.wearable} aria-label='modified rarity score'>
                                <Tooltip title='Wearables' placement='top' followCursor>
                                    <img src={warehousePlaceholder} alt='warehouse' />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.consumable} aria-label='modified rarity score'>
                                <Tooltip title='Consumables' placement='top' followCursor>
                                    <img src={consumables} alt='consumables' />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.tickets} aria-label='modified rarity score'>
                                <Tooltip title='Tickets' placement='top' followCursor>
                                    <img src={ticketsPlaceholder} alt='tickets' />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.realm} aria-label='modified rarity score'>
                                <Tooltip title='Realm' placement='top' followCursor>
                                    <img src={realmPlaceholder} alt='realm' />
                                </Tooltip>
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup
                            value={selectedGoodsType}
                            exclusive
                            onChange={(event, value) => onTypeChange(event, value)}
                            color='primary'
                            aria-label='gotchis sort'
                            fullWidth
                            size={'small'}
                            className={classes.mainToggleBottom}
                        >
                            <ToggleButton className={classes.toggleItem} value={listingTypes.activity} aria-label='modified rarity score'>
                                <Tooltip title='Activity' placement='top' followCursor>
                                    <img src={activity} alt='activity' />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.listing} aria-label='modified rarity score'>
                                <Tooltip title='Listing' placement='top' followCursor>
                                    <img src={listing} alt='listing' />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.sold} aria-label='modified rarity score'>
                                <Tooltip title='Sold' placement='top' followCursor>
                                    <img src={sold} alt='sold' />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.toggleItem} value={listingTypes.purchased} aria-label='modified rarity score'>
                                <Tooltip title='Purchased' placement='top' followCursor>
                                    <img src={purchased} alt='purchased' />
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
                        ]) && <Grid item xs={12}>
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
                                    <img src={ghst} alt='ghst' />
                                    <ArrowDownwardIcon />
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={'priceInWei-desc'} aria-label='modified rarity score'>
                                    <img src={ghst} alt='ghst' />
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
                        ]) && <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
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
                                <Grid item xs={2} className={classes.priceFilter}>
                                    <img src={ghst} alt='ghst' />
                                </Grid>
                                <Grid item xs={5}>
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
                        ]) && <Grid item xs={12}>
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
                    {
                        checkContainerVisibility([
                            listingTypes.activity,
                            listingTypes.sold,
                            listingTypes.listing,
                            listingTypes.purchased
                        ]) && <Grid item xs={12}>
                            <ToggleButtonGroup
                                value={selectedListingType}
                                exclusive
                                onChange={(event, value) => onListingTypeChange(event, value)}
                                color='primary'
                                aria-label='gotchis sort'
                                fullWidth
                                size={'medium'}
                                orientation='vertical'
                                className={classes.verticalToggle}
                            >
                                <ToggleButton className={classes.toggleItem} value={listingTypes.all} aria-label='modified rarity score'>
                                    <Tooltip title='All items' placement='top' followCursor>
                                        <>
                                            <img src={baazaar} alt='baazaar' />
                                            <Typography variant='caption'>All items</Typography>
                                        </>
                                    </Tooltip>
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={listingTypes.aavegotchi} aria-label='modified rarity score'>
                                    <Tooltip title='Aavegotchi' placement='top' followCursor>
                                        <>
                                            <img src={gotchiPlaceholder} alt='gotchi' />
                                            <Typography variant='caption'>Aavegotchi</Typography>
                                        </>
                                    </Tooltip>
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={listingTypes.closedPortal} aria-label='modified rarity score'>
                                    <Tooltip title='Sealed portals' placement='top' followCursor>
                                        <>
                                            <img src={closedPortals} alt='sealed-portals' />
                                            <Typography variant='caption'>Sealed portals</Typography>
                                        </>
                                    </Tooltip>
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={listingTypes.openedPortal} aria-label='modified rarity score'>
                                    <Tooltip title='Opened portals' placement='top' followCursor>
                                        <>
                                            <img src={openedPortals} alt='opened-portals' />
                                            <Typography variant='caption'>Opened portals</Typography>
                                        </>
                                    </Tooltip>
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={listingTypes.wearable} aria-label='modified rarity score'>
                                    <Tooltip title='Wearables' placement='top' followCursor>
                                        <>
                                            <img src={warehousePlaceholder} alt='wearables' />
                                            <Typography variant='caption'>Wearables</Typography>
                                        </>
                                    </Tooltip>
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={listingTypes.consumable} aria-label='modified rarity score'>
                                    <Tooltip title='Consumables' placement='top' followCursor>
                                        <>
                                            <img src={consumables} alt='consumables' />
                                            <Typography variant='caption'>Consumables</Typography>
                                        </>
                                    </Tooltip>
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={listingTypes.tickets} aria-label='modified rarity score'>
                                    <Tooltip title='Tickets' placement='top' followCursor>
                                        <>
                                            <img src={ticketsPlaceholder} alt='tickets' />
                                            <Typography variant='caption'>Tickets</Typography>
                                        </>
                                    </Tooltip>
                                </ToggleButton>
                                <ToggleButton className={classes.toggleItem} value={listingTypes.realm} aria-label='modified rarity score'>
                                    <Tooltip title='Realm' placement='top' followCursor>
                                        <>
                                            <img src={realmPlaceholder} alt='realm' />
                                            <Typography variant='caption'>Realm</Typography>
                                        </>
                                    </Tooltip>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    }
                </Grid>
            </Box>
        </Grid>
    );
}
