import React from 'react';
import { Link, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';
import styles, { CustomTooltipStyles } from './styles';

import graphUtils from '../../utils/graphUtils';

import GotchiLevel from './GotchiLevel';
import GotchiSkillPoints from './GotchiSkillPoints';
import GotchiTraitsHighlight from './GotchiTraitsHighlight';
import GotchiWearablesLine from './GotchiWearablesLine';
import GotchiListing from './GotchiListing';
import HighlightNumber from '../HighlightNumber';
import GotchiSvg from './GotchiSvg';
import GotchiSvgByStats from './GotchiSvgByStats';

import CallMade from '@mui/icons-material/CallMade';

import ghstIcon from '../../assets/images/ghst-doubleside.gif';
import ShineLabel from '../Labels/ShineLabel';
import commonUtils from '../../utils/commonUtils';
import itemUtils from '../../utils/itemUtils';

export default function Gotchi({gotchi, title, narrowed, renderSvgByStats, render, portal}) {
    const classes = {
        ...styles(),
        ...CustomTooltipStyles()
    };

    const collateral = graphUtils.getCollateralName(gotchi.collateral);

    const gotchiSections = {
        badges: (children) => {
            return (
                <div className={classes.gotchiBadges} key={`${gotchi.id}-badges`}>
                    {children}
                </div>
            )
        },
        get id() {
            return (
                <Tooltip title={`Haunt ${gotchi.hauntId}`} classes={{ tooltip: classes.customTooltip }} enterTouchDelay={0} placement='top' followCursor key={`${gotchi.id}-id`}>
                    <div className={classes.gotchiId}>
                        {title || gotchi.id}
                    </div>
                </Tooltip>
            )
        },
        get owner() {
            return (
                <Link
                    className={classes.owner}
                    href={`/client/?address=${gotchi.owner.id}`}
                    target='_blank'
                    key={`${gotchi.id}-owner`}
                >
                    <p>{commonUtils.cutAddress(gotchi.owner.id)}</p>
                </Link>
            )
        },
        get collateral() {
            return (
                <Tooltip title={collateral} classes={{ tooltip: classes.customTooltip }} enterTouchDelay={0} placement='top' followCursor key={`${gotchi.id}-collateral`}>
                    <div className={classes.gotchiBadge}>
                        <img src={graphUtils.getCollateralImg(collateral)} width={25} alt={collateral} />
                    </div>
                </Tooltip>
            )
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
            )
        },
        get mainTraits() {
            return (
                <div className={classNames(classes.gotchiMainTraits, classes.gotchiTraits)} key={`${gotchi.id}-mainTraits`}>
                    <div className={classes.gotchiTraitsInner}>
                        <HighlightNumber type={calculateRarityType(gotchi.modifiedRarityScore)}>
                            <p className={classes.mainVal}>
                                🏆{gotchi.modifiedRarityScore}

                                <span className={classes.defaultVal}>
                                    ({gotchi.baseRarityScore})
                                </span>
                            </p>        
                        </HighlightNumber>
                    </div>

                    <div className={classes.gotchiTraitsInner}>
                        <HighlightNumber type={calculateKinshipType(gotchi.kinship)}>
                            <p className={classes.mainVal}>
                                🧡{gotchi.kinship}
                            </p>        
                        </HighlightNumber>
                    </div>
                </div>
            )
        },
        get numericTraits() {
            return <GotchiTraitsHighlight traits={gotchi.numericTraits} currentTraits={gotchi.modifiedNumericTraits} key={`${gotchi.id}-numericTraits`} />
        },
        get wearablesLine() {
            return (
                <div className={classes.gotchiInnerSection} key={`${gotchi.id}-wearablesLine`}>
                    <GotchiWearablesLine wearables={gotchi.equippedWearables}/>
                </div>
            )
        },
        get name() {
            return (
                <Link
                    className={classes.gotchiName}
                    href={`https://app.aavegotchi.com/gotchi/${gotchi.id}`}
                    target='_blank'
                    underline='none'
                    key={`${gotchi.id}-name`}
                >
                    <p>{gotchi.name ? gotchi.name : 'Unnamed'}</p>
                    <CallMade className={classes.callMadeIcon} />
                </Link>
            )
        },
        get svg() {
            return (
                <div className={classes.gotchiSvg} key={`${gotchi.id}-svg`}>
                    {portal ? (
                        <img
                            className={classes.gotchiSvgPortal}
                            src={itemUtils.getPortalImg(gotchi.hauntId)}
                            alt={`haunt-${gotchi.hauntId}-portal`}
                            width={'100%'} />
                    ) : (
                        null
                    )}

                    <div className={classes.gotchiSvgInner}>
                        {
                            renderSvgByStats ? (
                                <GotchiSvgByStats gotchi={gotchi} size={'100%'} />
                            ) : (
                                <GotchiSvg id={gotchi.id} size={'100%'} />
                            )
                        }

                        {gotchi.equippedSetName ? (
                            <div className={classes.gotchiSetName}>
                                <ShineLabel text={gotchi.equippedSetName} />
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            )
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
                gotchi.reward || gotchi.reward === 0 ? (
                    <div className={classes.rankBox} key={`${gotchi.id}-rewards`}>
                        {gotchi.reward > 0 ? (
                            <Tooltip
                                title={
                                    <>
                                        {gotchi.rewardStats.map((item, index) => {
                                            return item.reward !== 0 ? (
                                                <p key={index}>
                                                    {item.name}[<span>{item.position}</span>] - 
                                                    <span className={classes.rankReward}>
                                                        {commonUtils.formatPrice(item.reward)}
                                                        <img src={ghstIcon} width='14' alt='GHST Token Icon' />
                                                    </span>
                                                </p>
                                            ) : (
                                                null
                                            )
                                        })}
                                    </>
                                }
                                classes={{ tooltip: classes.customTooltip }}
                                enterTouchDelay={0}
                                placement='top'
                                followCursor
                            >
                                <Box className={classes.rankRewardAmount}>
                                    🏆<Typography className={classes.rankRewardAmountNumber}>{commonUtils.formatPrice(gotchi.reward)}</Typography>🏆
                                </Box>
                            </Tooltip>
                                
                        ) : (
                            <div className={classes.rankStatus} key={`${gotchi.id}-rewards`}>
                                <Typography className={classes.rankStatusText}>Unkranked</Typography>
                            </div>
                        )}
                    </div>
                ) : (
                    null
                )
            )
        }
    }

    const calculateRarityType = (rarity) => {
        return rarity >= 700 ? 'godlike' : rarity >= 600 ? 'mythical' : rarity >= 500 ? 'rare' : '';
    };

    const calculateKinshipType = (kin) => {
        return kin >= 500 ? 'godlike' : kin >= 250 ? 'mythical' : kin >= 100 ? 'rare' : '';
    };

    function renderSection(value) {

        if(typeof value === 'string') return gotchiSections[value];

        return (
            Object.keys(value).map( (key) => (
                gotchiSections[key](value[key].map( item => (
                    renderSection(item)
                )))
            ))
        )
    }
    
    return (
        <div className={classNames(classes.gotchi, `haunt${gotchi.hauntId}`, narrowed && 'narrowed' )}>
            {render.map( (name) => {
                return renderSection(name)
            })}
        </div>
    );
}