import React, { useContext } from 'react';

import { GuildsContext } from '../../../contexts/GuildsContext';

import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { useRouteMatch } from 'react-router';
import GuildsRealmMap from '../routes/GuildsRealmMap';
import GuildsRealmList from '../routes/GuildsRealmList';

export default function ClientRealm() {
    const match = useRouteMatch();
    const { realmView } = useContext(GuildsContext);
    
    return (
        <Switch>
            <Route path={`${match.path}/list`} >
                <GuildsRealmList name='list' />
            </Route>
            <Route path={`${match.path}/map`}>
                <GuildsRealmMap name='map' />
            </Route>
            <Redirect from={match.path} to={`${match.path}/${realmView}`} />
        </Switch>
    );
}