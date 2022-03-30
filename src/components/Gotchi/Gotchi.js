import React from 'react';

import classNames from 'classnames';

import GotchiId from './GotchiId/GotchiId';
import GotchiCollateral from './GotchiCollateral/GotchiCollateral';
import GotchiOwner from './GotchiOwner/GotchiOwner';
import GotchiMainTraits from './GotchiMainTraits/GotchiMainTraits';
import GotchiName from './GotchiName/GotchiName';
import GotchiImage from './GotchiImage/GotchiImage';
import GotchiRewards from './GotchiRewards/GotchiRewards';
import GotchiLevel from './GotchiLevel/GotchiLevel';
import GotchiSkillPoints from './GotchiSkillPoints/GotchiSkillPoints';
import GotchiListing from './GotchiListing/GotchiListing';
import GotchiTraits from './GotchiTraits/GotchiTraits';
import GotchiWearablesLine from './GotchiWearablesLine/GotchiWearablesLine';
import GotchiRs from './GotchiRs/GotchiRs';
import GotchiKinship from './GotchiKinship/GotchiKinship';

import styles from './styles';

export default function Gotchi({ gotchi, title, narrowed, renderSvgByStats, render, portal }) {
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

        get rs() {
            return (
                <GotchiRs
                    gotchi={gotchi}
                    key={`${gotchi.id}-rs`}
                />
            );
        },

        get kinship() {
            return (
                <GotchiKinship
                    gotchi={gotchi}
                    key={`${gotchi.id}-kinship`}
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

        get traits() {
            return (
                <GotchiTraits
                    traits={gotchi.numericTraits}
                    currentTraits={gotchi.modifiedNumericTraits}
                    key={`${gotchi.id}-traits`}
                />
            )
        },

        get wearablesLine() {
            return (
                <div
                    className={classes.gotchiInnerSection}
                    key={`${gotchi.id}-wearablesLine`}
                >
                    <GotchiWearablesLine gotchi={gotchi}/>
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
                <GotchiImage
                    gotchi={gotchi}
                    renderSvgByStats={renderSvgByStats}
                    portal={portal}
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
