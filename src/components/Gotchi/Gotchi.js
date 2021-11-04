import React from 'react';
import { Link, Tooltip, Typography } from '@mui/material';
import { alpha, Box } from '@mui/system';
import { useTheme } from '@emotion/react';
import classNames from 'classnames';
import useStyles from './styles';

import graphUtils from '../../utils/graphUtils';
import commonUtils from '../../utils/commonUtils';

import GotchiLevel from './GotchiLevel';
import GotchiTraitsHighlight from './GotchiTraitsHighlight';
import GotchiWearablesLine from './GotchiWearablesLine';
import HighlightNumber from '../HighlightNumber';
import GotchiSvg from './GotchiSvg';
import GotchiSvgByStats from './GotchiSvgByStats';

import CallMade from '@mui/icons-material/CallMade';

import ghstIcon from '../../assets/images/ghst-doubleside.gif';
import ShineLabel from '../Labels/ShineLabel';

export default function Gotchi({gotchi, title, narrowed, renderSvgByStats}) {
    const classes = useStyles();
    const theme = useTheme();

    const collateral = graphUtils.getCollateralName(gotchi.collateral);

    const calculateRarityType = (rarity) => {
        return rarity >= 700 ? 'godlike' : rarity >= 600 ? 'mythical' : rarity >= 500 ? 'rare' : '';
    };

    const calculateKinshipType = (kin) => {
        return kin >= 500 ? 'godlike' : kin >= 250 ? 'mythical' : kin >= 100 ? 'rare' : '';
    };

    const renderNarrowed = () => {
        if (!narrowed) {
            return (
                <>
                    <div className={classNames(classes.gotchiMainTraits, classes.gotchiTraits)}>
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

                    <GotchiTraitsHighlight traits={gotchi.numericTraits} currentTraits={gotchi.modifiedNumericTraits} />

                    <div className={classes.gotchiInnerSection}>
                        <GotchiWearablesLine wearables={gotchi.equippedWearables}/>
                    </div>
                </>
            )
        } else return null;
    };

    const getGotchiColor = (haunt) => {
        return theme.palette.haunts['h' + haunt];
    };
    
    return (
        <div
            className={classes.gotchi}
            style={{ backgroundColor: alpha(getGotchiColor(gotchi.hauntId), .2) }}
        >
            <div className={classes.gotchiBadges}>
                <Tooltip title={`Haunt ${gotchi.hauntId}`} classes={{ tooltip: classes.customTooltip }} enterTouchDelay={0} placement='top' followCursor>
                    <div className={classes.gotchiId}>
                        {title || gotchi.id}
                    </div>
                </Tooltip>

                <Tooltip title={collateral} classes={{ tooltip: classes.customTooltip }} enterTouchDelay={0} placement='top' followCursor>
                    <div className={classes.gotchiBadge}>
                        <img src={graphUtils.getCollateralImg(collateral)} width={25} alt={collateral} />
                    </div>
                </Tooltip>

                <div className={classes.gotchiBadge}>
                    <GotchiLevel
                        level={gotchi.level}
                        toNextLevel={gotchi.toNextLevel}
                        experience={gotchi.experience}
                        size={25}
                    />
                </div>
            </div>

            <div className={classes.gotchiSvg} style={{ backgroundColor: alpha(getGotchiColor(gotchi.hauntId), .15)}}>
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

            <Link
                className={classes.gotchiName}
                href={`https://aavegotchi.com/gotchi/${gotchi.id}`}
                target="_blank"
                underline='none'
            >
                <p>{gotchi.name ? gotchi.name : 'Unnamed'}</p>
                <CallMade className={classes.callMadeIcon} />
            </Link>

            {renderNarrowed()}

            {gotchi.reward || gotchi.reward === 0 ? (
                <Box display='flex' justifyContent='flex-end'>
                    {gotchi.reward > 0 ? (
                        <Tooltip
                            title={
                                <Box>
                                    {gotchi.rewardStats.map((item, index) => {
                                        return item.reward !== 0 ? (
                                            <div key={index}>
                                                <Typography variant='caption'>
                                                    {item.name}[{item.position}] - <Box display='inline-flex' alignItems='center' color='primary.main'>
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
                            <Box display='inline-flex' alignItems='center' justifyContent='center' padding='3px 2px 3px 8px' position='relative' bottom='-8px' right='-8px' bgcolor={alpha(theme.palette.secondary.dark, .5)}>
                                <Typography style={{ fontSize: 14, fontWeight: 600 }}>{commonUtils.formatPrice(gotchi.reward)}</Typography>
                                <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                            </Box>
                        </Tooltip>
                            
                    ) : (
                        <Box display='inline-flex' alignItems='center' justifyContent='center' padding='3px 8px' position='relative' bottom='-8px' right='-8px' bgcolor={alpha(theme.palette.secondary.dark, .5)}>
                            <Typography color='warning.main' style={{ fontSize: 14, fontWeight: 600 }}>Unkranked</Typography>
                        </Box>
                    )}
                </Box>
            ) : (
                null
            )}
        </div>
    );
}