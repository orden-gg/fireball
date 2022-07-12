import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { NavLink, Navigate, Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';

import Helmet from 'react-helmet';
import queryString from 'query-string';

import { DataReloadType } from 'shared/constants';
import { DataReloadContextState } from 'shared/models';
import { PageNav } from 'components/PageNav/PageNav';
import { RealmSwitchButton } from 'components/RealmSwitchButton/RealmSwitchButton';
import { BaazarIcon, GameControllerIcon } from 'components/Icons/Icons';
import { ClientContext } from 'contexts/ClientContext';
import { DataReloadContext } from 'contexts/DataReloadContext';
import { LoginContext } from 'contexts/LoginContext';
import { EthersApi } from 'api';
import { CommonUtils } from 'utils';

import { ClientAccount } from './routes/ClientAccount';
import { ClientGotchis } from './routes/ClientGotchis';
import { ClientInstallations } from './routes/ClientInstallations';
import { ClientRealm } from './routes/ClientRealm';
import { ClientTickets } from './routes/ClientTickets';
import { ClientWarehouse } from './routes/ClientWarehouse';

import { styles } from './styles';

const queryParamsOrder: string[] = ['haunt', 'collateral', 'search', 'sort', 'dir'];

export function ClientRoutes() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();

    const subroute = location.pathname.split('/')[3];

    const { account } = useParams<{ account: string }>();
    const queryParams = queryString.parse(location.search);

    const { activeAddress, setActiveAddress } = useContext<any>(LoginContext);
    const { getClientData, navData, realmView, canBeUpdated, setCanBeUpdated } = useContext<any>(ClientContext);
    const { lastManuallyUpdated, setActiveReloadType } = useContext<DataReloadContextState>(DataReloadContext);

    const [isActiveAddressSet, setIsActiveAddressSet] = useState<boolean>(false);

    useEffect(() => {
        if (EthersApi.isEthAddress(account)) {
            setActiveAddress(account);
        }

        setActiveReloadType(DataReloadType.Client);

        return () => {
            setActiveReloadType(null);
            setCanBeUpdated(false);
        };
    }, []);

    useEffect(() => {
        if (activeAddress) {
            if (activeAddress !== account && !isActiveAddressSet) {
                setActiveAddress(account);
            } else {
                navigate({
                    pathname: `/client/${activeAddress}${subroute ? `/${subroute}` : ''}`,
                    search: queryString.stringify(queryParams, {
                        sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                        arrayFormat: 'comma',
                        encode: false
                    })
                });

                getClientData(activeAddress, true);
            }

            setIsActiveAddressSet(true);
        }
    }, [activeAddress]);

    useEffect(() => {
        if (activeAddress && lastManuallyUpdated !== 0 && canBeUpdated) {
            getClientData(activeAddress);
        }
    }, [lastManuallyUpdated]);

    return (
        <div>
            <Helmet>
                <title>
                    { account ? (
                        `${CommonUtils.cutAddress(account, '..')} ${subroute ? subroute : 'client'}`
                    ) : (
                        'client'
                    )}
                </title>
            </Helmet>

            { EthersApi.isEthAddress(account) && (
                <div className={classes.routesNav}>
                    <PageNav
                        links={navData}
                        beforeContent={(
                            <Button
                                to={account as string}
                                className={classes.customBtn}
                                component={NavLink}
                            >
                                <GameControllerIcon width={24} height={24} />
                            </Button>
                        )}
                        afterContent={(
                            <React.Fragment>
                                <Button
                                    href={`/shop?address=${account}`}
                                    target='_blank'
                                    className={classes.customBtn}
                                >
                                    <BaazarIcon width={24} height={24} />
                                </Button>
                                <RealmSwitchButton view={realmView} />
                            </React.Fragment>
                        )}
                    ></PageNav>
                </div>
            )}

            <Routes>
                <Route path='' element={<ClientAccount />} />
                <Route path='gotchis/*' element={<ClientGotchis />} />
                <Route path='installations' element={<ClientInstallations />} />
                <Route path='warehouse' element={<ClientWarehouse />} />
                <Route path='tickets' element={<ClientTickets />} />
                <Route path='realm/*' element={<ClientRealm />} />
                <Route path='*' element={<Navigate to='' replace />} />
            </Routes>
        </div>
    );
}
