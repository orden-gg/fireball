import React from 'react';

import installationsUtils from 'utils/installationsUtils';

import styles from './styles';

export default function InstallationImage({ data }) {
    const classes = styles();
    const name = installationsUtils.getInstallationNameById(data.id);

    return (
        <div className={classes.installationImageBox}>
            <img
                src={installationsUtils.getInstallationImage(data.id)}
                alt={name}
                className={classes.installationImage}
            />
        </div>
    );
}
