import React, { useEffect, useState } from 'react';
import { CircularProgress, Link } from '@mui/material';

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
                // const formatted = {
                //     gotchi: formatNumber(data.all_gotchies_estimated_price),
                //     gotchi_count: formatNumber(data.gotchies_nr),
                //     gotchi_undressed: formatNumber(data.all_gotchies_estimated_price - data.gotchi_items_estimated_price),
                //     gotchi_items: formatNumber(data.gotchi_items_estimated_price),
                //     items: formatNumber(data.all_items_estimated_price),
                //     inventory: formatNumber(data.inventory_items_estimated_price),
                //     paid_for_erc1155: formatNumber(data.overall_ghst_paid_for_erc155),
                //     collateral_value: formatNumber(data.total_collateral),
                //     brs: formatNumber(data.gotchies_mbrs),
                //     brs_medium: formatNumber(data.gotchies_medium_mbrs),
                //     kinship: formatNumber(data.gotchies_kinship),
                //     kinship_medium: formatNumber(data.gotchies_medium_kinship),
                //     xp: formatNumber(data.gotchies_xp),
                //     xp_medium: formatNumber(data.gotchies_medium_xp),
                // };
                const formatted = [
                    {
                        title: 'gotchis',
                        total: formatNumber(data.all_gotchies_estimated_price),
                        inner: [
                            { name: 'undressed', value: formatNumber(data.all_gotchies_estimated_price - data.gotchi_items_estimated_price) },
                            { name: 'wearables', value: formatNumber(data.gotchi_items_estimated_price) }
                        ]
                    },
                    {
                        title: 'wearables',
                        total: formatNumber(data.all_items_estimated_price),
                        inner: [
                            { name: 'equipped', value: formatNumber(data.gotchi_items_estimated_price) },
                            { name: 'inventory', value: formatNumber(data.inventory_items_estimated_price) },
                        ]
                    }

                    // paid_for_erc1155: formatNumber(data.overall_ghst_paid_for_erc155),
                    // collateral_value: formatNumber(data.total_collateral),
                    // brs: formatNumber(data.gotchies_mbrs),
                    // brs_medium: formatNumber(data.gotchies_medium_mbrs),
                    // kinship: formatNumber(data.gotchies_kinship),
                    // kinship_medium: formatNumber(data.gotchies_medium_kinship),
                    // xp: formatNumber(data.gotchies_xp),
                    // xp_medium: formatNumber(data.gotchies_medium_xp),
                ]

                console.log(formatted)
                setAccount(formatted);
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
            <EthAddress
                address={address}
                icon={true}
                copyButton={true}
                polygonButton={true}
            />

            { dataLoading ? (
                <div className={classes.placeholder}>
                    <CircularProgress size={32} />
                </div>
            ) : (
                commonUtils.isEmptyObject(account) ? (
                    <p className={classes.placeholder}>Data not arrived :(</p>
                ) : (
                    <div className={classes.panels}>
                        {/* { Object.entries(account).map((data, index) => {
                            const [key, value] = data;

                            return <div key={index}>
                                {key}:
                                <span  style={{ color: 'orange', marginLeft: 4 }}>{value}</span>
                            </div>
                        })} */}

                        { account.map((item, i) => (
                            <div className={classes.panel} key={i}>
                                <div className={classes.panelTitle}>
                                    {item.title} - <span>{item.total} <GhstTokenIcon height={16} width={16} /></span>
                                </div>

                                { item.inner && (
                                    <div className={classes.panelInner}>
                                        { item.inner.map((innerItem, j) => (
                                            <p key={j}>{innerItem.name} - {innerItem.value} <GhstTokenIcon height={16} width={16} /></p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
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
