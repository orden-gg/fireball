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
    description: string;
    icon: JSX.Element;
}

const routes: Route[] = [
    {
        name: 'client',
        description: 'explore and analyse on-chain data from aavegotchi protocol',
        icon: <ClientCardIcon />
    },
    {
        name: 'lend',
        description: 'lend description',
        icon: <LendCardIcon />
    },
    {
        name: 'market',
        description: 'explore goods sold on the aavegotchi baazar',
        icon: <MarketCardIcon />
    },
    {
        name: 'guilds',
        description: 'guilds description',
        icon: <GuildsCardIcon />
    },
    {
        name: 'raffles',
        description: 'raffles description',
        icon: <RafflesCardIcon />
    },
    {
        name: 'map',
        description: 'map description',
        icon: <MapCardIcon />
    },
    {
        name: 'craft',
        description: 'craft description',
        icon: <CraftCardIcon />
    },
    {
        name: 'anvil',
        description: 'anvil description',
        icon: <AnvilCardIcon />
    },
    {
        name: 'explorer',
        description: 'explorer description',
        icon: <ExplorerCardIcon />
    },
    {
        name: 'glossary',
        description: 'glossary description',
        icon: <GlossaryCardIcon />
    },
    {
        name: 'fakegallery',
        description: 'fake gotchis art collection browser',
        icon: <FakeGalleryCardIcon />
    }
];

export function NavigationCards() {
    const classes = styles();

    return (
        <div className={classes.navContainer}>
            {routes.map((route, i) => (
                <NavLink to={route.name} className={classes.navCard} key={i}>
                    <div className={classes.navCardImage}>
                        {route.icon}
                        <div className={classes.navCardName}>{route.name}</div>
                    </div>
                    <div className={classes.navCardDescr}>{route.description}</div>
                </NavLink>
            ))}
        </div>
    );
}
