import CardName from '../common/CardName/CardName';
import InstallationImage from './InstallationImage';
import ERC1155 from '../ERC1155/ERC1155';
import { Erc1155Categories } from 'data/types';

import styles from './styles';

export default function Installation({ data }) {
    const classes = styles();

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
