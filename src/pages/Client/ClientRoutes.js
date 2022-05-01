import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import CabinIcon from '@mui/icons-material/Cabin';

import { Helmet } from 'react-helmet';
import qs from 'query-string';

import LoginNavigation from 'components/Login/LoginNavigation';
import PageNav from 'components/PageNav/PageNav';
import { BaazarIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';
import { ClientContext } from 'contexts/ClientContext';
import commonUtils from 'utils/commonUtils';

import ClientGotchis from './routes/ClientGotchis';
import ClientLendings from './routes/ClientLendings';
import ClientWarehouse from './routes/ClientWarehouse';
import ClientTickets from './routes/ClientTickets';
import ClientRealm from './routes/ClientRealm';

import styles from './styles';
import EthAddress from 'components/EthAddress/EthAddress';
import ethersApi from 'api/ethers.api';
import ClientAccount from './routes/ClientAccount';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

export default function ClientRoutes() {
    const classes = styles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const { account } = useParams();
    const { navData } = useContext(ClientContext);

    console.log('account', account);

    return (
        <div className={classes.routes}>
            <div className={classes.routesNav}>
                <PageNav
                    links={navData}
                    // query={`?address=${account}`}
                    // counts={false}
                >
                    <Button
                        href={`/shop?address=${account}`}
                        target='_blank'
                        className={classes.customBtn}
                    >
                        <BaazarIcon width={24} height={24} />
                    </Button>
                    <Button
                        to={`/client/${account}/`}
                        className={classes.customBtn}
                        component={NavLink}
                        activeClassName='active'
                        end
                    >
                        <CabinIcon />
                    </Button>
                </PageNav>
            </div>

            <Switch>
                <Route exact path={`${match.path}/`} component={ ClientAccount } />
                <Route path={`${match.path}/gotchis`} component={ ClientGotchis } />
                <Route path={`${match.path}/lendings`} component={ ClientLendings } />
                <Route path={`${match.path}/warehouse`} component={ ClientWarehouse } />
                <Route path={`${match.path}/tickets`} component={ ClientTickets } />
                <Route path={`${match.path}/realm`} component={ ClientRealm } />
                <Redirect from='*' to={match.path} />
            </Switch>
        </div>
    );
}
