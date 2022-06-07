import { Route, Switch, Redirect, useRouteMatch } from 'react-router';

import Helmet from 'react-helmet';

import ClientRoutes from './ClientRoutes';
import ClientNav from './components/ClientNav';
import styles from './styles';

export default function Client() {
    const classes = styles();
    const match = useRouteMatch();

    return (
        <div className={classes.container}>
            <Helmet>
                <title>client</title>
            </Helmet>

            <Switch>
                <Route exact path={`${match.path}/`} component={ ClientNav } />
                <Route path={`${match.path}/:account`} component={ ClientRoutes } />
                <Redirect from={match.path} to={match.path} />
            </Switch>
        </div>
    );
}
