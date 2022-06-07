import classNames from 'classnames';

import itemUtils from 'utils/itemUtils';
import WearableImage from './WearableImage';
import HorizontalPrice from '../common/HorizontalPrice/HorizontalPrice';
import HorizontalLink from '../common/HorizontalLink/HorizontalLink';
import CardName from '../common/CardName/CardName';
import CardStats from '../common/CardStats/CardStats';
import styles from './../styles';

export default function WearableHorizontal({ wearable, render }) {
    const classes = styles();

    const gotchiSections = {
        // image
        imageCell(children) {
            return (
                <div className={classes.wearableImageCell}>
                    {children}
                </div>
            );
        },

        // body
        statsCell(children) {
            return (
                <div className={classes.wearableStatsCell} key={`${wearable.id}-statsCell`}>
                    {children}
                </div>
            );
        },

        priceCell(children) {
            return (
                <div key={`${wearable.id}-priceCell`} className={classes.wearablePriceCell}>
                    {children}
                </div>
            );
        },

        get image() {
            return (
                <WearableImage wearable={wearable} key={`${wearable.id}-image`} />
            );
        },

        get name() {
            return (
                <HorizontalLink item={wearable} url={'https://aavegotchi.com/baazaar/erc1155/'} />
            );
        },

        get cardStats() {
            return <CardStats item={wearable} />
        },

        // price
        get cardName() {
            return <CardName item={wearable} />
        },

        // price
        get price() {
            return <HorizontalPrice label='Sold for ' item={wearable} key={`${wearable.id}-price`} />
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
        <div className={classNames(classes.horizontalCard, itemUtils.getItemRarityById(wearable.erc1155TypeId))}>
            {wearable.rarity}
            {render.map(name => {
                return renderSection(name)
            })}
        </div>
    );
}
