import classNames from 'classnames';

import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles } from '../styles';

export default function ConsumableImg({ consumable, additionalClass }) {
    const classes = ERC1155InnerStyles();

    return (
        <div className={classNames(classes.iconWrapper, additionalClass)}>
            <img
                src={itemUtils.getWearableImg(consumable.id || consumable.erc1155TypeId)}
                className={classes.icon}
                alt='consumable'
            />
        </div>
    );
}
