import React, { useEffect, useState } from 'react';
import { Link, Typography, Tooltip } from '@mui/material';
import classNames from 'classnames';
import useStyles from '../styles';

import itemUtils from '../../../utils/itemUtils';
import commonUtils from '../../../utils/commonUtils';
import thegraph from '../../../api/thegraph';

import ghstIcon from '../../../assets/images/ghst-doubleside.gif';

export default function Ticket({ticket}) {
    const classes = useStyles();
    const [lastPrice, setLastPrice] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);

    useEffect(() => {
        getPrices();
    }, [ticket]);

    const getPrices = () => {
        thegraph.getTicketPrice(ticket.id, true, 'timeLastPurchased', 'desc').then((response) => {
            setLastPrice(response);
        });

        thegraph.getTicketPrice(ticket.id, false, 'priceInWei', 'asc').then((response) => {
            setCurrentPrice(response);
        });
    }

    return (
        <div className={classNames(classes.item, ticket.name)}>
            <div className={classes.labels}>
                {lastPrice && currentPrice ? (
                    <Tooltip title='Total value' placement='top' followCursor>
                        <div className={classNames(classes.label, classes.labelTotal)}>
                            <Typography variant='subtitle2'>
                                {commonUtils.formatPrice(lastPrice.price * ticket.balance)}
                            </Typography>
                            <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                        </div>
                    </Tooltip>

                ) : (
                    <div>spinner</div>
                )}

                <div className={classNames(classes.label, classes.labelBalance)}>
                    <Typography variant='subtitle2'>
                        {ticket.balance}
                    </Typography>
                </div>
            </div>

            <div className={classes.iconWrapper}>
                <img
                    src={itemUtils.getTicketImg(ticket.name)}
                    alt={ticket.name}
                    className={classes.icon}
                />
            </div>

            <div className={classes.nameWrapper}>
                <Typography className={classNames(classes.name, classes.textHighlight, ticket.name)}>
                    {commonUtils.capitalize(ticket.name)} ticket
                </Typography>
            </div>

            <div className={classes.prices}>
                {lastPrice ? (
                    <Tooltip title='Last sale' placement='top' followCursor>
                        <Link href={`https://www.aavegotchi.com/baazaar/erc1155/${lastPrice.listing}`} target='_blank' underline='none' className={classNames(classes.label, classes.labelTotal, 'info')}>
                            <Typography variant='subtitle2'>
                                {commonUtils.formatPrice(lastPrice.price)}
                            </Typography>
                            <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                        </Link>
                    </Tooltip>
                ) : (
                    <div>placeholder</div>
                )}

                {currentPrice ? (
                    <Tooltip title='Current price' placement='top' followCursor>
                        <Link href={`https://www.aavegotchi.com/baazaar/erc1155/${currentPrice.listing}`} target='_blank' underline='none' className={classNames(classes.label, classes.labelTotal, 'warning')}>
                            <Typography variant='subtitle2'>
                                {commonUtils.formatPrice(currentPrice.price)}
                            </Typography>
                            <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                        </Link>
                    </Tooltip>
                ) : (
                    <div>placeholder</div>
                )}
            </div>
        </div>
    )
}