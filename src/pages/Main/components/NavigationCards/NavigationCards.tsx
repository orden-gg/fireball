import { NavLink } from 'react-router-dom';

import { useAppSelector } from 'core/store/hooks';
import { getActiveAddress } from 'core/store/login';

import { NavRoute } from 'shared/models';
import { navRoutes } from 'data/nav-routes.data';

import { styles } from './styles';

export function NavigationCards() {
    const classes = styles();

    const activeAddress = useAppSelector(getActiveAddress);
    const clientLink = activeAddress ? `/client/${activeAddress}/gotchis` : 'client';

    return (
        <div className={classes.navContainer}>
            <div className={classes.navInner}>
                {navRoutes.map((route: NavRoute, index: number) => (
                    <NavLink
                        to={route.name === 'client' ? clientLink : route.path ? route.path : route.name}
                        className={classes.navCard}
                        key={index}
                    >
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
