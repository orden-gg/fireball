import { NavLink } from 'react-router-dom';

import { useAppSelector } from 'core/store/hooks';
import { getActiveAddress } from 'core/store/login';

import { NavRoute } from 'shared/models';
import { navRoutes } from 'data/nav-routes.data';

import { styles } from './styles';

export function NavPanel() {
  const classes = styles();

  const activeAddress = useAppSelector(getActiveAddress);
  const clientLink = activeAddress ? `/client/${activeAddress}/gotchis` : 'client';

  return (
    <div className={classes.container}>
      <nav className={classes.navigation}>
        {navRoutes.map((route: NavRoute, index: number) => (
          <div className={classes.navItem} key={index}>
            <NavLink
              className={classes.navLink}
              to={route.name === 'client' ? clientLink : route.path ? route.path : route.name}
            >
              <div className={classes.iconBox}>{route.icon}</div>
              <div className={classes.navItemName}>
                <span>{route.name}</span>
              </div>
            </NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
}
