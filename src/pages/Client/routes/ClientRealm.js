import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useRouteMatch, useLocation } from 'react-router';

import qs from 'query-string';

import RealmSwitchButton from 'components/RealmSwitchButton/RealmSwitchButton';
import { ClientContext } from 'contexts/ClientContext';

import ClientRealmMap from './ClientRealmMap';
import ClientRealmList from './ClientRealmList';
import ClientRealmParcel from './ClientRealmParcel';

export default function ClientRealm() {
    const match = useRouteMatch();
    const { realmView } = useContext(ClientContext);

    const location = useLocation();
    const params = qs.parse(location.search);
    const redirect = `${match.path}/${realmView}${params ? `?${qs.stringify(params)}` : ''}`;

    return (
        <>
            <RealmSwitchButton view={realmView} />

            <Switch>
                <Route path={`${match.path}/list`} >
                    <ClientRealmList name='list' />
                </Route>
                <Route path={`${match.path}/map`}>
                    <ClientRealmMap name='map' />
                </Route>
                <Route path={`${match.path}/parcel/*`}>
                    <ClientRealmParcel name='parcel' />
                </Route>
                <Redirect from={`${match.path}/parcel`} to={`${match.path}/${realmView}`} />
                <Redirect from={match.path} to={redirect} />
            </Switch>
        </>
    );
}
