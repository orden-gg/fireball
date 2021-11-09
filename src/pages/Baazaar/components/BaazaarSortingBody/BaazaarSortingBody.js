import React, {useContext} from 'react';
import { Grid, Typography } from '@mui/material';
import useStyles from "./style";
import Pagination from '../Pagination/Pagination';
import GotchiFilters from "./components/Filters/GotchiFilters";
import { BaazaarContext } from "../../../../contexts/BaazaarContext";
import Aavegotchi from "./components/ItemTypes/Aavegotchi";
import {listingTypes} from "../../../../data/types";
import RealmParcel from "./components/ItemTypes/RealmParcel";
import RealmFilters from "./components/Filters/RealmFilters";

export default function BaazaarSortingBody({goods, page, limit, onNextPageClick, onPrevPageClick, handleFindGotchiClick, handleFindRealmClick}) {
    const classes = useStyles();
    const {selectedGoodsType} = useContext(BaazaarContext);

    return (
        <Grid className={classes.baazaarBody} item xs={12} sm={12} md={9} lg={9} xl={10}>
            {
                selectedGoodsType === listingTypes.aavegotchi && <GotchiFilters handleFindClick={handleFindGotchiClick} />
            }
            {
                selectedGoodsType === listingTypes.realm && <RealmFilters handleFindClick={handleFindRealmClick} />
            }
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