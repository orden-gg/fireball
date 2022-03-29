import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useRouteMatch } from 'react-router';

import { ClientContext } from 'contexts/ClientContext';

import ClientRealmMap from './ClientRealmMap';
import ClientRealmList from './ClientRealmList';
import ClientRealmParcel from './ClientRealmParcel';

export default function ClientRealm() {
    const match = useRouteMatch();
    const { realmView } = useContext(ClientContext);

    return (
        <>
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
                <Redirect from={match.path} to={`${match.path}/${realmView}`} />
            </Switch>
        </>
    );
}
