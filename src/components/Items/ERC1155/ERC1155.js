
import React, { useEffect, useState } from 'react';
import { Link, Typography, Tooltip } from '@mui/material';
import { useTheme } from '@emotion/react';
import { alpha } from '@mui/system';
import ContentLoader from 'react-content-loader';
import classNames from 'classnames';
import useStyles from '../styles';

import commonUtils from '../../../utils/commonUtils';
import thegraph from '../../../api/thegraph';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ghstIcon from '../../../assets/images/ghst-doubleside.gif';

export default function ERC1155({children, item}) {
    const classes = useStyles();
    const theme = useTheme();

    const [lastPrice, setLastPrice] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);

    useEffect(() => {
        getPrices();
    }, [item]);

    const getPrices = () => {
        // last sold
        thegraph.getErc1155Price(item.id, true, item.category, 'timeLastPurchased', 'desc').then((response) => {
            setLastPrice(response);
        });

        // current
        thegraph.getErc1155Price(item.id, false, item.category, 'priceInWei', 'asc').then((response) => {
            setCurrentPrice(response);
        });
    }

    return (
        <div className={classNames(classes.item, item.rarity)}>
            <div className={classes.labels}>
                {lastPrice && currentPrice ? (
                    <Tooltip title='Total value' placement='top' followCursor>
                        <div
                            className={classNames(classes.label, classes.labelTotal)}
                            style={{ backgroundColor: theme.palette.rarity[item.rarity], color: item.rarity === 'drop' ? theme.palette.text.primary : theme.palette.secondary.main }}
                        >
                            <Typography variant='subtitle2'>
                                {commonUtils.formatPrice(lastPrice.price * item.balance)}
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
                        backgroundColor={alpha(theme.palette.primary.dark, .5)}
                        foregroundColor={alpha(theme.palette.primary.main, .5)}
                    >
                        <rect x='0' y='0' width='70' height='27' /> 
                    </ContentLoader>
                )}

                <div className={classNames(classes.label, classes.labelBalance)}>
                    <Typography variant='subtitle2'>
                        {item.balance}
                    </Typography>
                </div>
            </div>

            {children}

            <div className={classes.prices}>
                {currentPrice && lastPrice ? (
                    <Tooltip title={`Sold for ${lastPrice.price}`} placement='top' followCursor>
                        <Link
                            href={`https://www.aavegotchi.com/baazaar/erc1155/${currentPrice.listing}`}
                            target='_blank'
                            underline='none'
                            className={classNames(classes.label, classes.labelTotal, 'baazarPrice')}
                        >
                            {currentPrice.price > lastPrice.price ? (
                                <>
                                    <KeyboardArrowUpIcon color='success' fontSize='inherit' />
                                    <Typography variant='subtitle2' sx={{ color: theme.palette.success.light }}>
                                        {currentPrice.price === 0 ? commonUtils.formatPrice(lastPrice.price) : commonUtils.formatPrice(currentPrice.price)}
                                    </Typography>
                                </>

                            ) : (
                                <>
                                    <KeyboardArrowDownIcon color='warning' fontSize='inherit' />
                                    <Typography variant='subtitle2' sx={{ color: theme.palette.warning.main }}>
                                        {currentPrice.price === 0 ? commonUtils.formatPrice(lastPrice.price) : commonUtils.formatPrice(currentPrice.price)}
                                    </Typography>
                                </>
                            )}
                            <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                        </Link>
                    </Tooltip>
                ) : (
                    <ContentLoader
                        speed={2}
                        width={70}
                        height={27}
                        viewBox='0 0 70 27'
                        backgroundColor={alpha(theme.palette.secondary.dark, .5)}
                        foregroundColor={alpha(theme.palette.secondary.main, .5)}
                        style={{ marginLeft: 4 }}
                    >
                        <rect x='0' y='0' width='70' height='27' /> 
                    </ContentLoader>
                )}
            </div>
        </div>
    )
}