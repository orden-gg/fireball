import React from 'react';
import { Link, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';
import styles from "./styles";

import graphUtils from '../../utils/graphUtils';

import GotchiLevel from './GotchiLevel';
import GotchiTraitsHighlight from './GotchiTraitsHighlight';
import GotchiWearablesLine from './GotchiWearablesLine';
import HighlightNumber from '../HighlightNumber';
import GotchiSvg from './GotchiSvg';
import GotchiSvgByStats from './GotchiSvgByStats';

import CallMade from '@mui/icons-material/CallMade';

import ghstIcon from '../../assets/images/ghst-doubleside.gif';
import ShineLabel from '../Labels/ShineLabel';
import commonUtils from '../../utils/commonUtils';

export default function Gotchi({gotchi, title, narrowed, renderSvgByStats, render}) {
    const classes = styles();

    const collateral = graphUtils.getCollateralName(gotchi.collateral);

    const gotchiSections = {
        badges: (children) => {
            return (
                <div key={commonUtils.generateKey('badges')} className={classes.gotchiBadges}>
                    {children}
                </div>
            )
        },
        get id() {
            return (
                <Tooltip key={commonUtils.generateKey('id')} title={`Haunt ${gotchi.hauntId}`} classes={{ tooltip: classes.customTooltip }} enterTouchDelay={0} placement='top' followCursor>
                    <div className={classes.gotchiId}>
                        {title || gotchi.id}
                    </div>
                </Tooltip>
            )
        },
        get owner() {
            return (
                <Link
                    key={commonUtils.generateKey('owner')} 
                    className={classes.owner}
                    href={`/client/?address=${gotchi.owner.id}`}
                    target="_blank"
                >
                    <p>{commonUtils.cutAddress(gotchi.owner.id)}</p>
                </Link>
            )
        },
        get collateral() {
            return (
                <Tooltip key={commonUtils.generateKey('collateral')}  title={collateral} classes={{ tooltip: classes.customTooltip }} enterTouchDelay={0} placement='top' followCursor>
                    <div className={classes.gotchiBadge}>
                        <img src={graphUtils.getCollateralImg(collateral)} width={25} alt={collateral} />
                    </div>
                </Tooltip>
            )
        },
        get level() {
            return (
                <GotchiLevel
                    key={commonUtils.generateKey('level')} 
                    level={gotchi.level}
                    toNextLevel={gotchi.toNextLevel}
                    experience={gotchi.experience}
                    size={25}
                />
            )
        },
        get mainTraits() {
            return (
                <div key={commonUtils.generateKey('mainTraits')}  className={classNames(classes.gotchiMainTraits, classes.gotchiTraits)}>
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
            return <GotchiTraitsHighlight key={commonUtils.generateKey('numericTraits')} traits={gotchi.numericTraits} currentTraits={gotchi.modifiedNumericTraits} />
        },
        get wearablesLine() {
            return (
                <div key={commonUtils.generateKey('wearablesLine')} className={classes.gotchiInnerSection}>
                    <GotchiWearablesLine wearables={gotchi.equippedWearables}/>
                </div>
            )
        },
        get name() {
            return (
                <Link
                    key={commonUtils.generateKey('name')}
                    className={classes.gotchiName}
                    href={`https://aavegotchi.com/gotchi/${gotchi.id}`}
                    target="_blank"
                    underline='none'
                >
                    <p>{gotchi.name ? gotchi.name : 'Unnamed'}</p>
                    <CallMade className={classes.callMadeIcon} />
                </Link>
            )
        },
        get svg() {
            return (
                <div key={commonUtils.generateKey('svg')} className={classes.gotchiSvg}>
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
            )
        },
        get revards() {
            return (
                gotchi.reward || gotchi.reward === 0 ? (
                    <div key={commonUtils.generateKey('revards')} className={classes.rankBox}>
                        {gotchi.reward > 0 ? (
                            <Tooltip
                                title={
                                    <Box>
                                        {gotchi.rewardStats.map((item, index) => {
                                            return item.reward !== 0 ? (
                                                <div key={index}>
                                                    <Typography variant='caption'>
                                                        {item.name}[{item.position}] - <Box className={classes.rankReward}>
                                                            {commonUtils.formatPrice(item.reward)} <img src={ghstIcon} width='14' alt='GHST Token Icon' />
                                                        </Box>
                                                    </Typography>
                                                </div>
                                            ) : (
                                                null
                                            )
                                        })}
                                    </Box>
                                }
                                classes={{ tooltip: classes.customTooltip }}
                                enterTouchDelay={0}
                                placement='top'
                                followCursor
                            >
                                <Box className={classes.rankRewardAmount}>
                                    <Typography className={classes.rankRewardAmountNumber}>{commonUtils.formatPrice(gotchi.reward)}</Typography>
                                    <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                                </Box>
                            </Tooltip>
                                
                        ) : (
                            <div key={commonUtils.generateKey('revards')} className={classes.rankStatus}>
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