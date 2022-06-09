
import { Erc1155Categories } from 'data/types';

import RaffleItemChance from 'pages/Raffle/components/RaffleItemChance';

import InstallationImage from './InstallationImage';
import CardName from '../common/CardName/CardName';
import ERC1155 from '../ERC1155/ERC1155';
import { installationStyles } from '../styles';

export default function Installation({ installation, raffleChances }) {
    const classes = installationStyles();

    return (
        <ERC1155
            className= 'installation'
            item={{
                id: installation.id,
                rarity: 'golden',
                category: Erc1155Categories.Realm,
                balance: installation.balance
            }}
        >
            {console.log('installation', installation)}
            <InstallationImage data={installation} />
            <CardName
                item={installation}
                itemName={installation.name}
                itemRarity='golden'
            />
            { installation.level > 1 && (
                <div className={classes.level}>
                    level {installation.level}
                </div>
            )}

            { raffleChances && (
                <RaffleItemChance stats={raffleChances} />
            )}
        </ERC1155>
    );
}
