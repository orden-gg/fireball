import { useContext } from 'react';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router';

import { ClientContext } from 'contexts/ClientContext';

import { ClientRealmList } from './ClientRealmList';
import { ClientRealmMap } from './ClientRealmMap';

export function ClientRealm() {
    const location = useLocation();
    const match = useRouteMatch();

    const { realmView } = useContext<any>(ClientContext);

    return (
        <>
            <Switch>
                <Route path={`${match.path}/map`} component={ClientRealmMap} />
                <Route path={`${match.path}/list`} component={ClientRealmList} />
                <Redirect from={match.path} to={`${match.path}/${realmView}${location.search}`} />
            </Switch>
        </>
    );
}
