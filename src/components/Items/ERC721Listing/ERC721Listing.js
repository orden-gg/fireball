import { Link, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { GhstTokenGif } from 'components/Icons/Icons';
import ethersApi from 'api/ethers.api';
import commonUtils from 'utils/commonUtils';

import styles from './styles';
import { CustomTooltipStyles } from '../../Gotchi/styles';

export default function ERC721Listing({ listings, historicalPrices }) {
    const classes = {
        ...styles(),
        ...CustomTooltipStyles()
    };

    if (!listings?.length && !historicalPrices?.length) {
        return null;
    }

    const currentPrice = listings?.length && ethersApi.fromWei(listings[0].priceInWei);
    const lastPrice = historicalPrices?.length && ethersApi.fromWei(historicalPrices[historicalPrices.length - 1]);

    return (
        <div className={classes.container}>
            <Tooltip
                title={
                    <>
                        {historicalPrices.length ? (
                            <>
                                <p><span>Sales history:</span></p>
                                <div className={classes.tooltipInner}>
                                    {historicalPrices.map((price, index) => {
                                        return <p className={classes.tooltipItem} key={index}>
                                            {commonUtils.formatPrice(ethersApi.fromWei(price))}
                                            <GhstTokenGif width={14} height={14} />
                                            {index !== historicalPrices.length - 1 && <span className={classes.tooltipDivider}>{'->'}</span>}
                                        </p>;
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
                    {listings?.length ? (
                        <Link
                            href={`https://app.aavegotchi.com/baazaar/erc721/${listings[0].id}`}
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
                            <GhstTokenGif width={18} height={18} />
                        </Link>
                    ) : (
                        <div className={classes.listingShadow}>
                            <p>{commonUtils.formatPrice(lastPrice)}</p>
                            <GhstTokenGif width={18} height={18} />
                        </div>
                    )}
                </div>
            </Tooltip>
        </div>
    );
}
