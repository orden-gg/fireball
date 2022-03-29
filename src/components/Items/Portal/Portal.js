import React from 'react';
import { Link, Tooltip, Typography } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';

import classNames from 'classnames';

import ethersApi from 'api/ethers.api';
import commonUtils from 'utils/commonUtils';
import ghstIcon from 'assets/images/animated/ghst-token.gif';

import PortalImage from './PortalImage';
import CardName from '../common/CardName/CardName';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles, portalStyles } from '../styles';

export default function Portal({ portal, isShopItem = false }) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles(),
        ...portalStyles()
    };

    return (
        <div className={classNames(classes.item, classes.portalCard)}>
            <div className={classes.labels}>
                { !isShopItem &&
                    <>
                        <Tooltip title='Price' classes={{ tooltip: classes.customTooltip }} placement='top' followCursor>
                            <div className={classNames(classes.label, classes.labelTotal, classes.labelParselPrice)}>
                                <Typography variant='subtitle2'>
                                    {
                                        commonUtils.formatPrice(
                                            ethersApi.fromWei(portal.priceInWei)
                                        )
                                    }
                                </Typography>
                                <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                            </div>
                        </Tooltip>
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
                            Haunt {portal.portal.hauntId}
                        </Typography>
                    </div>
                </Tooltip>
            </div>

            <PortalImage portal={portal} />

            <div className={classNames(classes.label, classes.labelSlot)}>
                [{portal.tokenId}]
            </div>

            <Link
                href={
                    `https://app.aavegotchi.com/portal/${portal.tokenId}`
                }
                target='_blank'
                underline='none'
                className={classNames(classes.nameWrapper, 'two-lined')}
            >
                <CardName itemName={`Portal ${portal.tokenId}`} itemRarity={'none'} item={portal} />
                <CallMade className={classes.callMadeIcon} />
            </Link>

            <div className={classNames(classes.label, classes.labelTotal, classes.labelParselPrice, classes.shopParcelPrice)}>
                <Typography variant='subtitle2'>
                    { commonUtils.formatPrice(ethersApi.fromWei(portal.priceInWei)) }
                </Typography>
                <img src={ghstIcon} width='18' alt='GHST Token Icon' />
            </div>
        </div>
    )
}
