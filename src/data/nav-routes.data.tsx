import { NavRoute } from 'shared/models';
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

export const navRoutes: NavRoute[] = [
    {
        name: 'client',
        description: 'explore and analyse on-chain data from aavegotchi protocol',
        icon: <ClientCardIcon />
    },
    {
        name: 'lendings',
        description: 'lend the character for pvp or farming',
        icon: <LendCardIcon />
    },
    {
        name: 'market',
        description: 'explore goods sold on the aavegotchi baazar',
        icon: <MarketCardIcon />
    },
    {
        name: 'guilds',
        description: 'associations of merchants, craftsmen and developers',
        icon: <GuildsCardIcon />
    },
    {
        name: 'raffles',
        description: 'lottery for wearables, land and portals',
        icon: <RafflesCardIcon />
    },
    {
        name: 'map',
        description: 'browse a citadel parcels',
        icon: <MapCardIcon />
    },
    {
        name: 'craft',
        description: 'create a game items using alchemica',
        icon: <CraftCardIcon />
    },
    {
        name: 'anvil',
        description: 'calculate the amount of resources needed for altars, harvesters and reservoirs updates',
        icon: <AnvilCardIcon />
    },
    {
        name: 'explorer',
        description: 'browse all the summoned aavegotchis',
        icon: <ExplorerCardIcon />
    },
    {
        name: 'glossary',
        description: 'list of all items with traits and pvp effects',
        icon: <GlossaryCardIcon />
    },
    {
        name: 'fake gallery',
        path: 'fake-gotchis-gallery',
        description: 'fake gotchis art gallery',
        icon: <FakeGalleryCardIcon />
    }
];
