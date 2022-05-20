import React from 'react';

import installationsUtils from 'utils/installationsUtils';
import installationGif from 'assets/images/installations/1.gif';

import styles from './styles';

export default function InstallationImage({ data }) {
    const classes = styles();
    const name = installationsUtils.getNameById(data.id);
    // TODO retrieve image by id

    return (
        <div className={classes.installationImageBox}>
            <img
                src={installationGif}
                alt={name}
                className={classes.installationImage}
            />
        </div>
    );
}
