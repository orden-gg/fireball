import React, { useEffect, useState } from 'react';
import { CircularProgress, Link } from '@mui/material';

import classNames from 'classnames';

import { GhstTokenIcon, GotchilandIcon } from 'components/Icons/Icons.js';
import EthAddress from 'components/EthAddress/EthAddress.js';
import aavegotchilandApi from 'api/aavegotchiland.api.js';
import commonUtils from 'utils/commonUtils.js';

import styles from './styles.js'

export default function EthAddressPanel({ address }) {
    const classes = styles();
    const [dataLoading, setDataLoading] = useState(true);
    const [account, setAccount] = useState({});

    useEffect(() => {
        let mounted = true;

        setDataLoading(true);

        aavegotchilandApi.getAddressInfo(address).then((res) => {
            if (mounted) {
                const data = res.data;
                const formatted = [
                    {
                        title: 'gotchis',
                        total: data.all_gotchies_estimated_price,
                        inner: [
                            { name: 'undressed', value: data.all_gotchies_estimated_price - data.gotchi_items_estimated_price },
                            { name: 'gotchi wearables', value: data.gotchi_items_estimated_price }
                        ]
                    },
                    {
                        title: 'wearables',
                        total: data.all_items_estimated_price,
                        inner: [
                            { name: 'inventory', value: data.inventory_items_estimated_price },
                            { name: 'equipped', value: data.gotchi_items_estimated_price },
                        ]
                    },
                    {
                        title: 'BRS',
                        total: data.gotchies_mbrs,
                        inner: [
                            { name: 'average', value: data.gotchies_medium_mbrs },
                        ]
                    },
                    {
                        title: 'kinship',
                        total: data.gotchies_kinship,
                        inner: [
                            { name: 'average', value: data.gotchies_medium_kinship },
                        ]
                    },
                    {
                        title: 'xp',
                        total: data.gotchies_xp,
                        inner: [
                            { name: 'average', value: data.gotchies_medium_xp },
                        ]
                    }
                ];

                setAccount(data.error ? data : formatted);
            }
        }).catch((error) => {
            console.log(error);

            if (mounted) {
                setAccount({});
            }
        }).finally(() => {
            if (mounted) {
                setDataLoading(false);
            }
        });

        return () => mounted = false;
    }, [address]);

    const formatNumber = (number) => {
        return commonUtils.convertFloatNumberToSuffixNumber(number);
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <EthAddress
                    address={address}
                    icon={true}
                    copyButton={true}
                    polygonButton={true}
                />
                <p>assets value and stats</p>
            </div>

            { dataLoading ? (
                <div className={classes.placeholder}>
                    <CircularProgress size={32} />
                </div>
            ) : (
                commonUtils.isEmptyObject(account) || account.error ? (
                    <p className={classes.placeholder}>Data not arrived :(</p>
                ) : (
                    <div className={classes.panels}>
                        { !account.some(e => e.total > 0) && (
                            <p className={classes.noStats}>Stats not available for current address :(</p>
                        )}

                        { account.map((item, i) => {
                            if (item.total === 0) {
                                return null;
                            }

                            return <div className={classes.panel} key={i}>
                                <div className={classNames(classes.parcelRow, classes.panelTitle)}>
                                    {item.title} - <span>{formatNumber(item.total)}</span>
                                    <GhstTokenIcon height={16} width={16} />
                                </div>

                                { item.inner && (
                                    <div className={classes.panelInner}>
                                        { item.inner.map((innerItem, j) => (
                                            <p className={classes.parcelRow} key={j}>
                                                {innerItem.name} - <span>{formatNumber(innerItem.value)}</span>
                                                <GhstTokenIcon height={16} width={16} />
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
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
