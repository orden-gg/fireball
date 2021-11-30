import React from 'react';
import commonUtils from '../../utils/commonUtils';
import { GotchiTraitsStyles } from "./styles";

import HighlightNumber from '../HighlightNumber';

export default function GotchiTraitsHighlight({traits, currentTraits}) {
    const classes = GotchiTraitsStyles();
    const defaultTraits = commonUtils.formatTraits(traits, true);
    const formattedTraits = commonUtils.formatTraits(currentTraits, true);

    const calculateTraitType = (trait) => {
        return trait >= 100 || trait <= -1 ? 'godlike' : trait >= 98 || trait <= 1 ? 'mythical' : trait >= 91 || trait <= 9 ? 'rare' : '';
    };

    return (
        <div className={classes.gotchiTraits}>
            {
                Object.entries(formattedTraits).map((trait, i) => {
                    let traitKey = trait[0];
                    let traitVal = trait[1];

                    return <div className={classes.gotchiTraitsInner} key={i}>
                        <HighlightNumber type={calculateTraitType(traitVal)}>
                            <p className={classes.mainVal}>
                                {traitKey}{traitVal}
        
                                <span className={classes.defaultVal}>
                                    ({defaultTraits[traitKey]})
                                </span>
                            </p>
                        </HighlightNumber>
                    </div>
                })
            }
        </div>
    );
}