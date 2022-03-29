import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router';

import GuildsContextProvider from 'contexts/GuildsContext';

import Guild from './routes/Guild';
import GuildsPreview from './routes/GuildsPreview';

export default function Guilds() {
    const match = useRouteMatch();
    const history = useHistory();

    const backToGuilds = () => {
        history.push(match.path);
    }

    return (
        <GuildsContextProvider>
            <Switch>
                <Route exact path={`${match.path}/`} component={GuildsPreview} />
                <Route path={`${match.path}/:name`}>
                    <Guild {...{backToGuilds}} />
                </Route>
                <Redirect from={match.path} to={match.path} />
            </Switch>
        </GuildsContextProvider>
    );
}
