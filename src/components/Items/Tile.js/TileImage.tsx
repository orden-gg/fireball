import tilesUtils from 'utils/tilesUtils';

import { styles } from './styles';

export function TileImage({ id }: { id: string }) {
    const classes = styles();

    const name: string = tilesUtils.getNameById(id);
    const src: any = tilesUtils.getImageById(id);

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
