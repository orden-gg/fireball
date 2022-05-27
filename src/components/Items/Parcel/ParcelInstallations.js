import React from 'react';

import installationsUtils from 'utils/installationsUtils';

import { channelingStyles } from '../styles';

export default function ParcelInstallations({ installations, upgrading }) {
    const classes = channelingStyles();

    return (
        <div className={classes.test}>
            { installations.map((inst, index) => {
                const metadata = installationsUtils.getMetadataById(inst);

                // console.log(inst, metadata)

                return <div key={index}>
                    {/* installation: {inst} */}
                    {/* <div>name: {metadata.name}</div> */}
                    {/* <div>type: {metadata.type}</div> */}
                    <div>level: <span style={{ color: 'yellow' }}>{metadata.level}</span></div>
                    <div>cooldown: {metadata.cooldown}h</div>
                    <div>upgading: {upgrading ? <span style={{ color: 'lime' }}>yes</span> : <span style={{ color: 'orange' }}>no</span>}</div>
                </div>
            })}
        </div>
    )
}
