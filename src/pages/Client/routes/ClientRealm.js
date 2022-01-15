import React, { useContext } from 'react';

import { ClientContext } from '../../../contexts/ClientContext';

import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { useRouteMatch } from 'react-router';
import ClientRealmMap from './ClientRealmMap';
import ClientRealmList from './ClientRealmList';

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
                <Redirect from={match.path} to={`${match.path}/${realmView}`} />
            </Switch>
        </>
    );
}