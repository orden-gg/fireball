import classNames from 'classnames';

import { ItemUtils } from 'utils';

import { imageStyles } from '../styles';

interface CardImageProps {
    id: number;
    className?: string;
}

export function CardImage({ id, className }: CardImageProps) {
    const classes = imageStyles();

    const name: string = ItemUtils.getItemNameById(id);
    const src: string = ItemUtils.getWearableImg(id);

    return (
        <div className={classNames(classes.imageWrapper, className)}>
            <img src={src} alt={name} className={classes.image} />
        </div>
    );
}
