import CardName from '../common/CardName/CardName';
import InstallationImage from './InstallationImage';
import ERC1155 from '../ERC1155/ERC1155';
import { Erc1155Categories } from 'data/types';

export default function Installation({ data }) {

    return (
        <ERC1155 item={{
            id: data.id,
            rarity: 'legendary',
            category: Erc1155Categories.Realm,
            balance: data.balance
        }}>
            <InstallationImage data={data} />
            <CardName
                item={data}
                itemName={data.name}
                itemRarity='legendary'
            />
        </ERC1155>
    )
}
