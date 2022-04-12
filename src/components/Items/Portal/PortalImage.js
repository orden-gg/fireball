import React from 'react';

import { H1OpenedPortalIcon, H1SealedPortalIcon, H2OpenedPortalIcon, H2SealedPortalIcon } from 'components/Icons/Icons';
import { Erc721Categories } from 'data/types';

import styles, { portalStyles } from '../styles';

export default function PortalImage({ portal }) {
    const classes = {
        ...styles(),
        ...portalStyles()
    };

    const renderPortalImage = (portal) => {
        let portalIcon;

        if (portal.portal.hauntId === '1') {
            portalIcon = portal.category === Erc721Categories.ClosedPortal ?
                <H1SealedPortalIcon width={100} height={100} /> :
                <H1OpenedPortalIcon width={100} height={100} />;
        } else {
            portalIcon = portal.category === Erc721Categories.ClosedPortal ?
                <H2SealedPortalIcon width={100} height={100} /> :
                <H2OpenedPortalIcon width={100} height={100} />;
        }

        return React.cloneElement(portalIcon, { className: classes.portalImage });
    }

    return (
        renderPortalImage(portal)
    );
}
