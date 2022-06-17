import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Route, Switch, useRouteMatch, useHistory, useParams, useLocation } from 'react-router';
import { Redirect, NavLink } from 'react-router-dom';

import Helmet from 'react-helmet';
import queryString from 'query-string';

import { PageNav } from 'components/PageNav/PageNav';
import { BaazarIcon, GameControllerIcon } from 'components/Icons/Icons';
import { ClientContext } from 'contexts/ClientContext';
import { LoginContext } from 'contexts/LoginContext';
import ethersApi from 'api/ethers.api';
import commonUtils from 'utils/commonUtils';

import { ClientAccount } from './routes/ClientAccount';
import { ClientGotchis } from './routes/ClientGotchis';
import { ClientInstallations } from './routes/ClientInstallations';
import { ClientLendings } from './routes/ClientLendings';
import ClientWarehouse from './routes/ClientWarehouse';
import ClientTickets from './routes/ClientTickets';
import { ClientRealm } from './routes/ClientRealm';

import styles from './styles';

const queryParamsOrder = ['haunt', 'collateral', 'search', 'sort', 'dir'];

export default function ClientRoutes() {
    const classes = styles();
    const match = useRouteMatch();
    const history = useHistory();
    const location = useLocation();

    const subroute = location.pathname.split('/')[3];

    const { account } = useParams();
    const queryParams = queryString.parse(location.search);

    const { activeAddress, setActiveAddress } = useContext(LoginContext);
    const { getClientData, navData } = useContext(ClientContext);

    const [isActiveAddressSet, setIsActiveAddressSet] = useState(false);

    useEffect(() => {
        if (ethersApi.isEthAddress(account)) {
            setActiveAddress(account);
        }
    }, []);

    useEffect(() => {
        if (activeAddress) {
            if (activeAddress !== account && !isActiveAddressSet) {
                setActiveAddress(account);
            } else {
                history.push({
                    pathname: `/client/${activeAddress}${subroute ? `/${subroute}` : ''}`,
                    search: queryString.stringify(queryParams, {
                        sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                        arrayFormat: 'comma',
                        encode: false
                    })
                });
                getClientData(activeAddress);
            }

            setIsActiveAddressSet(true);
        }
    }, [activeAddress]);

    return (
        <div className={classes.routes}>
            <Helmet>
                <title>
                    { account ? (
                        `${commonUtils.cutAddress(account, '..')} ${subroute ? subroute : 'client'}`
                    ) : (
                        'client'
                    )}
                </title>
            </Helmet>

            { ethersApi.isEthAddress(account) && (
                <div className={classes.routesNav}>
                    <PageNav
                        links={navData}
                        beforeContent={(
                            <Button
                                to={`/client/${account}`}
                                className={classes.customBtn}
                                component={NavLink}
                                activeClassName='active'
                                exact
                            >
                                <GameControllerIcon width={24} height={24} />
                            </Button>
                        )}
                        afterContent={(
                            <Button
                                href={`/shop?address=${account}`}
                                target='_blank'
                                className={classes.customBtn}
                            >
                                <BaazarIcon width={24} height={24} />
                            </Button>
                        )}
                    ></PageNav>
                </div>
            )}

            <Switch>
                <Route exact path={`${match.path}/`} component={ ClientAccount } />
                <Route path={`${match.path}/gotchis`} component={ ClientGotchis } />
                <Route path={`${match.path}/lendings`} component={ ClientLendings } />
                <Route path={`${match.path}/installations`} component={ ClientInstallations } />
                <Route path={`${match.path}/warehouse`} component={ ClientWarehouse } />
                <Route path={`${match.path}/tickets`} component={ ClientTickets } />
                <Route path={`${match.path}/realm`} component={ ClientRealm } />
                <Redirect from='*' to={`/client/${account}`} />
            </Switch>
        </div>
    );
}
