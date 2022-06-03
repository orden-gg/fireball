import React from 'react';
import { Skeleton } from '@mui/material';

import { DateTime } from 'luxon';

import Countdown from 'components/Countdown/Countdown';
import installationsUtils from 'utils/installationsUtils';

import styles from './styles';

const dataFormat = {
    days: { key: 'dd', value: 'd', showIfZero: false },
    hours: { key: 'hh', value: 'h', showIfZero: false },
    minutes: { key: 'mm', value: 'm', showIfZero: false },
};

export default function ParcelInstallations({ parcel }) {
    const classes = styles();

    if (parcel.installations.loading) {
        return <div className={classes.placeholder}>
            <Skeleton
                className={classes.placeholderInner}
                variant='rectangular'
                width='100%'
                height={30}
            />
        </div>
    }

    return (
        <div className={classes.container}>
            { parcel.installations.map((inst, index) => {
                const metadata = installationsUtils.getMetadataById(inst.id);

                return <div className={classes.installation} key={index}>
                    <div style={{ color: 'deeppink' }}>Altar!</div>
                    <div className={classes.row}>
                        <div>lvl:<span style={{ color: 'yellow' }}>{metadata.level}</span></div>
                        <div>cd:<span style={{ color: 'yellow' }}>{metadata.cooldown}h</span></div>
                        {/* <div>radius: <span style={{ color: 'yellow' }}>{metadata.spillRadius}</span></div> */}
                        <div>rate:<span style={{ color: 'yellow' }}>{100 - (metadata.spillRate / 100)}%</span></div>
                    </div>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', flexBasis: '100%' }}>
                        <div>
                            price:
                        </div>
                        <div style={{ color: 'yellow' }}>
                            {metadata.alchemicaCost.map((alch, i) => {
                                return <span key={i}>{alch} </span>
                            })}
                        </div>
                    </div> */}

                    { parcel.upgrading && (
                        <div className={classes.upgrade}>
                            upg:
                            <div style={{ color: 'orange' }}>
                                <Countdown
                                    targetDate={DateTime.fromSeconds(parcel.upgrading.timestamp).toMillis()}
                                    shortFormat={dataFormat}
                                    replacementComponent={<span style={{ color: 'lime' }}>Ready!</span>}
                                />
                                {/* <BlockCountdown
                                    block={parcel.upgrading.readyBlock}
                                    replacementComponent={<span style={{ color: 'lime' }}>Ready!</span>}
                                /> */}
                            </div>
                            {/* <div>installation: {installationsUtils.getTypeById(parcel.upgrading.installationId)}</div>
                            <div>level: {installationsUtils.getLevelById(parcel.upgrading.installationId)}</div> */}
                        </div>
                    )}
                </div>
            })}
        </div>
    )
}
