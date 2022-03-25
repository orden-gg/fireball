import React from 'react';
import classNames from 'classnames';

import HighlightNumber from 'components/HighlightNumber';

import { GotchiTraitsStyles } from '../styles';

export default function GotchiMainTraits({ gotchi }) {
    const classes = GotchiTraitsStyles();

    const calculateRarityType = (rarity) => {
        return rarity >= 700 ? 'godlike' : rarity >= 600 ? 'mythical' : rarity >= 500 ? 'rare' : '';
    };

    const calculateKinshipType = (kin) => {
        return kin >= 500 ? 'godlike' : kin >= 250 ? 'mythical' : kin >= 100 ? 'rare' : '';
    };

    return (
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
    );
}
