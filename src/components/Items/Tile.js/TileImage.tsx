import { TilesUtils } from 'utils';

import { styles } from './styles';

export function TileImage({ id }: { id: string }) {
    const classes = styles();

    const name: string = TilesUtils.getNameById(id);
    const src: any = TilesUtils.getImageById(id);

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
