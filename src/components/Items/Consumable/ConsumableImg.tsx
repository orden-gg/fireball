import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles } from '../styles';

export function ConsumableImg({ consumable }: { consumable: any }) {
    const classes = ERC1155InnerStyles();

    return (
        <div>
            <img
                src={itemUtils.getWearableImg(consumable.id || consumable.erc1155TypeId)}
                alt='consumable'
            />
        </div>
    );
}
