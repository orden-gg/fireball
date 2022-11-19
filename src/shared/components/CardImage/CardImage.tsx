import classNames from 'classnames';

import { styles } from './styles';

interface CardImageProps {
    src: string;
    alt: string;
    className?: string;
}

// TODO this component is currently used for Baazaar Card components and should be replacement
// TODO for CardImage component in ItemCard submodule. Possibly should be moved to
// TODO ItemCard directory
export function CardImage({ src, alt, className }: CardImageProps) {
    const classes = styles();

    return (
        <div className={classNames(classes.imageWrapper, className)}>
            <img src={src} alt={alt} className={classes.image} />
        </div>
    );
}
