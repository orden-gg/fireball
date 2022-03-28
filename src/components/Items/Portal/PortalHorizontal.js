import React from 'react';
import classNames from 'classnames';

import PortalImage from './PortalImage';
import CardName from '../common/CardName/CardName';
import CardStats from '../common/CardStats/CardStats';
import HorizontalPrice from '../common/HorizontalPrice/HorizontalPrice';
import HorizontalLink from '../common/HorizontalLink/HorizontalLink';
import styles from './../styles';

export default function PortalHorizontal({ portal, render }) {
    const classes = styles();

    const gotchiSections = {
        imageCell(children) {
            return (
                <div className={classes.portalImageCell}>
                    {children}
                </div>
            );
        },

        infoCell(children) {
            return (
                <div className={classes.portalInfoCell} key={`${portal.id}-portal-infoCell`}>
                    {children}
                </div>
            );
        },

        priceCell(children) {
            return (
                <div key={`${portal.id}-priceCell`} className={classes.portalPriceCell}>
                    {children}
                </div>
            );
        },

        get name() {
            return (
                <HorizontalLink item={portal} url={`https://aavegotchi.com/portal/`} />
            );
        },

        get cardStats() {
            return (
                <CardStats itemStats={`Haunt ${portal.portal.hauntId}`} />
            )
        },

        get cardName() {
            return (
                <CardName itemName={`Portal ${portal.tokenId}`} itemRarity={'none'} item={portal}  />
            );
        },

        // image
        get image() {
            return <PortalImage portal={portal} key={`${portal.id}-portal-image`} />
        },

        // price
        get price() {
            return <HorizontalPrice label='Sold for ' item={portal} key={`${portal.id}-portal-price`} />
        }
    }

    function renderSection(value) {
        if (typeof value === 'string') {
            return gotchiSections[value];
        }

        return (
            Object.keys(value).map(key => (
                gotchiSections[key](value[key].map(item => (
                    renderSection(item)
                )))
            ))
        )
    }

    return (
        <div className={classNames(classes.horizontalCard, `haunt${portal.portal.hauntId}`)}>
            {render.map(name => {
                return renderSection(name)
            })}
        </div>
    );
}
