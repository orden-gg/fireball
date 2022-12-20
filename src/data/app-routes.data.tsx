import { AppRoute } from 'shared/models';
import {
    AnvilCardIcon,
    ClientCardIcon,
    CraftCardIcon,
    ExplorerCardIcon,
    FakeGalleryCardIcon,
    GlossaryCardIcon,
    GuildsCardIcon,
    LendCardIcon,
    MapCardIcon,
    MarketCardIcon,
    RafflesCardIcon
} from 'components/Icons/Icons';

export const appRoutes: AppRoute[] = [
    {
        name: 'client',
        description: 'explore and analyse on-chain data from aavegotchi protocol',
        icon: <ClientCardIcon />
    },
    {
        name: 'lendings',
        icon: <LendCardIcon />
    },
    {
        name: 'market',
        description: 'explore goods sold on the aavegotchi baazar',
        icon: <MarketCardIcon />
    },
    {
        name: 'guilds',
        icon: <GuildsCardIcon />
    },
    {
        name: 'raffles',
        icon: <RafflesCardIcon />
    },
    {
        name: 'map',
        icon: <MapCardIcon />
    },
    {
        name: 'craft',
        icon: <CraftCardIcon />
    },
    {
        name: 'anvil',
        icon: <AnvilCardIcon />
    },
    {
        name: 'explorer',
        icon: <ExplorerCardIcon />
    },
    {
        name: 'glossary',
        icon: <GlossaryCardIcon />
    },
    {
        name: 'fake gallery',
        path: 'fake-gotchis-gallery',
        description: 'fake gotchis art collection browser',
        icon: <FakeGalleryCardIcon />
    }
];
