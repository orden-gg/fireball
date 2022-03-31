import React from 'react';
import { Link, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import ethersApi from 'api/ethers.api';
import commonUtils from 'utils/commonUtils';
import ghstIcon from 'assets/images/animated/ghst-token.gif';

import styles from './styles';
import { CustomTooltipStyles } from '../../Gotchi/styles';

export default function ERC721Listing({ listing, history }) {
    const classes = {
        ...styles(),
        ...CustomTooltipStyles()
    };

    if (!listing?.length && !history?.length) {
        return null;
    };

    const currentPrice = listing?.length && ethersApi.fromWei(listing[0].priceInWei);
    const lastPrice = history?.length && ethersApi.fromWei(history[history.length - 1]);

    return (
        <div className={classes.container}>
            <Tooltip
                title={
                    <>
                        {history.length ? (
                            <>
                                <p><span>Sales history:</span></p>
                                <div className={classes.tooltipInner}>
                                    {history.map((price, index) => {
                                        return <p className={classes.tooltipItem} key={index}>
                                            {commonUtils.formatPrice(ethersApi.fromWei(price))}
                                            <img src={ghstIcon} width='14' alt='GHST Token Icon' />
                                            {index !== history.length - 1 && <span className={classes.tooltipDivider}>{'->'}</span>}
                                        </p>
                                    })}
                                </div>
                            </>
                        ) : (
                            <p><span>No history</span></p>
                        )}
                    </>
                }
                classes={{ tooltip: classes.customTooltip }}
                enterTouchDelay={0}
                placement='top'
                followCursor
            >
                <div className={classes.listing}>
                    {listing.length ? (
                        <Link
                            href={`https://app.aavegotchi.com/baazaar/erc721/${listing[0].id}`}
                            target='_blank'
                            underline='none'
                            className={classes.listingLink}
                        >
                            {!lastPrice ? (
                                <p>{commonUtils.formatPrice(currentPrice)}</p>
                            ) : currentPrice > lastPrice ? (
                                <>
                                    <KeyboardArrowUpIcon color='success' fontSize='inherit' />
                                    <p className={classes.lastPriceUp}>{commonUtils.formatPrice(currentPrice)}</p>
                                </>
                            ) : (
                                <>
                                    <KeyboardArrowDownIcon color='warning' fontSize='inherit' />
                                    <p className={classes.lastPriceDown}>{commonUtils.formatPrice(currentPrice)}</p>
                                </>
                            )}
                            <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                        </Link>
                    ) : (
                        <div className={classes.listingShadow}>
                            <p>{commonUtils.formatPrice(lastPrice)}</p>
                            <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                        </div>
                    )}
                </div>
            </Tooltip>
        </div>
    );
}
