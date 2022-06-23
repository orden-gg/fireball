import tilesUtils from 'utils/tilesUtils';

import styles from './styles';

export default function TileImage({ id }) {
    const classes = styles();
    const name = tilesUtils.getNameById(id);
    const src = tilesUtils.getImageById(id);

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
