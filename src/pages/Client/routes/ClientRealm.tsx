import { useContext } from 'react';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router';

import { RealmSwitchButton } from 'components/RealmSwitchButton/RealmSwitchButton';
import { ClientContext } from 'contexts/ClientContext';

import ClientRealmMap from './ClientRealmMap';
import ClientRealmList from './ClientRealmList';

export function ClientRealm() {
    const location = useLocation();
    const match = useRouteMatch();

    const { realmView } = useContext<any>(ClientContext);

    return (
        <>
            <RealmSwitchButton view={realmView} />

            <Switch>
                <Route path={`${match.path}/map`} component={ClientRealmMap} />
                <Route path={`${match.path}/list`} component={ClientRealmList} />
                <Redirect from={match.path} to={`${match.path}/${realmView}${location.search}`} />
            </Switch>
        </>
    );
}
