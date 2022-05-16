import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useRouteMatch } from 'react-router';

import RealmSwitchButton from 'components/RealmSwitchButton/RealmSwitchButton';
import { ClientContext } from 'contexts/ClientContext';

import ClientRealmMap from './ClientRealmMap';
import ClientRealmList from './ClientRealmList';
import ClientRealmParcel from './ClientRealmParcel';

export default function ClientRealm() {
    const match = useRouteMatch();

    const { realmView } = useContext(ClientContext);

    return (
        <>
            <RealmSwitchButton view={realmView} />

            <Switch>
                <Route path={`${match.path}/map`} component={ClientRealmMap} />
                <Route path={`${match.path}/list`} component={ClientRealmList} />
                <Route path={`${match.path}/parcel/*`} component={ClientRealmParcel} />
                <Redirect from={match.path} to={`${match.path}/${realmView}`} />
            </Switch>
        </>
    );
}
