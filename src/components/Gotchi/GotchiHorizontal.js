import React from 'react';
import classNames from 'classnames';

import GotchiId from './common/GotchiId';
import GotchiCollateral from './common/GotchiCollateral';
import GotchiMainTraits from './common/GotchiMainTraits';
import GotchiName from './common/GotchiName';
import GotchiSVG from './common/GotchiSVG';
import GotchiLevel from './GotchiLevel';
import GotchiTraitsHighlight from './GotchiTraitsHighlight';
import HorizontalPrice from '../Items/common/HorizontalPrice/HorizontalPrice';
import styles from './styles';

export default function GotchiHorizontal({ gotchi, item, title, narrowed, renderSvgByStats, render }) {
    const classes = styles();

    const gotchiSections = {
        badges(children) {
            return (
                <div className={classes.gotchiBadges} key={`${gotchi.id}-badges`}>
                    {children}
                </div>
            );
        },

        imageCell(children) {
            return (
                <div className={classes.gotchiImageCell} key={`${gotchi.id}-imageCell`}>
                    {children}
                </div>
            );
        },

        traitsCell(children) {
            return (
                <div key={`${gotchi.id}-traitsCell`} className={classes.gotchiTraitsCell}>
                    {children}
                </div>
            )
        },

        priceCell(children) {
            return (
                <div key={`${gotchi.id}-priceCell`} className={classes.gotchiPriceCell}>
                    {children}
                </div>
            );
        },

        get id() {
            return (
                <GotchiId
                    gotchi={gotchi}
                    title={title}
                    key={`${gotchi.id}-id`}
                />
            );
        },

        get collateral() {
            return (
                <GotchiCollateral
                    gotchi={gotchi}
                    key={`${gotchi.id}-collateral`}
                />
            );
        },

        get level() {
            return (
                <GotchiLevel
                    level={gotchi.level}
                    toNextLevel={gotchi.toNextLevel}
                    experience={gotchi.experience}
                    size={25}
                    key={`${gotchi.id}-level`}
                />
            )
        },

        get mainTraits() {
            return (
                <GotchiMainTraits
                    gotchi={gotchi}
                    key={`${gotchi.id}-mainTraits`}
                />
            );
        },

        get numericTraits() {
            return (
                <GotchiTraitsHighlight
                    traits={gotchi.numericTraits}
                    currentTraits={gotchi.modifiedNumericTraits}
                    key={`${gotchi.id}-numericTraits`}
                />
            )
        },

        get name() {
            return (
                <GotchiName
                    gotchi={gotchi}
                    key={`${gotchi.id}-name`}
                />
            );
        },

        get svg() {
            return (
                <GotchiSVG
                    gotchi={gotchi}
                    renderSvgByStats={renderSvgByStats}
                    key={`${gotchi.id}-svg`}
                />
            );
        },

        // price
        get price() {
            return (
                <HorizontalPrice item={item} key={`${gotchi.id}-gotchi-price`} label='Sold for' />
            )
        }
    }

    function renderSection(value) {
        if (typeof value === 'string') return gotchiSections[value];

        return (
            Object.keys(value).map( (key) => (
                gotchiSections[key](value[key].map( item => (
                    renderSection(item)
                )))
            ))
        )
    }

    return (
        <div className={classNames(classes.gotchi, `haunt${gotchi.hauntId}`, narrowed && 'narrowed', 'horizontal')}>
            {render.map( (name) => {
                return renderSection(name)
            })}
        </div>
    );
}
