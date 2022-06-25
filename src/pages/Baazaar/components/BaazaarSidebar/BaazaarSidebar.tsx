import { useContext } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, TextField, ToggleButton, Tooltip, ToggleButtonGroup, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { ListingTypes } from 'shared/constants';
import {
    ActivityIcon,
    BaazarIcon,
    ConsumableIcon,
    GhstTokenGif,
    GotchiIcon,
    H1OpenedPortalIcon,
    H1SealedPortalIcon,
    KekIcon,
    ListingIcon,
    PurchaseIcon,
    RareTicketIcon,
    SoldIcon,
    WarehouseIcon
} from 'components/Icons/Icons';
import { BaazaarContext } from 'contexts/BaazaarContext';

import { GotchiFilters } from './components/Filters/GotchiFilters';
import { RealmFilters } from './components/Filters/RealmFilters';

import { styles } from './styles';

interface BaazaarSidebarProps {
    runFilterWatcher: () => void;
    runInstantFiltering: () => void;
    setSelectedLocalGoods: (value: any[]) => void;
    setPage: (value:number) => void;
}

export function BaazaarSidebar({ runFilterWatcher, runInstantFiltering, setSelectedLocalGoods, setPage }: BaazaarSidebarProps) {
    const classes = styles();

    const { setSortingOrder, selectedGoodsType, setSelectedGoodsType, priceFrom, setPriceFrom, priceTo, setPriceTo, rarity, setRarity, sortingOrder, selectedListingType, setSelectedListingType } = useContext<any>(BaazaarContext);

    const onRarityChange = (event: any): void => {
        setRarity(event.target.value);
    };

    const onTypeChange = (event: any, value: any): void => {
        if (value && selectedGoodsType !== value) {
            setPage(1);
            setSelectedLocalGoods([]);
            setSelectedGoodsType(value);
        }
    };

    const onListingTypeChange = (event: any, value: any): void => {
        if (value && selectedGoodsType !== value) {
            setPage(1);
            setSelectedLocalGoods([]);
            setSelectedListingType(value);
        }
    };

    const onSortByChange = (event: any, value: any): void => {
        setSortingOrder(value);
    };

    const onPriceFromChange = (event: any): void => {
        setPriceFrom(event.target.value);
        runFilterWatcher();
    };

    const onPriceToChange = (event: any): void => {
        setPriceTo(event.target.value);
        runFilterWatcher();
    };

    const checkContainerVisibility = (visibleContainers: any): any => {
        return visibleContainers.indexOf(selectedGoodsType) !== -1;
    };

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarSection}>
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
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.aavegotchi} aria-label='modified rarity score'>
                        <Tooltip title='Aavegotchi' placement='top' followCursor>
                            <GotchiIcon width={16} height={16} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.closedPortal} aria-label='modified rarity score'>
                        <Tooltip title='Closed portals' placement='top' followCursor>
                            <H1SealedPortalIcon width={16} height={16} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.wearable} aria-label='modified rarity score'>
                        <Tooltip title='Wearables' placement='top' followCursor>
                            <WarehouseIcon width={16} height={16} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.consumable} aria-label='modified rarity score'>
                        <Tooltip title='Consumables' placement='top' followCursor>
                            <ConsumableIcon width={16} height={16} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.tickets} aria-label='modified rarity score'>
                        <Tooltip title='Tickets' placement='top' followCursor>
                            <RareTicketIcon width={16} height={16} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.realm} aria-label='modified rarity score'>
                        <Tooltip title='Realm' placement='top' followCursor>
                            <KekIcon width={16} height={16} alt='realm' />
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
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.activity} aria-label='modified rarity score'>
                        <Tooltip title='Activity' placement='top' followCursor>
                            <ActivityIcon width={16} height={16} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.listing} aria-label='modified rarity score'>
                        <Tooltip title='Listing' placement='top' followCursor>
                            <ListingIcon width={16} height={16} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.sold} aria-label='modified rarity score'>
                        <Tooltip title='Sold' placement='top' followCursor>
                            <SoldIcon width={16} height={16} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.toggleItem} value={ListingTypes.purchased} aria-label='modified rarity score'>
                        <Tooltip title='Purchased' placement='top' followCursor>
                            <PurchaseIcon width={16} height={16} />
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            {
                checkContainerVisibility([
                    ListingTypes.aavegotchi,
                    ListingTypes.closedPortal,
                    ListingTypes.wearable,
                    ListingTypes.consumable,
                    ListingTypes.tickets,
                    ListingTypes.realm
                ]) && <div className={classes.sidebarSection}>
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
                            <GhstTokenGif width={16} height={16} />
                            <ArrowDownwardIcon />
                        </ToggleButton>
                        <ToggleButton className={classes.toggleItem} value={'priceInWei-desc'} aria-label='modified rarity score'>
                            <GhstTokenGif width={16} height={16} />
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
                </div>
            }
            {
                checkContainerVisibility([
                    ListingTypes.aavegotchi,
                    ListingTypes.closedPortal,
                    ListingTypes.wearable,
                    ListingTypes.consumable,
                    ListingTypes.tickets,
                    ListingTypes.realm
                ]) && <div className={classes.sidebarSection}>
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
                            <GhstTokenGif width={25} height={25} />
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
                </div>
            }
            {
                checkContainerVisibility([
                    ListingTypes.wearable,
                    ListingTypes.consumable,
                    ListingTypes.tickets
                ]) && <div className={classes.sidebarSection}>
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
                </div>
            }
            {
                checkContainerVisibility([
                    ListingTypes.aavegotchi
                ]) && <div className={classes.sidebarSection}>
                    <GotchiFilters
                        runFilterWatcher={runFilterWatcher}
                        runInstantFiltering={runInstantFiltering}
                    />
                </div>
            }
            {
                checkContainerVisibility([
                    ListingTypes.realm
                ]) && <RealmFilters
                    runFilterWatcher={runFilterWatcher}
                    runInstantFiltering={runInstantFiltering}
                />
            }
            {
                checkContainerVisibility([
                    ListingTypes.activity,
                    ListingTypes.sold,
                    ListingTypes.listing,
                    ListingTypes.purchased
                ]) && <div>
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
                        <ToggleButton className={classes.toggleItem} value={ListingTypes.all} aria-label='modified rarity score'>
                            <Tooltip title='All items' placement='top' followCursor>
                                <>
                                    <BaazarIcon width={16} height={16} />
                                    <Typography variant='caption'>All items</Typography>
                                </>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.toggleItem} value={ListingTypes.aavegotchi} aria-label='modified rarity score'>
                            <Tooltip title='Aavegotchi' placement='top' followCursor>
                                <>
                                    <GotchiIcon width={16} height={16} />
                                    <Typography variant='caption'>Aavegotchi</Typography>
                                </>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.toggleItem} value={ListingTypes.closedPortal} aria-label='modified rarity score'>
                            <Tooltip title='Sealed portals' placement='top' followCursor>
                                <>
                                    <H1SealedPortalIcon width={16} height={16} />
                                    <Typography variant='caption'>Sealed portals</Typography>
                                </>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.toggleItem} value={ListingTypes.openedPortal} aria-label='modified rarity score'>
                            <Tooltip title='Opened portals' placement='top' followCursor>
                                <>
                                    <H1OpenedPortalIcon width={16} height={16} />
                                    <Typography variant='caption'>Opened portals</Typography>
                                </>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.toggleItem} value={ListingTypes.wearable} aria-label='modified rarity score'>
                            <Tooltip title='Wearables' placement='top' followCursor>
                                <>
                                    <WarehouseIcon width={16} height={16} />
                                    <Typography variant='caption'>Wearables</Typography>
                                </>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.toggleItem} value={ListingTypes.consumable} aria-label='modified rarity score'>
                            <Tooltip title='Consumables' placement='top' followCursor>
                                <>
                                    <ConsumableIcon width={16} height={16} />
                                    <Typography variant='caption'>Consumables</Typography>
                                </>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.toggleItem} value={ListingTypes.tickets} aria-label='modified rarity score'>
                            <Tooltip title='Tickets' placement='top' followCursor>
                                <>
                                    <RareTicketIcon width={16} height={16} />
                                    <Typography variant='caption'>Tickets</Typography>
                                </>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.toggleItem} value={ListingTypes.realm} aria-label='modified rarity score'>
                            <Tooltip title='Realm' placement='top' followCursor>
                                <>
                                    <KekIcon width={16} height={16} alt='realm' />
                                    <Typography variant='caption'>Realm</Typography>
                                </>
                            </Tooltip>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            }
        </div>
    );
}
