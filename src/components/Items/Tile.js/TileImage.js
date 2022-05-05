import React from 'react';

import tilesUtils from 'utils/tilesUtils';

import styles from './styles';

export default function TileImage({ data }) {
    const classes = styles();
    const name = tilesUtils.getNameById(data.id);
    const src = tilesUtils.getImageById(data.id);

    return (
        <div className={classes.tileImageBox}>
            <img
                src={src}
                alt={name}
                className={classes.tileImage}
            />
        </div>
    );
}
