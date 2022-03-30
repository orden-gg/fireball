import React from 'react';

import ShineLabel from 'components/Labels/ShineLabel';
import itemUtils from 'utils/itemUtils';

import GotchiSvgByStats from './GotchiSvgByStats';
import GotchiSvg from './GotchiSvg';
import styles from './styles';

export default function GotchiImage({ gotchi, renderSvgByStats, portal }) {
    const classes = styles();

    return (
        <div className={classes.gotchiSvg}>
            <span className={classes.gotchiHaunt}>h{gotchi.hauntId}</span>
            {portal ? (
                <img
                    className={classes.gotchiSvgPortal}
                    src={itemUtils.getPortalImg(gotchi.hauntId)}
                    alt={`haunt-${gotchi.hauntId}-portal`}
                    width={'100%'} />
            ) : (
                null
            )}
            {
                renderSvgByStats ? (
                    <GotchiSvgByStats gotchi={gotchi} size={'100%'} />
                ) : (
                    <GotchiSvg id={gotchi.id} size={'100%'} />
                )
            }
        </div>
    )
}
