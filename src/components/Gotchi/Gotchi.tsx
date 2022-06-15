import { useCallback, useState } from 'react';

import classNames from 'classnames';

import { GotchiChanelling } from './GotchiChanneling/GotchiChanneling';
import { GotchiCollateral } from './GotchiCollateral/GotchiCollateral';
import { GotchiOwner } from './GotchiOwner/GotchiOwner';
import { GotchiName } from './GotchiName/GotchiName';
import { GotchiImage } from './GotchiImage/GotchiImage';
import GotchiRewards from './GotchiRewards/GotchiRewards';
import { GotchiLevel } from './GotchiLevel/GotchiLevel';
import GotchiSkillPoints from './GotchiSkillPoints/GotchiSkillPoints';
import GotchiTraits from './GotchiTraits/GotchiTraits';
import GotchiWearablesLine from './GotchiWearablesLine/GotchiWearablesLine';
import GotchiRs from './GotchiRs/GotchiRs';
import GotchiKinship from './GotchiKinship/GotchiKinship';
import { GotchiLending } from './GotchiLending/GotchiLending';
import { GotchiLendingStats } from './GotchiLendingStats/GotchiLendingStats';
import ERC721Listing from '../Items/ERC721Listing/ERC721Listing';
import { FlipButton } from './FlipButton/FlipButton';
import gotchiverseUtils from 'utils/gotchiverseUtils';

import styles from './styles';

interface GotchiProps {
    gotchi: any;
    render: any;
    renderSvgByStats?: any;
    portal?: any;
    className?: string;
}

export function Gotchi({ gotchi, renderSvgByStats, render, portal, className }: GotchiProps) {
    const classes = styles();

    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const flipCard = useCallback(() => {
        setIsFlipped(!isFlipped);
    }, [isFlipped]);

    const gotchiSections = {
        badges: (children: any) => {
            return (
                <div
                    className={classes.gotchiBadges}
                    key={`${gotchi.id}-badges`}
                >
                    {children}
                </div>
            );
        },

        flipContainer: (children: any) => {
            return (
                <div
                    className={classNames(isFlipped && classes.gotchiIsFlipped)}
                    key={`${gotchi.id}-flipContainer`}
                >
                    {children}
                </div>
            );
        },

        flipBack: (children: any) => {
            return (
                <div
                    className={classes.gotchiFlipBack}
                    key={`${gotchi.id}-flipBack`}
                >
                    {children}
                </div>
            );
        },

        flipFront: (children: any) => {
            return (
                <div
                    className={classes.gotchiFlipFront}
                    key={`${gotchi.id}-flipFront`}
                >
                    {children}
                </div>
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
            );
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

        get traits() {
            return (
                <GotchiTraits
                    traits={gotchi.numericTraits}
                    currentTraits={gotchi.modifiedNumericTraits}
                    key={`${gotchi.id}-traits`}
                />
            );
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

        get lending() {
            return (
                <GotchiLending
                    gotchi={gotchi}
                    key={`${gotchi.id}-lending`}
                />
            );
        },

        get lendingStats() {
            return (
                <GotchiLendingStats
                    gotchi={gotchi}
                    key={`${gotchi.id}-lending-stats`}
                />
            );
        },

        get listing() {
            return (
                <ERC721Listing
                    key={`${gotchi.id}-listing`}
                    listings={gotchi.listings}
                    historicalPrices={gotchi.historicalPrices}
                />
            );
        },

        get channeling() {
            return (
                <GotchiChanelling
                    gotchiId={gotchi.id}
                    key={`${gotchi.id}-channeling`}
                />
            );
        },

        get rewards() {
            return (
                <GotchiRewards
                    gotchi={gotchi}
                    key={`${gotchi.id}-rewards`}
                />
            );
        },

        get flipButton() {
            return <FlipButton key={`${gotchi.id}-flipButton`} onFlipCard={flipCard} />;
        }
    };

    function renderSection(value: any) {
        if (typeof value === 'string') return gotchiSections[value];

        return (
            Object.keys(value).map(key => (
                gotchiSections[key](
                    value[key].map((item: any) => (
                        renderSection(item)
                    ))
                )
            ))
        );
    }

    return (
        <div
            className={classNames(
                classes.gotchi,
                `haunt${gotchi.hauntId}`,
                'vertical',
                className,
                gotchiverseUtils.getRarityNameByRS(gotchi.modifiedRarityScore)
            )}
        >
            {render.map((name: any) => {
                return renderSection(name);
            })}
        </div>
    );
}
