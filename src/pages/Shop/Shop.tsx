import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import queryString from 'query-string';

import {
    BaazarIcon,
    ConsumableIcon,
    GotchiIcon,
    H1SealedPortalIcon,
    KekIcon,
    RareTicketIcon,
    WarehouseIcon
} from 'components/Icons/Icons';
import { Consumable } from 'components/Items/Consumable/Consumable';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { Parcel } from 'components/Items/Parcel/Parcel';
import { Portal } from 'components/Items/Portal/Portal';
import { Ticket } from 'components/Items/Ticket/Ticket';
import { Wearable } from 'components/Items/Wearable/Wearable';
import { fromWei, isEthAddress } from 'api/ethers.api';
import thegraph from 'api/thegraph.api';
import { CommonUtils, ItemUtils } from 'utils';
import { Erc721Categories, Erc1155Categories } from 'data/types';

import { styles } from './styles';

import { ListingTitle } from './components/ListingTitle';

export function Shop() {
    const classes = styles();

    const history = useHistory();
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
        if (isEthAddress(params.address)) {
            setCurrentAddress(params.address as string);
        }
    }, [params.address, setCurrentAddress]);

    useEffect(() => {
        if (isEthAddress(currentAddress)) {
            let mounted = true;

            setEmptyListings();
            setIsListingsLoading(true);

            Promise.all([
                thegraph.getErc721ListingsBySeller(currentAddress),
                thegraph.getErc1155ListingsBySeller(currentAddress)
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
                }]
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
                ...mapWearableAndTicket(listing)
            }));
        const sortedWearables: any[] = CommonUtils.basicSort(listedWearables, 'rarityId', 'desc');

        const listedTickets: any[] = listings
            .filter((listing: any) => listing.category === Erc1155Categories.Ticket)
            .map((listing: any) => ({
                ...mapWearableAndTicket(listing),
                erc1155TypeId: listing.erc1155TypeId
            }));
        const sortedTickets: any[] = CommonUtils.basicSort(listedTickets, 'rarityId', 'desc');

        const listedConsumables = listings
            .filter((listing: any) => listing.category === Erc1155Categories.Consumable)
            .map((listing: any) => ({
                id: parseInt(listing.erc1155TypeId, 10),
                balance: parseInt(listing.quantity, 10),
                listing: listing.id,
                price: fromWei(listing.priceInWei)
            }));

        setWearables(sortedWearables);
        setTickets(sortedTickets);
        setConsumables(listedConsumables);
    };

    const mapWearableAndTicket = (listing: any) => {
        return {
            id: parseInt(listing.erc1155TypeId, 10),
            balance: parseInt(listing.quantity, 10),
            category: 0,
            listing: listing.id,
            rarity: ItemUtils.getItemRarityById(listing.erc1155TypeId),
            rarityId: listing.rarityLevel,
            priceInWei: listing.priceInWei,
            price: fromWei(listing.priceInWei)
        };
    };

    const onAddressChange = (address: string) => {
        setCurrentAddress(address);

        if (isEthAddress(address)) {
            history.push({ pathname: location.pathname, search: `?address=${address}` });
        }
    };

    const loaderRender = () => {
        if (isListingsLoading) {
            return (
                <div className={classes.loaderBox}>
                    <CircularProgress color='primary' />
                </div>
            );
        } else if (isListingsEmpty && isEthAddress(currentAddress)) {
            return <Typography className={classes.noListings} variant='caption'>No listings here :(</Typography>;
        }
    };

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
                    wearables.map((wearable: any) =>
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
                            <Portal portal={portal} />
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
                    consumables.map((consumable: any) =>
                        <div className={classes.listItem} key={consumable.listing}>
                            <Consumable consumable={consumable} isShopItem={true} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
