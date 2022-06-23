import { ItemUtils } from 'utils';

export function ConsumableImg({ consumable }: { consumable: any }) {
    return (
        <div>
            <img
                src={ItemUtils.getWearableImg(consumable.id || consumable.erc1155TypeId)}
                alt='consumable'
            />
        </div>
    );
}
