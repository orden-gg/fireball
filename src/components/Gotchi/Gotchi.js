import React from 'react';
import { Link, Tooltip } from '@mui/material';
import { alpha } from '@mui/system';
import { useTheme } from '@emotion/react';
import classNames from 'classnames';
import commonUtils from '../../utils/commonUtils';
import useStyles from './styles';

import GotchiLevel from './GotchiLevel';
import GotchiTraitsHighlight from './GotchiTraitsHighlight';
import GotchiWearablesLine from './GotchiWearablesLine';
import HighlightNumber from '../HighlightNumber';

import CallMade from '@mui/icons-material/CallMade';
import GotchiSvg from './GotchiSvg';
import GotchiSvgByStats from './GotchiSvgByStats';
import graphUtils from '../../utils/graphUtils';

export default function Gotchi({gotchi, title, narrowed, renderSvgByStats}) {
    const classes = useStyles();
    const theme = useTheme();

    const collateral = graphUtils.getCollateralName(gotchi.collateral);

    const calculateRarityType = (rarity) => {
        return rarity >= 700 ? 'godlike' : rarity >= 600 ? 'mythical' : rarity >= 500 ? 'rare' : '';
    }

    const calculateKinshipType = (kin) => {
        return kin >= 500 ? 'godlike' : kin >= 250 ? 'mythical' : kin >= 100 ? 'rare' : '';
    }

    const renderNarrowed = () => {
        if(!narrowed) {
            return (
                <>
                    <div className={classNames(classes.gotchiInnerSection, classes.gotchiTraits)}>
                        <div className={classes.gotchiTraitsInner}>
                            <HighlightNumber type={calculateRarityType(gotchi.withSetsRarityScore)}>
                                <p className={classes.mainVal}>
                                    🏆{gotchi.withSetsRarityScore}

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

                    <div className={classes.gotchiInnerSection}>
                        <GotchiTraitsHighlight traits={gotchi.numericTraits} currentTraits={gotchi.withSetsNumericTraits} />
                    </div>

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
            <p className={classes.gotchiCaption} style={{ backgroundColor: getGotchiColor(gotchi.hauntId) }}>
                {title || gotchi.id}
            </p>


            <div className={classes.badges}>
                <Tooltip title={collateral} placement='top' followCursor>
                    <div className={classes.badge}>
                        <img src={graphUtils.getCollateralImg(collateral)} width={28} />
                    </div>
                </Tooltip>

                <GotchiLevel
                    level={gotchi.level}
                    toNextLevel={gotchi.toNextLevel}
                    experience={gotchi.experience}
                    size={28}
                />
            </div>

            <div className={classes.gotchiSvg}>
                {
                    renderSvgByStats ? (
                        <GotchiSvgByStats gotchi={gotchi} size={'100%'} />
                    ) : (
                        <GotchiSvg id={gotchi.id} size={'100%'} />
                    )
                }
            </div>

            <Link
                className={classes.gotchiName}
                style={{ backgroundColor: alpha(getGotchiColor(gotchi.hauntId), .5)}}
                href={`https://aavegotchi.com/gotchi/${gotchi.id}`}
                target="_blank"
                underline='none'
            >
                <p color='secondary'>
                    {gotchi.name ? (
                        gotchi.name
                    ) : (
                        'Unnamed'
                    )}
                </p>
                <CallMade className={classes.callMadeIcon} />
            </Link>

            {renderNarrowed()}
        </div>
    );
}