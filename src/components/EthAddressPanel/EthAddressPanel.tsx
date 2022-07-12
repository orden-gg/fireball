import { useContext, useEffect, useState } from 'react';
import { CircularProgress, Link } from '@mui/material';

import classNames from 'classnames';

import { DataReloadContextState } from 'shared/models';
import { GhstTokenIcon, GotchilandIcon } from 'components/Icons/Icons';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { ClientContext } from 'contexts/ClientContext';
import { DataReloadContext } from 'contexts/DataReloadContext';
import { AavegothilandApi } from 'api';
import { CommonUtils } from 'utils';

import { styles } from './styles';

export function EthAddressPanel({ address }: { address: string }) {
    const classes = styles();

    const [dataLoading, setDataLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<any>({});

    const { lastManuallyUpdated, setIsReloadDisabled } = useContext<DataReloadContextState>(DataReloadContext);
    const { setLoadedStates, canBeUpdated } = useContext<any>(ClientContext);

    useEffect(() => {
        let isMounted = true;

        onGetAddressInfo(address, isMounted, true);

        return () => { isMounted = false };
    }, [address]);

    useEffect(() => {
        let isMounted = true;

        if (lastManuallyUpdated !== 0 && canBeUpdated) {
            onGetAddressInfo(address, isMounted);
        }

        return () => { isMounted = false };
    }, [lastManuallyUpdated]);

    const onGetAddressInfo = (address: string, isMounted: boolean, shouldUpdateIsLoading: boolean = false): void => {
        setDataLoading(shouldUpdateIsLoading);
        setLoadedStates(statesCache => ({ ...statesCache, isAccountInfoLoaded: false }));

        AavegothilandApi.getAddressInfo(address).then((res: any) => {
            if (isMounted) {
                const data = res.data;
                const formatted = [
                    {
                        title: 'gotchis',
                        total: data.all_gotchies_estimated_price,
                        ghstToken: true,
                        inner: [
                            { name: 'undressed', value: data.all_gotchies_estimated_price - data.gotchi_items_estimated_price },
                            { name: 'gotchi wearables', value: data.gotchi_items_estimated_price }
                        ]
                    },
                    {
                        title: 'wearables',
                        total: data.all_items_estimated_price,
                        ghstToken: true,
                        inner: [
                            { name: 'inventory', value: data.inventory_items_estimated_price },
                            { name: 'equipped', value: data.gotchi_items_estimated_price }
                        ]
                    },
                    {
                        title: 'BRS',
                        total: data.gotchies_mbrs,
                        inner: [
                            { name: 'average', value: data.gotchies_medium_mbrs }
                        ]
                    },
                    {
                        title: 'kinship',
                        total: data.gotchies_kinship,
                        inner: [
                            { name: 'average', value: data.gotchies_medium_kinship }
                        ]
                    },
                    {
                        title: 'xp',
                        total: data.gotchies_xp,
                        inner: [
                            { name: 'average', value: data.gotchies_medium_xp }
                        ]
                    }
                ];

                setAccount(data.error ? data : formatted);
            }
        }).catch((error) => {
            console.log(error);

            if (isMounted) {
                setAccount({});
            }
        }).finally(() => {
            if (isMounted) {
                setDataLoading(false);
                setIsReloadDisabled(false);
                setLoadedStates(statesCache => ({ ...statesCache, isAccountInfoLoaded: true }));
            }
        });
    };

    const formatNumber = (number: number) => {
        return CommonUtils.convertFloatNumberToSuffixNumber(number);
    };

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <EthAddress
                    address={address}
                    isShwoIcon={true}
                    isCopyButton={true}
                    isPolygonButton={true}
                />
                <p>assets value and stats</p>
            </div>

            { dataLoading ? (
                <div className={classes.placeholder}>
                    <CircularProgress size={32} />
                </div>
            ) : (
                CommonUtils.isEmptyObject(account) || account.error ? (
                    <p className={classes.placeholder}>Data not arrived :(</p>
                ) : (
                    <div className={classes.panels}>
                        { !account.some(e => e.total > 0) && (
                            <p className={classes.noStats}>Stats not available for current address :(</p>
                        )}

                        { account.map((item: any, i: number) => {
                            if (item.total === 0) {
                                return null;
                            }

                            return <div className={classes.panel} key={i}>
                                <div className={classNames(classes.parcelRow, classes.panelTitle)}>
                                    {item.title} - <span>{formatNumber(item.total)}</span>
                                    { item.ghstToken && (
                                        <GhstTokenIcon height={16} width={16} />
                                    )}
                                </div>

                                { item.inner && (
                                    <div className={classes.panelInner}>
                                        { item.inner.map((innerItem, j) => (
                                            <p className={classes.parcelRow} key={j}>
                                                {innerItem.name} - <span>{formatNumber(innerItem.value)}</span>
                                                { item.ghstToken && (
                                                    <GhstTokenIcon height={16} width={16} />
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>;
                        })}
                    </div>
                )
            )}

            <div className={classes.poweredWrapper}>
                <Link
                    href='https://twitter.com/firstaavegotchi'
                    target='_blank'
                    className={classes.powered}
                >
                    powered by <span>The First Aavegotchi</span>
                    <GotchilandIcon width={20} height={24} />
                </Link>
            </div>
        </div>
    );
}
