import React, { useContext } from 'react';

import { routersStyles } from '../styles';

import { ClientContext } from '../../../contexts/ClientContext';

import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { useRouteMatch, useParams } from 'react-router';
import ClientRealmMap from './ClientRealmMap';
import ClientRealmList from './ClientRealmList';

export default function ClientRealm() {
    const classes = routersStyles();
    const match = useRouteMatch();
    const params = useParams()

    const { clientActive, realmView, set } = useContext(ClientContext);

    const changeView = (type) => {

    }
    
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