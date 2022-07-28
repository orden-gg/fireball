import { useContext } from 'react';
import { CallMade } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';

import classNames from 'classnames';

import { ListingTypes } from 'shared/constants';
import { CardBalance, CardBody, CardFooter, CardHeader, CardImage, CardListing, CardName, CardPortalImage, CardSlot, CardStats, CardTotalPrice, ItemCard } from 'components/ItemCard';
import { GotchiHorizontal } from 'components/Gotchi/GotchiHorizontal';
import { Parcel } from 'components/Items/Parcel/Parcel';
import { PortalHorizontal } from 'components/Items/Portal/PortalHorizontal';
import { TicketHorizontal } from 'components/Items/Ticket/TicketHorizontal';
import { WearableHorizontal } from 'components/Items/Wearable/WearableHorizontal';
import { BaazaarContext } from 'contexts/BaazaarContext';
import { ItemUtils } from 'utils';

import { Pagination } from './Pagination';
import { Aavegotchi } from './BaazaarSidebar/components/ItemTypes/Aavegotchi';

import { baazaarSortingBodyStyles } from '../styles';

interface BaazaarSortingBodyProps {
    goods: any[];
    page: number;
    limit: number;
    onNextPageClick: () => void;
    onPrevPageClick: () => void;
}

export function BaazaarSortingBody({ goods, page, limit, onNextPageClick, onPrevPageClick }: BaazaarSortingBodyProps) {
    const classes = baazaarSortingBodyStyles();

    const { selectedGoodsType } = useContext<any>(BaazaarContext);

    const renderGotchi = (item: any) => {
        if (item.__typename === 'ERC721Listing' && item.category === '3') {
            return (
                <GotchiHorizontal
                    gotchi={item.gotchi}
                    item={item}
                    render={
                        [
                            {
                                className: 'gotchiImageCell',
                                items: [
                                    {
                                        className: 'gotchiHeader',
                                        items: ['collateral', 'level']
                                    },
                                    'svg',
                                    'name'
                                ]
                            },
                            {
                                className: 'gotchiTraitsCell',
                                items: ['traits']
                            },
                            {
                                className: 'gotchiPriceCell',
                                items: ['price']
                            }
                        ]
                    }
                />
            );
        }

    };

    return (
        <div className={classes.baazaarBody}>
            <div className={classNames(classes.baazaarListItems, selectedGoodsType === ListingTypes.Activity ? 'horizontal' : '')}>
                {
                    // eslint-disable-next-line array-callback-return
                    goods.map((item: any, index: number) => {
                        if (selectedGoodsType === ListingTypes.Activity) {
                            return <div key={index} className={classes.baazaarListItem}>
                                {
                                    renderGotchi(item)
                                }
                                {
                                    ((item.__typename === 'ERC1155Listing' || item.__typename === 'ERC1155Purchase') && (item.category === '0' || item.category === '2')) && (
                                        <WearableHorizontal
                                            wearable={item}
                                            render={
                                                [
                                                    {
                                                        imageCell: ['image', 'name']
                                                    },
                                                    {
                                                        statsCell: ['cardName', 'cardStats']
                                                    },
                                                    {
                                                        priceCell: ['price']
                                                    }
                                                ]
                                            }
                                        />
                                    )
                                }
                                {
                                    (item.__typename === 'ERC721Listing' && (item.category === '0' || item.category === '2')) && (
                                        <PortalHorizontal
                                            portal={item}
                                            render={
                                                [
                                                    {
                                                        imageCell: ['image', 'name']
                                                    },
                                                    {
                                                        infoCell: ['cardName', 'cardStats']
                                                    },
                                                    {
                                                        priceCell: ['price']
                                                    }
                                                ]
                                            }
                                        />
                                    )
                                }

                                {
                                    ((item.__typename === 'ERC1155Listing' || item.__typename === 'ERC1155Purchase') && item.category === '3') && (
                                        <TicketHorizontal
                                            ticket={item}
                                            render={
                                                [
                                                    {
                                                        imageCell: ['image', 'name']
                                                    },
                                                    {
                                                        infoCell: ['cardName', 'cardStats']
                                                    },
                                                    {
                                                        priceCell: ['price']
                                                    }
                                                ]
                                            }
                                        />
                                    )
                                }
                                {/*{*/}
                                {/*    (item.__typename === 'ERC721Listing' && item.category === '4') && <Parcel parcel={{...item.parcel, priceInWei: item.priceInWei, tokenId: item.tokenId, baazaarId: item.id}} isBaazaarCard={true}/>*/}
                                {/*}*/}
                            </div>;
                        } else {
                            return <div key={index} className={classes.baazaarListItem}>
                                {
                                    (selectedGoodsType === ListingTypes.Aavegotchi && item.gotchi) && <Aavegotchi item={item}/>
                                }
                                {
                                    (item.__typename === 'ERC721Listing' && (item.category === '0' || item.category === '2')) && (
                                        <ItemCard type={`haunt${item.portal.hauntId}`} id={item.id} category={item.category}>
                                            <CardBody>
                                                <CardSlot>{`Haunt ${item.portal.hauntId}`}</CardSlot>
                                                <CardPortalImage category={item.category} hauntId={item.portal.hauntId} />
                                                <CardName>
                                                    <Link
                                                        href={
                                                            `https://app.aavegotchi.com/portal/${item.tokenId}`
                                                        }
                                                        target='_blank'
                                                    >
                                                        {`Portal ${item.tokenId}`}
                                                        <CallMade fontSize={'inherit'} />
                                                    </Link>
                                                </CardName>
                                            </CardBody>
                                        </ItemCard>
                                    )
                                }
                                {
                                    ((item.__typename === 'ERC1155Listing' || item.__typename === 'ERC1155Purchase') && (item.category === '0' || item.category === '2')) && (
                                        <ItemCard id={item.erc1155TypeId} category={item.category} type={ItemUtils.getItemRarityById(item.erc1155TypeId)}>
                                            <CardHeader>
                                                <CardTotalPrice
                                                    balance={item.quantity}
                                                    priceInWei={item.priceInWei}
                                                />
                                                <CardBalance balance={item.quantity} holders={item.holders} />
                                            </CardHeader>
                                            <CardBody>
                                                <CardSlot id={item.erc1155TypeId} />
                                                <CardImage id={item.erc1155TypeId} />
                                                <CardName id={item.erc1155TypeId} />
                                                <CardStats id={item.erc1155TypeId} category={item.category} />
                                            </CardBody>
                                            <CardFooter>
                                                <CardListing />
                                            </CardFooter>
                                        </ItemCard>
                                    )
                                }
                                {
                                    ((item.__typename === 'ERC1155Listing' || item.__typename === 'ERC1155Purchase') && item.category === '3') && (
                                        <ItemCard type={ItemUtils.getItemRarityName(item.erc1155TypeId)} category={item.category} id={item.erc1155TypeId}>
                                            <CardHeader>
                                                <CardTotalPrice
                                                    balance={item.quantity}
                                                    priceInWei={item.priceInWei}
                                                />
                                                <CardBalance balance={item.quantity} />
                                            </CardHeader>
                                            <CardBody>
                                                <CardImage id={item.erc1155TypeId} category={item.category} />
                                                <CardName>{item.name}</CardName>
                                            </CardBody>
                                            <CardFooter>
                                                <CardListing />
                                            </CardFooter>
                                        </ItemCard>
                                    )
                                }
                                {
                                    (item.__typename === 'ERC721Listing' && item.category === '4') &&
                                        <Parcel
                                            parcel={{
                                                ...item.parcel,
                                                priceInWei: item.priceInWei,
                                                tokenId: item.tokenId,
                                                baazaarId: item.id,
                                                listings: [{
                                                    id: item.id,
                                                    priceInWei: item.priceInWei,
                                                    __typename: 'ERC721Listing'
                                                }],
                                                historicalPrices: item.parcel.historicalPrices ? item.parcel.historicalPrices : []
                                            }}
                                        />
                                }
                            </div>;
                        }
                    })
                }
            </div>
            <div className={classes.pagination}>
                {
                    goods.length ? <Pagination
                        page={page}
                        prevPageVisibility={page === 1}
                        nextPageVisibility={goods.length < limit}
                        onNextPageClick={onNextPageClick}
                        onPrevPageClick={onPrevPageClick}
                    /> :
                    <Typography className={classes.noGoods} variant='caption'>
                        Spooky Market has no such goods :(
                    </Typography>
                }
            </div>
        </div>
    );
}
