import React, { useContext } from 'react';
import classNames from 'classnames';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

import GotchiHorizontal from 'components/Gotchi/GotchiHorizontal';
import Parcel from 'components/Items/Parcel/Parcel';
import Portal from 'components/Items/Portal/Portal';
import PortalHorizontal from 'components/Items/Portal/PortalHorizontal';
import Ticket from 'components/Items/Ticket/Ticket';
import TicketHorizontal from 'components/Items/Ticket/TicketHorizontal';
import Wearable from 'components/Items/Wearable/Wearable';
import WearableHorizontal from 'components/Items/Wearable/WearableHorizontal';
import { BaazaarContext } from 'contexts/BaazaarContext';
import { listingTypes } from 'data/types';

import Pagination from './Pagination';
import Aavegotchi from './BaazaarSidebar/components/ItemTypes/Aavegotchi';

import { baazaarSortingBodyStyles } from '../styles';

export default function BaazaarSortingBody({ goods, page, limit, onNextPageClick, onPrevPageClick, backdropIsOpen }) {
    const classes = baazaarSortingBodyStyles();
    const { selectedGoodsType } = useContext(BaazaarContext);

    const renderGotchi = (item) => {
        if (item.__typename === 'ERC721Listing' && item.category === '3') {
            return (
                <GotchiHorizontal
                    gotchi={item.gotchi}
                    item={item}
                    render={
                        [
                            {
                                imageCell: ['svg', 'name']
                            },
                            {
                                traitsCell: ['mainTraits', 'numericTraits']
                            },
                            {
                                priceCell: [
                                    {
                                        badges: ['collateral', 'id', 'level']
                                    },
                                    'price'
                                ]
                            }
                        ]
                    }
                />
            )
        }

    }

    return (
        <div className={classes.baazaarBody}>
            <div className={classNames(classes.baazaarListItems, selectedGoodsType === listingTypes.activity ? 'horizontal' : '')}>
                {
                    // eslint-disable-next-line array-callback-return
                    goods.map((item, index) => {
                        if (selectedGoodsType === listingTypes.activity) {
                            return <div key={index} className={classes.baazaarListItem}>
                                {
                                    renderGotchi(item, selectedGoodsType === listingTypes.activity)
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
                            </div>
                        } else {
                            return <div key={index} className={classes.baazaarListItem}>
                                {
                                    (selectedGoodsType === listingTypes.aavegotchi && item.gotchi) && <Aavegotchi item={item}/>
                                }
                                {
                                    (item.__typename === 'ERC721Listing' && (item.category === '0' || item.category === '2')) && <Portal portal={item} />
                                }
                                {
                                    ((item.__typename === 'ERC1155Listing' || item.__typename === 'ERC1155Purchase') && (item.category === '0' || item.category === '2')) && <Wearable wearable={item} />
                                }
                                {
                                    ((item.__typename === 'ERC1155Listing' || item.__typename === 'ERC1155Purchase') && item.category === '3') && <Ticket ticket={item} />
                                }
                                {
                                    (item.__typename === 'ERC721Listing' && item.category === '4') && <Parcel parcel={{...item.parcel, priceInWei: item.priceInWei, tokenId: item.tokenId, baazaarId: item.id}} isBaazaarCard={true}/>
                                }
                            </div>
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

            <Backdrop classes={{root: classes.backdrop }} open={backdropIsOpen}>
                <CircularProgress color='primary' />
            </Backdrop>
        </div>
    );
}
