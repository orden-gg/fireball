import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useRouteMatch, useLocation } from 'react-router';

import RealmSwitchButton from 'components/RealmSwitchButton/RealmSwitchButton';
import { ClientContext } from 'contexts/ClientContext';

import ClientRealmMap from './ClientRealmMap';
import ClientRealmList from './ClientRealmList';

export default function ClientRealm() {
    const location = useLocation();
    const match = useRouteMatch();

    const { realmView } = useContext(ClientContext);

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
