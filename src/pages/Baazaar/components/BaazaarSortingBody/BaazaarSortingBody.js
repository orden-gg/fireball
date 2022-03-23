import React, {useContext} from 'react';
import { Typography } from '@mui/material';

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

import Pagination from '../Pagination/Pagination';
import Aavegotchi from '../BaazaarSidebar/components/ItemTypes/Aavegotchi';

import { baazaarSortingBodyStyles } from '../../styles';

export default function BaazaarSortingBody({ goods, page, limit, onNextPageClick, onPrevPageClick }) {
    const classes = baazaarSortingBodyStyles();
    const { selectedGoodsType } = useContext(BaazaarContext);

    return (
        <div className={classes.baazaarBody}>
            <div className={classNames(classes.baazaarListItems, selectedGoodsType === listingTypes.activity ? 'horizontal' : '')}>
                {
                    // eslint-disable-next-line array-callback-return
                    goods.map((item, index) => {
                        if (selectedGoodsType === listingTypes.activity) {
                            return <div key={index}>
                                {
                                    (item.__typename === 'ERC721Listing' && item.category === '3') && <GotchiHorizontal gotchi={item.gotchi} item={item} render={[ 'image', 'body', 'price']} />
                                }
                                {
                                    ((item.__typename === 'ERC1155Listing' || item.__typename === 'ERC1155Purchase') && (item.category === '0' || item.category === '2')) && <WearableHorizontal wearable={item} render={[ 'image', 'body', 'price']} />
                                }
                                {
                                    (item.__typename === 'ERC721Listing' && (item.category === '0' || item.category === '2')) && <PortalHorizontal portal={item} render={[ 'image', 'body', 'price']} />
                                }

                                {
                                    ((item.__typename === 'ERC1155Listing' || item.__typename === 'ERC1155Purchase') && item.category === '3') && <TicketHorizontal ticket={item} render={[ 'image', 'body', 'price']} />
                                }
                                {/*{*/}
                                {/*    (item.__typename === 'ERC721Listing' && item.category === '4') && <Parcel parcel={{...item.parcel, priceInWei: item.priceInWei, tokenId: item.tokenId, baazaarId: item.id}} isBaazaarCard={true}/>*/}
                                {/*}*/}
                            </div>
                        } else {
                            return <div key={index}>
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
        </div>
    );
}
