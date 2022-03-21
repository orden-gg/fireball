import React from 'react';
import { Link, Tooltip, Typography } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';

import classNames from 'classnames';

import ethersApi from 'api/ethers.api';
import commonUtils from 'utils/commonUtils';
import ghstIcon from 'assets/images/animated/ghst-token.gif';
import sealedPortal from 'assets/images/portals/h1-sealed.svg';
import openPortal from 'assets/images/portals/h1-open.svg';
import h2SealedPortal from 'assets/images/portals/h2-sealed.svg';
import h2OpenPortal from 'assets/images/portals/h2-open.svg';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles, portalStyles } from '../styles';

export default function Portal({ portal }) {
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

            <img className={classes.portalImage} src={
                portal.portal.hauntId === "1" ?
                    (portal.category === '0' ? sealedPortal : openPortal) :
                    (portal.category === '0' ? h2SealedPortal : h2OpenPortal)
            } alt="Portal" />

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
                <Typography className={classNames(classes.name, classes.textHighlight)}>
                    Portal {portal.tokenId}
                </Typography>
                <CallMade className={classes.callMadeIcon} />
            </Link>
        </div>
    )
}
