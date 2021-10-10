import React, {useContext, useRef, useState} from 'react';
import { Grid, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { BaazaarContext } from "../../../../contexts/BaazaarContext";
import useStyles from './styles';

export default function BaazaarSidebar({loadBaazaarGoods, defaultGoodsType, defaultOrdering, setSelectedGoodsType}) {
    const classes = useStyles();
    const [type, setType] = useState(defaultGoodsType);
    const [rarity, setRarity] = useState('');
    const [ordering, setOrdering] = useState(defaultOrdering);
    const fromRef = useRef();
    const toRef = useRef();
    const { setSortingOrder } = useContext(BaazaarContext);

    const onLoadClick = () => {
        loadBaazaarGoods({
            from: fromRef.current.value,
            to: toRef.current.value,
            type,
            rarity,
            ordering
        });
    };

    const onRarityChange = (event) => {
        setRarity(event.target.value);
    };

    const onTypeChange = (event) => {
        setType(event.target.value);
        setSelectedGoodsType(event.target.value);
    };

    const onSortByChange = (event) => {
        setOrdering(event.target.value);
        setSortingOrder(event.target.value);
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
                                value={ordering}
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
                                <TextField fullWidth inputRef={fromRef} label='From' variant='outlined' />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth inputRef={toRef} label='To' variant='outlined' />
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
                                value={type}
                                onChange={onTypeChange}
                            >
                                <MenuItem value={'erc721Listings-0'}>Closed portal</MenuItem>
                                <MenuItem value={'erc721Listings-2'}>Open portal</MenuItem>
                                <MenuItem value={'erc721Listings-3'}>Aavegotchi</MenuItem>
                                <MenuItem value={'erc1155Listings-0'}>Wearable</MenuItem>
                                <MenuItem value={'erc1155Listings-2'}>Consumable</MenuItem>
                                <MenuItem value={'erc1155Listings-3'}>Tickets</MenuItem>
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
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}
