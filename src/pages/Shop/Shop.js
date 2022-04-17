import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import queryString from 'query-string'

import {
    BaazarIcon,
    ConsumableIcon,
    GotchiIcon,
    H1SealedPortalIcon,
    KekIcon,
    RareTicketIcon,
    WarehouseIcon
} from 'components/Icons/Icons';
import Consumable from 'components/Items/Consumable/Consumable';
import Gotchi from 'components/Gotchi/Gotchi';
import Parcel from 'components/Items/Parcel/Parcel';
import Portal from 'components/Items/Portal/Portal';
import Ticket from 'components/Items/Ticket/Ticket';
import Wearable from 'components/Items/Wearable/Wearable';
import ethersApi from 'api/ethers.api';
import thegraph from 'api/thegraph.api';
import commonUtils from 'utils/commonUtils';
import itemUtils from 'utils/itemUtils';
import { Erc721Categories, Erc1155Categories } from 'data/types';

import styles from './styles';

import ListingTitle from './components/ListingTitle';

export default function Shop() {
    const classes = styles();

    const history = useHistory();
    const location = useLocation();

    const params = queryString.parse(location.search);

    const [isListingsLoading, setIsListingsLoading] = useState(false);
    const [isListingsEmpty, setIsListingsEmpty] = useState(true);
    const [currentAddress, setCurrentAddress] = useState('');
    const [gotchis, setGotchis] = useState([]);
    const [wearables, setWearables] = useState([]);
    const [parcels, setParcels] = useState([]);
    const [portals, setPortals] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [consumables, setConsumables] = useState([]);

    useEffect(() => {
        if (ethersApi.isEthAddress(params.address)) {
            setCurrentAddress(params.address);
        }
    }, [params.address, setCurrentAddress]);

    useEffect(() => {
        if (ethersApi.isEthAddress(currentAddress)) {
            let mounted = true;

            setEmptyListings();
            setIsListingsLoading(true);

            Promise.all([
                thegraph.getErc721ListingsBySeller(currentAddress),
                thegraph.getErc1155ListingsBySeller(currentAddress)
            ]).then(([erc721Listings, erc1155Listings]) => {
                if (mounted) {
                    const isListingsEmpty = erc721Listings.length === 0 && erc1155Listings.length === 0;

                    setIsListingsEmpty(isListingsEmpty);

                    if (isListingsEmpty) {
                        setEmptyListings();
                    } else {
                        handleSetErc721Listings(erc721Listings);
                        handleSetErc1155Listings(erc1155Listings);
                    }
                }
            }).catch(error => {
                if (mounted) {
                    console.log(error);

                    setEmptyListings();
                }
            }).finally(() => {
                if (mounted) {
                    setIsListingsLoading(false)
                }
            });

            return () => mounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAddress]);

    const setEmptyListings = () => {
        setGotchis([]);
        setParcels([]);
        setPortals([]);
        setWearables([]);
        setTickets([]);
        setConsumables([]);
    }

    const handleSetErc721Listings = (listings) => {
        const listedGotchis = listings
            .filter(listing => listing.category === Erc721Categories.Aavegotchi)
            .map(listing => listing.gotchi);
        const sortedGotchis = commonUtils.basicSort(listedGotchis, 'baseRarityScore', 'desc')

        const listedParcels = listings
            .filter(listing => listing.category === Erc1155Categories.Realm)
            .map(listing => ({
                ...listing.parcel,
                priceInWei: listing.priceInWei,
                baazaarId: listing.id,
                historicalPrices: Boolean(listing.parcel.historicalPrices) ? listing.parcel.historicalPrices : [],
                listings: [{
                    id: listing.parcel.tokenId,
                    priceInWei: listing.priceInWei
                }]
            }));
        const sortedParcels = commonUtils.basicSort(listedParcels, 'size', 'desc');

        const listedPortals = listings
            .filter(listing => listing.category === Erc721Categories.ClosedPortal || listing.category === Erc721Categories.OpenedPortal)
            .map(listing => ({
                priceInWei: listing.priceInWei,
                category: listing.category,
                tokenId: listing.tokenId,
                portal: {
                    hauntId: listing.portal.hauntId
                },
                historicalPrices: Boolean(listing.portal.historicalPrices) ? listing.portal.historicalPrices : [],
                listings: [{
                    id: listing.tokenId,
                    priceInWei: listing.priceInWei
                }]
            }));
        const sortedPortals = commonUtils.basicSort(listedPortals, 'tokenId', 'asc');

        setGotchis(sortedGotchis);
        setParcels(sortedParcels);
        setPortals(sortedPortals);
    }

    const handleSetErc1155Listings = (listings) => {
        const listedWearables = listings
            .filter(listing => listing.category === Erc1155Categories.Wearable)
            .map(listing => ({
                ...mapWearableAndTicket(listing)
            }));
        const sortedWearables = commonUtils.basicSort(listedWearables, 'rarityId', 'desc');

        const listedTickets = listings
            .filter(listing => listing.category === Erc1155Categories.Ticket)
            .map(listing => ({
                ...mapWearableAndTicket(listing),
                erc1155TypeId: listing.erc1155TypeId,
            }));
        const sortedTickets = commonUtils.basicSort(listedTickets, 'rarityId', 'desc');

        const listedConsumables = listings
            .filter(listing => listing.category === Erc1155Categories.Consumable)
            .map(listing => ({
                id: parseInt(listing.erc1155TypeId, 10),
                balance: parseInt(listing.quantity, 10),
                listing: listing.id,
                price: ethersApi.fromWei(listing.priceInWei)
            }));

        setWearables(sortedWearables);
        setTickets(sortedTickets);
        setConsumables(listedConsumables);
    }

    const mapWearableAndTicket = (listing) => {
        return {
            id: parseInt(listing.erc1155TypeId, 10),
            balance: parseInt(listing.quantity, 10),
            category: 0,
            listing: listing.id,
            rarity: itemUtils.getItemRarityById(listing.erc1155TypeId),
            rarityId: listing.rarityLevel,
            priceInWei: listing.priceInWei,
            price: ethersApi.fromWei(listing.priceInWei)
        }
    }

    const onAddressChange = (address) => {
        setCurrentAddress(address);

        if (ethersApi.isEthAddress(address)) {
            history.push({ path: location.pathname, search: `?address=${address}` });
        }
    }

    const loaderRender = () => {
        if (isListingsLoading) {
            return (
                <div className={classes.loaderBox}>
                    <CircularProgress color='primary' />
                </div>
            );
        } else if (isListingsEmpty && ethersApi.isEthAddress(currentAddress)) {
            return <Typography className={classes.noListings} variant='caption'>No listings here :(</Typography>;
        }
    }

    return (
        <div className={classes.container}>
            <IconButton className={classes.backButton} onClick={() => { history.push('/') }} >
                <ArrowBackIcon />
            </IconButton>

            <div className={classes.header}>
                <BaazarIcon className={classes.headerLogo} />
                <TextField
                    className={classes.shopAddress}
                    variant='outlined'
                    label='Shop address'
                    value={currentAddress}
                    onChange={event => onAddressChange(event.target.value)}
                ></TextField>
            </div>

            { loaderRender() }

            {
                Boolean(gotchis.length) && <ListingTitle icon={<GotchiIcon width={32} height={32} />} title='Gotchis' />
            }

            <div className={classes.list}>
                {
                    gotchis.map(gotchi =>
                        <div className={classes.listItem} key={gotchi.id}>
                            <Gotchi
                                gotchi={gotchi}
                                render={[
                                    {
                                        badges: [
                                            'collateral',
                                            'rs',
                                            'skillpoints',
                                            'kinship',
                                            'level'
                                        ]
                                    },
                                    'svg',
                                    'name',
                                    'traits',
                                    'wearablesLine',
                                    'listing',
                                    'rewards'
                                ]}
                            />
                        </div>
                    )
                }
            </div>


            {
                Boolean(wearables.length) && <ListingTitle icon={<WarehouseIcon width={32} height={32} />}title='Wearables' />
            }

            <div className={classes.list}>
                {
                    wearables.map(wearable =>
                        <div className={classes.listItem} key={wearable.listing}>
                            <Wearable wearable={wearable} isShopItem={true} />
                        </div>
                    )
                }
            </div>

            {
                Boolean(parcels.length) && <ListingTitle icon={<KekIcon width={32} height={32} alt='parcel' />} title='Parcels' />
            }

            <div className={classes.list}>
                {
                    parcels.map(parcel =>
                        <div className={classes.listItem} key={parcel.parcelId}>
                            <Parcel parcel={parcel} />
                        </div>
                    )
                }
            </div>

            {
                Boolean(portals.length) && <ListingTitle icon={<H1SealedPortalIcon width={32} height={32} />} title='Portals' />
            }


            <div className={classes.list}>
                {
                    portals.map(portal =>
                        <div className={classes.listItem} key={portal.tokenId}>
                            <Portal portal={portal} isBaazaarCard={true} isShopItem={true} />
                        </div>
                    )
                }
            </div>

            {
                Boolean(tickets.length) && <ListingTitle icon={<RareTicketIcon width={32} height={32} />} title='Tickets' />
            }

            <div className={classes.list}>
                {
                    tickets.map(ticket =>
                        <div className={classes.listItem} key={ticket.listing}>
                            <Ticket ticket={ticket} isShopItem={true} />
                        </div>
                    )
                }
            </div>

            {
                Boolean(consumables.length) && <ListingTitle icon={<ConsumableIcon width={32} height={32} />} title='Consumables' />
            }

            <div className={classes.list}>
                {
                    consumables.map(consumable =>
                        <div className={classes.listItem} key={consumable.listing}>
                            <Consumable consumable={consumable} isShopItem={true} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
