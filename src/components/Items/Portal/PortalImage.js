import React from 'react';

import { Erc721Categories } from 'data/types';
import sealedPortal from 'assets/images/portals/h1-sealed.svg';
import openPortal from 'assets/images/portals/h1-open.svg';
import h2SealedPortal from 'assets/images/portals/h2-sealed.svg';
import h2OpenPortal from 'assets/images/portals/h2-open.svg';

import styles, { portalStyles } from '../styles';

export default function PortalImage({ portal }) {
    const classes = {
        ...styles(),
        ...portalStyles()
    };

    return (
        <img className={classes.portalImage}
             style={{'maxWidth': '100px'}}
             src={
                portal.portal.hauntId === '1' ?
                (portal.category === Erc721Categories.ClosedPortal ? sealedPortal : openPortal) :
                (portal.category === Erc721Categories.ClosedPortal ? h2SealedPortal : h2OpenPortal)
            }
            alt='Portal'
        />
    );
}
