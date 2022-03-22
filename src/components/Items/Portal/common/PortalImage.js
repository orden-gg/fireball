import React from 'react';

import sealedPortal from 'assets/images/portals/h1-sealed.svg';
import openPortal from 'assets/images/portals/h1-open.svg';
import h2SealedPortal from 'assets/images/portals/h2-sealed.svg';
import h2OpenPortal from 'assets/images/portals/h2-open.svg';

import styles from '../../styles';

export default function PortalImage({ portal }) {
    const classes = styles();

    return (
        <img className={classes.portalImage}
             style={{'maxWidth': '100px'}}
             src={
                portal.portal.hauntId === '1' ?
                (portal.category === '0' ? sealedPortal : openPortal) :
                (portal.category === '0' ? h2SealedPortal : h2OpenPortal)
        } alt="Portal" />
    );
}
