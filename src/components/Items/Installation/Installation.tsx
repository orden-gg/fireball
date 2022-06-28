import { Erc1155Categories } from 'shared/constants';
import { RaffleItemChance } from 'pages/Raffle/components/RaffleItemChance';

import { InstallationImage } from './InstallationImage';
import { CardName } from '../common/CardName/CardName';
import { ERC1155 } from '../ERC1155/ERC1155';
import { installationStyles } from '../styles';

interface InstallationProps {
    installation: any;
    raffleChances?: any;
}

export function Installation({ installation, raffleChances }: InstallationProps) {
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
            <InstallationImage id={installation.id} />
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
