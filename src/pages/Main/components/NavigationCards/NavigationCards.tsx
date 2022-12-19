import { NavLink } from 'react-router-dom';

import { routes } from 'data/routes.data';
import { styles } from './styles';
import { useAppSelector } from 'core/store/hooks';
import { getActiveAddress } from 'core/store/login';
import { Route } from 'shared/models';

export function NavigationCards() {
    const classes = styles();

    const activeAddress = useAppSelector(getActiveAddress);
    const clientLink = activeAddress ? `/client/${activeAddress}/gotchis` : 'client';

    return (
        <div className={classes.navContainer}>
            <div className={classes.navInner}>
                {routes.map((route: Route, index: number) => (
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
