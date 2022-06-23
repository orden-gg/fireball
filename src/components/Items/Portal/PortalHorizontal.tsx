import classNames from 'classnames';

import { PortalImage } from './PortalImage';
import { CardName } from '../common/CardName/CardName';
import { CardStats } from '../common/CardStats/CardStats';
import { HorizontalPrice } from '../common/HorizontalPrice/HorizontalPrice';
import { HorizontalLink } from '../common/HorizontalLink/HorizontalLink';
import { styles } from '../styles';

interface PortalHorizontalprops {
    portal: any;
    render: any;
}

export function PortalHorizontal({ portal, render }: PortalHorizontalprops) {
    const classes = styles();

    const gotchiSections = {
        imageCell(children: any) {
            return (
                <div className={classes.portalImageCell}>
                    {children}
                </div>
            );
        },

        infoCell(children: any) {
            return (
                <div className={classes.portalInfoCell} key={`${portal.id}-portal-infoCell`}>
                    {children}
                </div>
            );
        },

        priceCell(children: any) {
            return (
                <div key={`${portal.id}-priceCell`} className={classes.portalPriceCell}>
                    {children}
                </div>
            );
        },

        get name() {
            return (
                <HorizontalLink item={portal} url={'https://aavegotchi.com/portal/'} />
            );
        },

        get cardStats() {
            return (
                <CardStats itemStats={`Haunt ${portal.portal.hauntId}`} />
            );
        },

        get cardName() {
            return (
                <CardName itemName={`Portal ${portal.tokenId}`} itemRarity={'none'} item={portal}  />
            );
        },

        // image
        get image() {
            return <PortalImage portal={portal} key={`${portal.id}-portal-image`} />;
        },

        // price
        get price() {
            return <HorizontalPrice label='Sold for ' item={portal} key={`${portal.id}-portal-price`} />;
        }
    };

    function renderSection(value: any) {
        if (typeof value === 'string') {
            return gotchiSections[value];
        }

        return (
            Object.keys(value).map(key => (
                gotchiSections[key](value[key].map((item: any) => (
                    renderSection(item)
                )))
            ))
        );
    }

    return (
        <div className={classNames(classes.horizontalCard, `haunt${portal.portal.hauntId}`)}>
            {render.map((name: any) => {
                return renderSection(name);
            })}
        </div>
    );
}
