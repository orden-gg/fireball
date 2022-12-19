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
import { NavLink } from 'react-router-dom';
import { styles } from './styles';

interface Route {
    name: string;
    icon: JSX.Element;
    path?: string;
    description?: string;
}

const routes: Route[] = [
    {
        name: 'client',
        description: 'explore and analyse on-chain data from aavegotchi protocol',
        icon: <ClientCardIcon />
    },
    {
        name: 'lend',
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

export function NavigationCards() {
    const classes = styles();

    return (
        <div className={classes.navContainer}>
            <div className={classes.navInner}>
                {routes.map((route, i) => (
                    <NavLink to={route.name} className={classes.navCard} key={i}>
                        <div className={classes.navCardImage}>
                            {route.icon}
                            <div className={classes.navCardName}>{route.name}</div>
                        </div>
                        {route.description && <div className={classes.navCardDescr}>{route.description}</div>}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
