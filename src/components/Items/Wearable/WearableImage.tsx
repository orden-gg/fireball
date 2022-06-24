import classNames from 'classnames';

import { ItemUtils } from 'utils';

import { styles } from './styles';

interface WearableImageProps {
    wearable: any;
    className?: string;
}

export function WearableImage({ wearable, className }: WearableImageProps) {
    const classes = styles();

    const name: string = ItemUtils.getItemNameById(wearable.id || wearable.erc1155TypeId);

    return (
        <div className={classNames(classes.iconWrapper, className || null)}>
            <img
                src={ItemUtils.getWearableImg(wearable.id || wearable.erc1155TypeId)}
                alt={name}
                className={classes.icon}
            />
        </div>
    );
}
