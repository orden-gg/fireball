import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import queryString from 'query-string';

import { Erc1155Categories, Erc721Categories } from 'shared/constants';
import { ItemCard } from 'components/ItemCard/containers';
import {
    CardBalance,
    CardERC721Listing,
    CardGroup,
    CardImage,
    CardListing,
    CardName,
    CardPortalImage,
    CardSlot,
    CardStats,
    CardTotalPrice
} from 'components/ItemCard/components';
import {
    BaazarIcon,
    ConsumableIcon,
    GotchiIcon,
    H1SealedPortalIcon,
    KekIcon,
    RareTicketIcon,
    WarehouseIcon
} from 'components/Icons/Icons';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { Parcel } from 'components/Items/Parcel/Parcel';
import { EthersApi, TheGraphApi } from 'api';
import { CommonUtils, ItemUtils } from 'utils';

import { styles } from './styles';

import { ListingTitle } from './components/ListingTitle';

export function Shop() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();

    const params = queryString.parse(location.search);

    const [isListingsLoading, setIsListingsLoading] = useState<boolean>(false);
    const [isListingsEmpty, setIsListingsEmpty] = useState<boolean>(true);
    const [currentAddress, setCurrentAddress] = useState<string>('');
    const [gotchis, setGotchis] = useState<any>([]);
    const [wearables, setWearables] = useState<any>([]);
    const [parcels, setParcels] = useState<any>([]);
    const [portals, setPortals] = useState<any>([]);
    const [tickets, setTickets] = useState<any>([]);
    const [consumables, setConsumables] = useState<any>([]);

    useEffect(() => {
        if (EthersApi.isEthAddress(params.address)) {
            setCurrentAddress(params.address as string);
        }
    }, [params.address, setCurrentAddress]);

    useEffect(() => {
        if (EthersApi.isEthAddress(currentAddress)) {
            let mounted = true;

            setEmptyListings();
            setIsListingsLoading(true);

            Promise.all([
                TheGraphApi.getErc721ListingsBySeller(currentAddress),
                TheGraphApi.getErc1155ListingsBySeller(currentAddress)
            ]).then(([erc721Listings, erc1155Listings]: [any, any]) => {
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
                    setIsListingsLoading(false);
                }
            });

            return () => { mounted = false };
        }
    }, [currentAddress]);

    const setEmptyListings = () => {
        setGotchis([]);
        setParcels([]);
        setPortals([]);
        setWearables([]);
        setTickets([]);
        setConsumables([]);
    };

    const handleSetErc721Listings = (listings: any[]) => {
        const listedGotchis: any[] = listings
            .filter((listing: any) => listing.category === Erc721Categories.Aavegotchi)
            .map((listing: any) => listing.gotchi);
        const sortedGotchis: any[] = CommonUtils.basicSort(listedGotchis, 'baseRarityScore', 'desc');

        const listedParcels: any[] = listings
            .filter((listing: any) => listing.category === Erc1155Categories.Realm)
            .map((listing: any) => ({
                ...listing.parcel,
                priceInWei: listing.priceInWei,
                baazaarId: listing.id,
                historicalPrices: listing.parcel.historicalPrices ? listing.parcel.historicalPrices : [],
                listings: [{
                    id: listing.id,
                    priceInWei: listing.priceInWei
                }]
            }));
        const sortedParcels: any[] = CommonUtils.basicSort(listedParcels, 'size', 'desc');

        const listedPortals: any[] = listings
            .filter((listing: any) => listing.category === Erc721Categories.ClosedPortal || listing.category === Erc721Categories.OpenedPortal)
            .map((listing: any) => ({
                priceInWei: listing.priceInWei,
                category: listing.category,
                tokenId: listing.tokenId,
                portal: {
                    hauntId: listing.portal.hauntId
                },
                historicalPrices: listing.portal.historicalPrices ? listing.portal.historicalPrices : [],
                listings: [{
                    id: listing.tokenId,
                    priceInWei: listing.priceInWei
                }],
                activeListing: listing.portal.activeListing
            }));
        const sortedPortals: any[] = CommonUtils.basicSort(listedPortals, 'tokenId', 'asc');

        setGotchis(sortedGotchis);
        setParcels(sortedParcels);
        setPortals(sortedPortals);
    };

    const handleSetErc1155Listings = (listings: any[]) => {
        const listedWearables: any[] = listings
            .filter((listing: any) => listing.category === Erc1155Categories.Wearable)
            .map((listing: any) => ({
                ...mapWearableAndTicket(listing),
                category: listing.category
            }));
        const sortedWearables: any[] = CommonUtils.basicSort(listedWearables, 'rarityId', 'desc');

        const listedTickets: any[] = listings
            .filter((listing: any) => listing.category === Erc1155Categories.Ticket)
            .map((listing: any) => ({
                ...mapWearableAndTicket(listing),
                erc1155TypeId: listing.erc1155TypeId,
                category: listing.category
            }));
        const sortedTickets: any[] = CommonUtils.basicSort(listedTickets, 'rarityId', 'desc');

        const listedConsumables = listings
            .filter((listing: any) => listing.category === Erc1155Categories.Consumable)
            .map((listing: any) => ({
                id: parseInt(listing.erc1155TypeId, 10),
                balance: parseInt(listing.quantity, 10),
                listing: listing.id,
                price: EthersApi.fromWei(listing.priceInWei),
                category: listing.category
            }));

        setWearables(sortedWearables);
        setTickets(sortedTickets);
        setConsumables(listedConsumables);
    };

    const mapWearableAndTicket = (listing: any) => {
        return {
            id: parseInt(listing.erc1155TypeId, 10),
            balance: parseInt(listing.quantity, 10),
            category: listing.category,
            listing: listing.id,
            rarity: ItemUtils.getItemRarityById(listing.erc1155TypeId),
            rarityId: listing.rarityLevel,
            priceInWei: listing.priceInWei,
            price: EthersApi.fromWei(listing.priceInWei)
        };
    };

    const onAddressChange = (address: string) => {
        setCurrentAddress(address);

        if (EthersApi.isEthAddress(address)) {
            navigate({ pathname: location.pathname, search: `?address=${address}` });
        }
    };

    const loaderRender = () => {
        if (isListingsLoading) {
            return (
                <div className={classes.loaderBox}>
                    <CircularProgress color='primary' />
                </div>
            );
        } else if (isListingsEmpty && EthersApi.isEthAddress(currentAddress)) {
            return <Typography className={classes.noListings} variant='caption'>No listings here :(</Typography>;
        }
    };

    return (
        <div className={classes.container}>
            <IconButton className={classes.backButton} onClick={() => { navigate('/') }} >
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
                                        className: 'gotchiHeader',
                                        items: [
                                            'collateral',
                                            'kinship',
                                            'level'
                                        ]
                                    },
                                    {
                                        className: 'imageContainer',
                                        items: [
                                            'svg',
                                            {
                                                className: 'rsContainer',
                                                items: ['rs', 'skillpoints']
                                            }
                                        ]
                                    },
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
                    wearables.map((wearable: any) =>
                        <div className={classes.listItem} key={wearable.listing}>
                            <ItemCard type={wearable.rarity} id={wearable.id} category={wearable.category}>
                                <CardGroup name='header'>
                                    <CardTotalPrice
                                        balance={wearable.balance}
                                        priceInWei={wearable.priceInWei}
                                    />
                                    <CardBalance balance={wearable.balance} holders={wearable.holders} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardSlot id={wearable.id} />
                                    <CardImage id={wearable.id} />
                                    <CardName id={wearable.id} />
                                    <CardStats id={wearable.id} category={wearable.category} />
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing />
                                </CardGroup>
                            </ItemCard>
                        </div>
                    )
                }
            </div>

            {
                Boolean(parcels.length) && <ListingTitle icon={<KekIcon width={32} height={32} alt='parcel' />} title='Parcels' />
            }

            <div className={classes.list}>
                {
                    parcels.map((parcel: any) =>
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
                    portals.map((portal: any) =>
                        <div className={classes.listItem} key={portal.tokenId}>
                            <ItemCard type={`haunt${portal.portal.hauntId}`} id={portal.id} category={portal.category}>
                                <CardGroup name='body'>
                                    <CardSlot>{`Haunt ${portal.portal.hauntId}`}</CardSlot>
                                    <CardPortalImage category={portal.category} hauntId={portal.portal.hauntId} />
                                    <CardName>{`Portal ${portal.tokenId}`}</CardName>
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardERC721Listing
                                        activeListing={portal.activeListing}
                                        listings={portal.listings}
                                        historicalPrices={portal.historicalPrices}
                                    />
                                </CardGroup>
                            </ItemCard>
                        </div>
                    )
                }
            </div>

            {
                Boolean(tickets.length) && <ListingTitle icon={<RareTicketIcon width={32} height={32} />} title='Tickets' />
            }

            <div className={classes.list}>
                {
                    tickets.map((ticket: any) =>
                        <div className={classes.listItem} key={ticket.listing}>
                            <ItemCard type={ticket.rarity} id={ticket.id} category={ticket.category}>
                                <CardGroup name='header'>
                                    <CardTotalPrice
                                        balance={ticket.balance}
                                        priceInWei={ticket.priceInWei}
                                    />
                                    <CardBalance balance={ticket.balance} holders={ticket.holders} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardImage id={ticket.id} />
                                    <CardName id={ticket.id} />
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing />
                                </CardGroup>
                            </ItemCard>
                        </div>
                    )
                }
            </div>

            {
                Boolean(consumables.length) && <ListingTitle icon={<ConsumableIcon width={32} height={32} />} title='Consumables' />
            }

            <div className={classes.list}>
                {
                    consumables.map((consumable: any) =>
                        <div className={classes.listItem} key={consumable.listing}>
                            <ItemCard type={consumable.rarity} id={consumable.id} category={consumable.category}>
                                <CardGroup name='header'>
                                    <CardTotalPrice
                                        balance={consumable.balance}
                                        priceInWei={consumable.priceInWei}
                                    />
                                    <CardBalance balance={consumable.balance} holders={consumable.holders} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardImage id={consumable.id} />
                                    <CardName id={consumable.id} />
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing />
                                </CardGroup>
                            </ItemCard>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
