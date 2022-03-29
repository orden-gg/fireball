import React from 'react';
import classNames from 'classnames';
import GotchiId from './common/GotchiId';
import GotchiCollateral from './common/GotchiCollateral';
import GotchiOwner from './common/GotchiOwner';
import GotchiMainTraits from './common/GotchiMainTraits';
import GotchiName from './common/GotchiName';
import GotchiSVG from './common/GotchiSVG';
import GotchiRewards from './common/GotchiRewards';
import GotchiLevel from './GotchiLevel';
import GotchiSkillPoints from './GotchiSkillPoints';
import GotchiListing from './GotchiListing';
import GotchiTraitsHighlight from './GotchiTraitsHighlight';
import GotchiWearablesLine from './GotchiWearablesLine';
import styles from './styles';

export default function Gotchi({ gotchi, title, narrowed, renderSvgByStats, render, inPortal }) {
    const classes = styles();

    const gotchiSections = {
        badges: (children) => {
            return (
                <div
                    className={classes.gotchiBadges}
                    key={`${gotchi.id}-badges`}
                >
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

        get owner() {
            return (
                <GotchiOwner
                    gotchi={gotchi}
                    key={`${gotchi.id}-owner`}
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

        get skillpoints() {
            return (
                <GotchiSkillPoints
                    id={gotchi.id}
                    usedPoints={gotchi.usedSkillPoints}
                    key={`${gotchi.id}-skillpoints`}
                />
            );
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

        get wearablesLine() {
            return (
                <div
                    className={classes.gotchiInnerSection}
                    key={`${gotchi.id}-wearablesLine`}
                >
                    <GotchiWearablesLine wearables={gotchi.equippedWearables}/>
                </div>
            );
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
                    inPortal={inPortal}
                    key={`${gotchi.id}-svg`}
                />
            );
        },

        get listing() {
            return (
                <GotchiListing
                    id={gotchi.id}
                    listing={gotchi.listings}
                    history={gotchi.historicalPrices}
                    key={`${gotchi.id}-listings`}
                />
            )
        },

        get rewards() {
            return (
                <GotchiRewards
                    gotchi={gotchi}
                    key={`${gotchi.id}-rewards`}
                />
            )
        }
    }

    function renderSection(value) {
        if (typeof value === 'string') return gotchiSections[value];

        return (
            Object.keys(value).map(key => (
                gotchiSections[key](
                    value[key].map(item => (
                        renderSection(item)
                    ))
                )
            ))
        )
    }

    return (
        <div className={classNames(classes.gotchi, `haunt${gotchi.hauntId}`, narrowed && 'narrowed', 'vertical' )}>
            {render.map((name) => {
                return renderSection(name)
            })}
        </div>
    );
}
