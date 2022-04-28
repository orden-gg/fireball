import React from 'react';

import installationUtils from 'utils/installationUtils';
import tileUtils from 'utils/tileUtils';

import styles from './styles';

export default function InstallationImage({ data }) {
    const classes = styles();
    const utils = data.type === 'tile' ? tileUtils : installationUtils;
    const name = utils.getNameById(data.id);
    const src = utils.getImageById(data.id);

    return (
        <div className={classes.installationImageBox}>
            <img
                src={src}
                alt={name}
                className={classes.installationImage}
            />
        </div>
    );
}
