import itemUtils from 'utils/itemUtils';

export function ConsumableImg({ consumable }: { consumable: any }) {
    return (
        <div>
            <img
                src={itemUtils.getWearableImg(consumable.id || consumable.erc1155TypeId)}
                alt='consumable'
            />
        </div>
    );
}
