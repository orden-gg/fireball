import React, { useEffect, useState } from 'react';
import { Link, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { alpha } from '@mui/system';
import classNames from 'classnames';
import useStyles from '../styles';
import ContentLoader from 'react-content-loader';
import thegraph from '../../../api/thegraph';
import itemUtils from '../../../utils/itemUtils';


import CallMade from '@mui/icons-material/CallMade';
import ghstIcon from '../../../assets/images/ghst-doubleside.gif';
import commonUtils from '../../../utils/commonUtils';

export default function Parcel({parcel}) {
    const classes = useStyles();
    const theme = useTheme();
    const [current, setCurrent] = useState(null);

    const size = itemUtils.getParcelSize(parcel.size);
    const name = parcel.parcelHash.replace(/-/g, ' ');
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
            if(!controller.signal.aborted) {
                setCurrent(response);
            }
        });

        return () => controller?.abort(); // cleanup on destroy
    }, [parcel]);

    return (
        <div className={classNames(classes.item, size)}>

            <div className={classes.labels}>

                {current ? (
                    <Tooltip title='Auction price' classes={{ tooltip: classes.customTooltip }} placement='top' followCursor>
                        <div
                            className={classNames(classes.label, classes.labelTotal)}
                            style={{ backgroundColor: theme.palette.realm[size], color: theme.palette.secondary.main }}
                        >
                            <Typography variant='subtitle2'>
                                {commonUtils.formatPrice(current.price)}
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

            <div className={classNames(classes.label, classes.labelSlot)}>
                [{parcel.tokenId}]
            </div>

            <Link href={`https://gotchiverse.io/auction?tokenId=${parcel.tokenId}`} target='_blank' underline='none' className={classNames(classes.nameWrapper, 'two-lined')}>
                <Typography className={classNames(classes.name, classes.textHighlight, size)}>
                    {name}
                </Typography>
                <CallMade className={classes.callMadeIcon} />
            </Link>

            <div className={classes.boosts}>
                {Object.entries(boosts).map((boost, i) => {
                    let key = boost[0];
                    let value = boost[1];

                    return value > 0 ? (
                        <div className={classes.boost} style={{ backgroundColor: theme.palette.alchemica[key] }} key={i}>
                            <img src={itemUtils.getAlchemicaImg(key)} alt={key} width={13} />
                            {value}
                        </div>
                    ) : (
                        null
                    )
                })}
            </div>
        </div>
    )
}