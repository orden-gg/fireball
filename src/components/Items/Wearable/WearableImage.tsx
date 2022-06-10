import classNames from 'classnames';

import itemUtils from 'utils/itemUtils';

import styles from './styles';

interface WearableImageProps {
    wearable: any;
    className?: string;
}

export function WearableImage({ wearable, className }: WearableImageProps) {
    const classes = styles();
    const name = itemUtils.getItemNameById(wearable.id || wearable.erc1155TypeId);

    return (
        <div className={classNames(classes.iconWrapper, className || null)}>
            <img
                src={itemUtils.getWearableImg(wearable.id || wearable.erc1155TypeId)}
                alt={name}
                className={classes.icon}
            />
        </div>
    );
}
