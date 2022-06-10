import RaffleItemChance from 'pages/Raffle/components/RaffleItemChance';
import { ERC1155 } from 'components/Items/ERC1155/ERC1155';
import itemUtils from 'utils/itemUtils';

import { CardName } from '../common/CardName/CardName';
import { CardStats } from '../common/CardStats/CardStats';
import { WearableImage } from './WearableImage';

interface WearableProps {
    wearable: any;
    raffleChances?: any;
    tooltip?: any;
    isShopItem?: boolean;
}

export function Wearable({ wearable, raffleChances, tooltip, isShopItem }: WearableProps) {
    const rarity = itemUtils.getItemRarityById(wearable.id || wearable.erc1155TypeId);
    const slot = itemUtils.getItemSlotById(wearable.id || wearable.erc1155TypeId);

    return (
        <ERC1155 item={{
            id: wearable.id || parseInt(wearable.erc1155TypeId),
            rarity: rarity,
            category: wearable.category,
            balance: wearable.balance,
            holders: wearable.holders,
            slot: slot,
            tooltip: tooltip,
            priceInWei: wearable.priceInWei,
            quantity: wearable.quantity,
            listing: {
                listing: wearable.listing,
                price: wearable.price
            },
            isShopItem
        }}>
            <WearableImage wearable={wearable} />
            <CardName item={wearable} />
            <CardStats item={wearable} />

            {raffleChances && <RaffleItemChance stats={raffleChances} />}
        </ERC1155>
    );
}
