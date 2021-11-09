import React, { useContext } from 'react';
import { Grid, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { BaazaarContext } from "../../../../contexts/BaazaarContext";
import { listingTypes } from "../../../../data/types";
import useStyles from './styles';

export default function BaazaarSidebar({loadBaazaarGoods}) {
    const classes = useStyles();
    const { setSortingOrder, selectedGoodsType, setSelectedGoodsType, priceFrom, setPriceFrom, priceTo, setPriceTo, rarity, setRarity, sortingOrder } = useContext(BaazaarContext);

    const onLoadClick = () => {
        loadBaazaarGoods();
    };

    const onRarityChange = (event) => {
        setRarity(event.target.value);
    };

    const onTypeChange = (event) => {
        setSelectedGoodsType(event.target.value);
    };

    const onSortByChange = (event) => {
        setSortingOrder(event.target.value);
    };

    const onPriceFromChange = (event) => {
        setPriceFrom(event.target.value);
    };

    const onPriceToChange = (event) => {
        setPriceTo(event.target.value);
    };

    return (
        <Grid className={classes.sidebar} item xs={12} sm={12} md={3} lg={3} xl={2}>
            <Box className={classes.sidebarInner}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography className={classes.filterTitle} variant={'caption'}>Sort by</Typography>
                    </Grid>
                    <Grid className={classes.filterWrap} item xs={12}>
                        <FormControl variant='outlined' className={classes.formControl}>
                            <InputLabel>Sort by</InputLabel>
                            <Select
                                label='Sort by'
                                value={sortingOrder}
                                onChange={onSortByChange}
                            >
                                <MenuItem value={'priceInWei-asc'}>Price: lowest first</MenuItem>
                                <MenuItem value={'priceInWei-desc'}>Price: highest first</MenuItem>
                                <MenuItem value={'timeCreated-desc'}>Latest</MenuItem>
                                <MenuItem value={'timeCreated-asc'}>Oldest</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.filterTitle} variant={'caption'}>Price</Typography>
                    </Grid>
                    <Grid className={classes.filterWrap} item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    value={priceFrom}
                                    label='From'
                                    variant='outlined'
                                    onChange={onPriceFromChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    value={priceTo}
                                    label='To'
                                    variant='outlined'
                                    onChange={onPriceToChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.filterTitle} variant={'caption'}>Type</Typography>
                    </Grid>
                    <Grid className={classes.filterWrap} item xs={12}>
                        <FormControl variant='outlined' className={classes.formControl}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                label='Type'
                                value={selectedGoodsType}
                                onChange={onTypeChange}
                            >
                                <MenuItem value={listingTypes.aavegotchi}>Aavegotchi</MenuItem>
                                <MenuItem value={listingTypes.closedPortal}>Closed portal</MenuItem>
                                <MenuItem value={listingTypes.wearable}>Wearable</MenuItem>
                                <MenuItem value={listingTypes.consumable}>Consumable</MenuItem>
                                <MenuItem value={listingTypes.tickets}>Tickets</MenuItem>
                                <MenuItem value={listingTypes.realm}>Realm</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.filterTitle} variant={'caption'}>Rarity</Typography>
                    </Grid>
                    <Grid className={classes.filterWrap} item xs={12}>
                        <FormControl variant='outlined' className={classes.formControl}>
                            <InputLabel>Rarity</InputLabel>
                            <Select
                                label='Rarity'
                                value={rarity}
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
                    <Grid item xs={12}>
                        <Button
                            className={classes.applyButton}
                            color={'secondary'}
                            variant={'contained'}
                            fullWidth
                            onClick={() => onLoadClick()}
                        >
                            Load
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}
