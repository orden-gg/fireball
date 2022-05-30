import React from 'react';
import BlockCountdown from 'components/Countdown/BlockCountdown';

import installationsUtils from 'utils/installationsUtils';

import styles from './styles';

export default function ParcelInstallations({ parcel }) {
    const classes = styles();

    return (
        <div className={classes.container}>
            { parcel.installations.map((inst, index) => {
                const metadata = installationsUtils.getMetadataById(inst);

                return <div className={classes.installation} key={index}>
                    <div>lvl: <span style={{ color: 'yellow' }}>{metadata.level}</span></div>
                    <div>cd: {metadata.cooldown}h</div>

                    { parcel.upgrading && (
                        !parcel.upgrading.claimed && (
                            <div className={classes.upgrade}>
                                upgrade:
                                <div style={{ color: 'orange' }}>
                                    <BlockCountdown
                                        block={parcel.upgrading.readyBlock}
                                        replacementComponent={<span style={{ color: 'lime' }}>Ready!</span>}
                                    />
                                </div>
                                {/* <div>installation: {installationsUtils.getTypeById(parcel.upgrading.installationId)}</div>
                                <div>level: {installationsUtils.getLevelById(parcel.upgrading.installationId)}</div> */}
                            </div>
                        )
                    )}
                </div>
            })}
        </div>
    )
}
