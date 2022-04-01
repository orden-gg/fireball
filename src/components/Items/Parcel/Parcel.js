import React from 'react';
import { Tooltip, Typography } from '@mui/material';

import classNames from 'classnames';

import ERC721Listing from 'components/Items/ERC721Listing/ERC721Listing';
import ParcelImage from 'components/Items/ParcelImage/ParcelImage';
import itemUtils from 'utils/itemUtils';

import ParcelLink from './ParcelLink';
import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

export default function Parcel({ parcel }) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles()
    };

    const size = itemUtils.getParcelSize(parcel.size);

    const boosts = {
        fud: parcel.fudBoost,
        fomo: parcel.fomoBoost,
        alpha: parcel.alphaBoost,
        kek: parcel.kekBoost
    };

    return (
        <div className={classNames(classes.item, size, classes.parcelCard)}>
            <div className={classes.labels}>
                <Tooltip
                    title='District'
                    classes={{ tooltip: classes.customTooltip }}
                    placement='top'
                    followCursor
                >
                    <div className={classNames(classes.label, classes.labelBalance)}>
                        <Typography variant='subtitle2'>
                            {parcel.district}
                        </Typography>
                    </div>
                </Tooltip>
            </div>

            <ParcelImage key={parcel.parcelId} parcel={parcel} parcelSize={100} />

            <div className={classNames(classes.label, classes.labelSlot)}>
                [{parcel.tokenId}]
            </div>

            <ParcelLink parcel={parcel} />

            <div className={classes.boosts}>
                {Object.entries(boosts).map((boost, i) => {
                    let key = boost[0];
                    let value = boost[1];

                    return value > 0 ? (
                        <div className={classNames(classes.boost, key)} key={i}>
                            <img src={itemUtils.getAlchemicaImg(key)} alt={key} width={13} />
                            {value}
                        </div>
                    ) : (
                        null
                    )
                })}
            </div>

            <div className={classes.parcelPriceContainer}>
                <ERC721Listing listings={parcel.listings} historicalPrices={parcel.historicalPrices}/>
            </div>
        </div>
    )
}
