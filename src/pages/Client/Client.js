import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

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
import ClientRoutes from './ClientRoutes';

export default function Client() {
    const classes = styles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const { account } = useParams();

    const isCoreRoute = location.pathname !== '/client' && location.pathname !== `/client/${account}`;
    // const qParams = qs.parse(location.search);

    const { activeAddress, setActiveAddress } = useContext(LoginContext);
    const { clientActive, setClientActive, getClientData, navData } = useContext(ClientContext);

    useEffect(() => {
        if (account) {
            if (ethersApi.isEthAddress(account)) {
                // console.log('account',account)
                getClientData(account);
            } else {
                history.push({ pathname: `/client/${account}` });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    // useEffect(() => {
    //     if (activeAddress) {
    //         setClientActive(activeAddress);
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [activeAddress]);

    // useEffect(() => {
    //     console.log(qParams)

    //     if (ethersApi.isEthAddress(qParams.address)) {
    //         setActiveAddress(qParams.address);
    //         // setClientActive(qParams.address);
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [qParams.address]);

    // useEffect(() => {
    //     console.log('account', account)
    //     if (!ethersApi.isEthAddress(account)) {
    //         console.log('yo')
    //         history.push({ path: location.pathname });
    //     }
    // }, [])

    // useEffect(() => {


    //     if (activeAddress) {
    //         getClientData();
    //         history.push({ path: location.pathname, search: `?address=${activeAddress}` });

    //     }

    //     console.log('active', activeAddress)
    //     // } else {
    //     //     history.push({ path: location.pathname });
    //     // }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [activeAddress]);

    const onAddressSubmit = (address) => {
        setActiveAddress(address)
        history.push({ pathname: `/client/${address}` });
    };

    return (
        <div className={classes.container}>
            {/* <Helmet>
                <title>
                    {activeAddress ?
                        `${commonUtils.cutAddress(activeAddress, '...')} || ${location.pathname.split('/')[2]}`
                        : 'Client'}
                </title>
            </Helmet> */}

            {/* { isCoreRoute ? (
                <div className={classes.head}>
                    <PageNav
                        links={navData}
                        query={`?address=${account}`}
                    >
                        <Button
                            href={`/shop?address=${account}`}
                            target='_blank'
                            className={classes.shopBtn}
                        >
                            <BaazarIcon width={24} height={24} />
                        </Button>
                    </PageNav>
                </div>
            ) : (
                <div className={classes.loginNav}>
                </div>
            )} */}

            {/* <div className={classes.loginNav}>
                <LoginNavigation address={account} onSubmit={onAddressSubmit} />
            </div> */}

            {/* { ethersApi.isEthAddress(account) && */}
            <Switch>
                <Route exact path={`${match.path}/`} component={ ClientAccount } />
                <Route path={`${match.path}/:account`} component={ ClientRoutes } />
                {/* <Route path={`${match.path}/gotchis`} component={ ClientGotchis } />
                <Route path={`${match.path}/lendings`} component={ ClientLendings } />
                <Route path={`${match.path}/warehouse`} component={ ClientWarehouse } />
                <Route path={`${match.path}/tickets`} component={ ClientTickets } />
                <Route path={`${match.path}/realm`} component={ ClientRealm } /> */}
                {/* <Redirect from={match.path} to={`${match.path}/gotchis`} /> */}
            </Switch>
            {/* } */}
        </div>
    );
}
