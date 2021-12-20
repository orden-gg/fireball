import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router';
import Guild from './routes/Guild';
import GuildsPreview from './routes/GuildsPreview';
import GuildsContextProvider from '../../contexts/GuildsContext';

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
                <Route exact path={`${match.path}/:name`}>
                    <Guild {...{backToGuilds}} />
                </Route>
                <Redirect from={match.path} to={match.path} />
            </Switch>
        </GuildsContextProvider>
    );
}
