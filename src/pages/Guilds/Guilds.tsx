import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { GuildsContextProvider } from './GuildsContext';

import { Guild } from './routes/Guild';
import { GuildsPreview } from './routes/GuildsPreview';

export function Guilds() {
    const match = useRouteMatch();

    return (
        <GuildsContextProvider>
            <Switch>
                <Route exact path={`${match.path}/`} component={GuildsPreview} />
                <Route path={`${match.path}/:name`} component={Guild} />
                <Redirect from={match.path} to={match.path} />
            </Switch>
        </GuildsContextProvider>
    );
}
