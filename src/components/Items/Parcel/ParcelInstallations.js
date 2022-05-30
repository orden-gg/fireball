import React from 'react';
import BlockCountdown from 'components/Countdown/BlockCountdown';

import installationsUtils from 'utils/installationsUtils';

import { channelingStyles } from '../styles';

export default function ParcelInstallations({ parcel }) {
    const classes = channelingStyles();

    return (
        <div className={classes.test}>
            { parcel.installations.map((inst, index) => {
                const metadata = installationsUtils.getMetadataById(inst);


                return <div key={index}>
                    <div>level: <span style={{ color: 'yellow' }}>{metadata.level}</span></div>
                    <div>cooldown: {metadata.cooldown}h</div>
                    { parcel.upgrading && (

                        <div>
                            <div>claimed: {parcel.upgrading.claimed ? <span style={{ color: 'lime' }}>yes</span> : <span style={{ color: 'orange' }}>no</span>}</div>
                            <div>
                                upgrade:
                                <div>block: {parcel.upgrading.readyBlock}</div>
                                <div style={{ color: 'red' }}>
                                    <BlockCountdown block={parcel.upgrading.readyBlock}  />
                                </div>
                            </div>
                            <div>installation: {installationsUtils.getTypeById(parcel.upgrading.installationId)}</div>
                            <div>level: {installationsUtils.getLevelById(parcel.upgrading.installationId)}</div>
                        </div>
                    )}
                </div>
            })}
        </div>
    )
}
