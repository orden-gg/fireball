import React from 'react';

import ShineLabel from 'components/Labels/ShineLabel';
import itemUtils from 'utils/itemUtils';

import GotchiSvgByStats from '../GotchiSvgByStats';
import GotchiSvg from '../GotchiSvg';
import styles from '../styles';

export default function GotchiSVG({ gotchi, renderSvgByStats, inPortal }) {
    const classes = styles();

    return (
        <div className={classes.gotchiSvg}>
            {inPortal ? (
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
}
