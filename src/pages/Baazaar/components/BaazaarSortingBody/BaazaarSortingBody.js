import React, {useContext} from 'react';
import { Grid, Typography } from '@mui/material';
import Pagination from '../Pagination/Pagination';
import { BaazaarContext } from "../../../../contexts/BaazaarContext";
import Aavegotchi from "../BaazaarSidebar/components/ItemTypes/Aavegotchi";
import {listingTypes} from "../../../../data/types";
import RealmParcel from "../BaazaarSidebar/components/ItemTypes/RealmParcel";


import { baazaarSortingBodyStyles } from '../../styles';

export default function BaazaarSortingBody({goods, page, limit, onNextPageClick, onPrevPageClick}) {
    const classes = baazaarSortingBodyStyles();
    const {selectedGoodsType} = useContext(BaazaarContext);

    return (
        <Grid className={classes.baazaarBody} item xs={12} sm={12} md={9} lg={9} xl={10}>
            <div className={classes.baazaarListItems}>
                {
                    // eslint-disable-next-line array-callback-return
                    goods.map((item, index) => {
                        return <div key={index}>
                            {
                                (selectedGoodsType === listingTypes.aavegotchi && item.gotchi) && <Aavegotchi item={item}/>
                            }
                            {
                                (selectedGoodsType === listingTypes.realm && item.parcel) && <RealmParcel item={item} />
                            }
                        </div>
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
                    <Typography className={classes.noGoods} variant={'caption'}>Spooky Market has no such goods :(</Typography>
                }
            </div>
        </Grid>
    );
}