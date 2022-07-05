import { Link, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { GhstTokenIcon } from 'components/Icons/Icons';
import { EthersApi } from 'api';
import { CommonUtils } from 'utils';

import { CustomTooltipStyles } from '../../Gotchi/styles';
import { styles } from './styles';

interface ERC721ListingProps {
    listings: any[];
    historicalPrices: any[];
}

export function ERC721Listing({ listings, historicalPrices }: ERC721ListingProps) {
    const classes = { ...styles(), ...CustomTooltipStyles() };

    const currentPrice: any = listings?.length && EthersApi.fromWei(listings[0].priceInWei);
    const lastPrice: any = historicalPrices?.length && EthersApi.fromWei(historicalPrices[historicalPrices.length - 1]);

    return (
        <>
            {
                listings.length || historicalPrices.length ? (
                    <Tooltip
                        title={
                            historicalPrices.length ? (
                                <>
                                    <p><span>Sales history:</span></p>
                                    <div className={classes.tooltipInner}>
                                        {historicalPrices.map((price: any, index: number) => {
                                            return <p className={classes.tooltipItem} key={index}>
                                                {CommonUtils.formatPrice(EthersApi.fromWei(price))}
                                                <GhstTokenIcon className={classes.token} width={12} height={12} />
                                                {index !== historicalPrices.length - 1 && <span className={classes.tooltipDivider}>{'->'}</span>}
                                            </p>;
                                        })}
                                    </div>
                                </>
                            ) : (
                                <p><span>No history</span></p>
                            )
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
                                        <p>{CommonUtils.formatPrice(currentPrice)}</p>
                                    ) : currentPrice > lastPrice ? (
                                        <div className={classes.lastPriceUp}>
                                            <KeyboardArrowUpIcon fontSize='inherit' />
                                            <p>{CommonUtils.formatPrice(currentPrice)}</p>
                                        </div>
                                    ) : (
                                        <div className={classes.lastPriceDown}>
                                            <KeyboardArrowDownIcon color='warning' fontSize='inherit' />
                                            <p>{CommonUtils.formatPrice(currentPrice)}</p>
                                        </div>
                                    )}
                                    <GhstTokenIcon className={classes.token} width={14} height={14} />
                                </Link>
                            ) : (
                                <div className={classes.listingShadow}>
                                    <p>{CommonUtils.formatPrice(lastPrice)}</p>
                                    <GhstTokenIcon className={classes.token} width={14} height={14} />
                                </div>
                            )}
                        </div>
                    </Tooltip>
                ) : (
                    <div className={classes.listing}></div>
                )
            }
        </>
    );
}
