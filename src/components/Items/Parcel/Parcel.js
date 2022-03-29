import React, { useEffect, useState } from 'react';
import { Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/system';
import { useTheme } from '@emotion/react';

import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

import ethersApi from 'api/ethers.api';
import thegraph from 'api/thegraph.api';
import ParcelImage from 'components/Items/ParcelImage/ParcelImage';
import commonUtils from 'utils/commonUtils';
import itemUtils from 'utils/itemUtils';
import ghstIcon from 'assets/images/animated/ghst-token.gif';

import ParcelBaazaarLink from './ParcelBaazaarLink';
import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

export default function Parcel({ parcel, isBaazaarCard, isShopItem = false }) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles()
    };

    const theme = useTheme();
    const [current, setCurrent] = useState(null);

    const size = itemUtils.getParcelSize(parcel.size);

    const boosts = {
        fud: parcel.fudBoost,
        fomo: parcel.fomoBoost,
        alpha: parcel.alphaBoost,
        kek: parcel.kekBoost
    };

    useEffect(() => {
        let controller = new AbortController();

        // current
        thegraph.getRealmAuctionPrice(parcel.auctionId).then((response) => {
            if (!controller.signal.aborted) {
                setCurrent(response);
            }
        });

        return () => controller?.abort(); // cleanup on destroy
    }, [parcel]);

    return (
        <div className={classNames(classes.item, size, classes.parcelCard)}>

            <div className={classes.labels}>
                { !isShopItem &&
                    <>
                        {current ? (
                            <Tooltip title='Price' classes={{ tooltip: classes.customTooltip }} placement='top' followCursor>
                                <div className={classNames(classes.label, classes.labelTotal, classes.labelParselPrice)}>
                                    <Typography variant='subtitle2'>
                                        {
                                            isBaazaarCard ? commonUtils.formatPrice(
                                                    ethersApi.fromWei(parcel.priceInWei)
                                                ) :
                                                commonUtils.formatPrice(current.price)
                                        }
                                    </Typography>
                                    <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                                </div>
                            </Tooltip>

                        ) : (
                            <ContentLoader
                                speed={2}
                                width={70}
                                height={27}
                                viewBox='0 0 70 27'
                                backgroundColor={alpha(theme.palette.realm[size], .6)}
                                foregroundColor={alpha(theme.palette.realm[size], .2)}
                            >
                                <rect x='0' y='0' width='70' height='27' />
                            </ContentLoader>
                        )}
                    </>
                }

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

            <ParcelBaazaarLink parcel={parcel} isBaazaarCard={isBaazaarCard} link={parcel.baazaarId} />

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

            <div className={classNames(classes.label, classes.labelTotal, classes.labelParselPrice, classes.shopParcelPrice)}>
                <Typography variant='subtitle2'>
                    { commonUtils.formatPrice(ethersApi.fromWei(parcel.priceInWei)) }
                </Typography>
                <img src={ghstIcon} width='18' alt='GHST Token Icon' />
            </div>
        </div>
    )
}
