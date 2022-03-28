import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';

import queryString from 'query-string'

import ethersApi from 'api/ethers.api';
import thegraph from 'api/thegraph.api';
import itemUtils from 'utils/itemUtils';
import { LoginContext } from 'contexts/LoginContext';
import Consumable from 'components/Items/Consumable/Consumable';
import Gotchi from 'components/Gotchi/Gotchi';
import Parcel from 'components/Items/Parcel/Parcel';
import Portal from 'components/Items/Portal/Portal';
import Ticket from 'components/Items/Ticket/Ticket';
import Wearable from 'components/Items/Wearable/Wearable';
import { ListingCategories } from 'data/types';
import gotchiPlaceholder from 'assets/images/gotchi-placeholder.svg';
import warehousePlaceholder from 'assets/images/wearables/15.svg';
import realmPlaceholder from 'assets/images/icons/kek.png';
import portalPlaceholder from 'assets/images/portals/h1-sealed.svg';
import ticketsPlaceholder from 'assets/images/tickets/rare.svg';
import consumablePlaceholder from 'assets/images/icons/consumable.svg';

import styles from './styles';

import ListingTitle from './components/ListingTitle';

export default function Listings() {
    const classes = styles();

    const history = useHistory();
    const location = useLocation();

    const params = queryString.parse(location.search);

    const { activeAddress } = useContext(LoginContext);

    const [isListingsLoading, setIsListingsLoading] = useState(true);
    const [isListingsEmpty, setIsListingsEmpty] = useState(true);
    const [gotchis, setGotchis] = useState([]);
    const [wearables, setWearables] = useState([]);
    const [parcels, setParcels] = useState([]);
    const [portals, setPortals] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [consumables, setConsumables] = useState([]);

    useEffect(() => {
        const currentAddress = params.address ? params.address : activeAddress;

        if (currentAddress) {
            getListings(currentAddress);

            history.push({ path: location.pathname, search: `?address=${currentAddress}` });
        } else {
            history.push({ path: location.pathname });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.address, activeAddress]);

    const getListings = (address) => {
        setIsListingsLoading(true);

        Promise.all([
            thegraph.getErc721ListingsBySeller(address),
            thegraph.getErc1155ListingsBySeller(address)
        ]).then(([erc721Listings, erc1155Listings]) => {
            const isListingsEmpty = erc721Listings.length === 0 && erc1155Listings.length === 0;

            setIsListingsEmpty(isListingsEmpty);

            if (isListingsEmpty) {
                setEmptyListings();
            } else {
                handleSetErc721Listings(erc721Listings);
                handleSetErc1155Listings(erc1155Listings);
            }
        }).catch(error => {
            console.log(error);

            setEmptyListings();
        }).finally(() => setIsListingsLoading(false));
    };

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
            .filter(listing => listing.category === ListingCategories.Third)
            .map(listing => listing.gotchi);

        const listedParcels = listings
            .filter(listing => listing.category === ListingCategories.Fourth)
            .map(listing => ({
                ...listing.parcel,
                priceInWei: listing.priceInWei,
                baazaarId: listing.id
            }));

        const listedPortals = listings
            .filter(listing => listing.category === ListingCategories.Zero || listing.category === ListingCategories.Second)
            .map(listing => ({
                priceInWei: listing.priceInWei,
                category: listing.category,
                tokenId: listing.tokenId,
                portal: {
                    hauntId: listing.portal.hauntId
                }
            }));

        setGotchis(listedGotchis);
        setParcels(listedParcels);
        setPortals(listedPortals);
    }

    const handleSetErc1155Listings = (listings) => {
        const wearables = listings
            .filter(listing => listing.category === ListingCategories.Zero)
            .map(listing => ({
                ...mapWearableAndTicket(listing)
            }));

        const tickets = listings
            .filter(listing => listing.category === ListingCategories.Third)
            .map(listing => ({
                ...mapWearableAndTicket(listing),
                erc1155TypeId: listing.erc1155TypeId,
            }));

        const consumables = listings
            .filter(listing => listing.category === ListingCategories.Second)
            .map(listing => ({
                id: parseInt(listing.erc1155TypeId, 10),
                balance: parseInt(listing.quantity, 10),
                listing: listing.id,
                price: ethersApi.fromWei(listing.priceInWei)
            }));

        setWearables(wearables);
        setTickets(tickets);
        setConsumables(consumables);
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

    if (isListingsLoading) {
        return (
            <div className={classes.loaderBox}>
                <CircularProgress color='primary' />
            </div>
        )
    } else if (isListingsEmpty) {
        return <Typography className={classes.noListings}>No listings here :(</Typography>
    }

    return (
        <div className={classes.container}>
            {
                Boolean(gotchis.length) && <ListingTitle src={gotchiPlaceholder} alt='gotchi' title='Gotchis' />
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
                                            'id',
                                            'skillpoints',
                                            'level',
                                            'collateral'
                                        ]
                                    },
                                    'svg',
                                    'name',
                                    'mainTraits',
                                    'numericTraits',
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
                Boolean(wearables.length) && <ListingTitle src={warehousePlaceholder} alt='wearable' title='Wearables' />
            }

            <div className={classes.list}>
                {
                    wearables.map(wearable =>
                        <div className={classes.listItem} key={wearable.listing}>
                            <Wearable wearable={wearable} />
                        </div>
                    )
                }
            </div>

            {
                Boolean(parcels.length) && <ListingTitle src={realmPlaceholder} alt='parcel' title='Parcels' />
            }

            <div className={classes.list}>
                {
                    parcels.map(parcel =>
                        <div className={classes.listItem} key={parcel.parcelId}>
                            <Parcel parcel={parcel} isBaazaarCard={true} />
                        </div>
                    )
                }
            </div>

            {
                Boolean(portals.length) && <ListingTitle src={portalPlaceholder} alt='portal' title='Portals' />
            }


            <div className={classes.list}>
                {
                    portals.map(portal =>
                        <div className={classes.listItem} key={portal.tokenId}>
                            <Portal portal={portal} isBaazaarCard={true} />
                        </div>
                    )
                }
            </div>

            {
                Boolean(tickets.length) && <ListingTitle src={ticketsPlaceholder} alt='ticket' title='Tickets' />
            }

            <div className={classes.list}>
                {
                    tickets.map(ticket =>
                        <div className={classes.listItem} key={ticket.listing}>
                            <Ticket ticket={ticket} />
                        </div>
                    )
                }
            </div>

            {
                Boolean(consumables.length) && <ListingTitle src={consumablePlaceholder} alt='consumable' title='Consumables' />
            }

            <div className={classes.list}>
                {
                    consumables.map(consumable =>
                        <div className={classes.listItem} key={consumable.listing}>
                            <Consumable consumable={consumable} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
