import { NavLink } from 'react-router-dom';

import { useAppSelector } from 'core/store/hooks';
import { getActiveAddress } from 'core/store/login';

import { routes } from 'data/routes.data';
import { Route } from 'shared/models';

import { styles } from './styles';

export function NavPanel() {
    const classes = styles();

    const activeAddress = useAppSelector(getActiveAddress);
    const clientLink = activeAddress ? `/client/${activeAddress}/gotchis` : 'client';

    return (
        <div className={classes.container}>
            <nav className={classes.navigation}>
                {routes.map((route: Route, index: number) => (
                    <div className={classes.navItem} key={index}>
                        <NavLink
                            className={classes.navLink}
                            to={route.name === 'client' ? clientLink : route.path ? route.path : route.name}
                        >
                            <div className={classes.iconBox}>{route.icon}</div>
                            <span className={classes.navItemName}>{route.name}</span>
                        </NavLink>
                    </div>
                ))}
            </nav>
        </div>
    );
}
