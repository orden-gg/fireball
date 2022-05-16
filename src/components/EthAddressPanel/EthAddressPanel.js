import React, { useEffect, useState } from 'react';

import styles from './styles.js'
import aavegotchilandApi from 'api/aavegotchiland.api.js';
import commonUtils from 'utils/commonUtils.js';

export default function EthAddressPanel({ address }) {
    const classes = styles();
    const [dataLoading, setDataLoading] = useState(true);
    const [account, setAccount] = useState({});

    useEffect(() => {
        let mounted = true;

        setDataLoading(true);

        aavegotchilandApi.getAddressInfo(address).then((res) => {
            if (mounted) {
                setAccount(res.data);
                setDataLoading(false);
            }
        }).catch((error) => {
            console.log(error);

            if (mounted) {
                setAccount({});
                setDataLoading(false);
            }
        });
        // aavegotchilandApi.getAddressItemization(address);

        return () => mounted = false;
    }, [address]);

    return (
        <div className={classes.container}>
            addr - {address}

            { dataLoading ? (
                <p>Loading...</p>
            ) : (
                commonUtils.isEmptyObject(account) ? (
                    <p>Data not arrived :(</p>
                ) : (
                    <div>
                        <p>gotchi with items value - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.all_gotchies_estimated_price)}</span></p>
                        <p>gotchi items value - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.gotchi_items_estimated_price)}</span></p>
                        <p>items value - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.all_items_estimated_price)}</span></p>
                        <p>inventory value - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.inventory_items_estimated_price)}</span></p>
                        <p>paid for erc1155 - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.overall_ghst_paid_for_erc155)}</span></p>
                        <p>total collateral value - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.total_collateral)}</span></p>
                        <p>BRS - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.gotchies_brs)}</span></p>
                        <p>BRS medium - <span style={{ color: 'orange' }}>{account.gotchies_medium_brs}</span></p>
                        <p>modified BRS - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.gotchies_mbrs)}</span></p>
                        <p>modified BRS medium - <span style={{ color: 'orange' }}>{account.gotchies_medium_mbrs}</span></p>
                        <p>kinship - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.gotchies_kinship)}</span></p>
                        <p>kinship medium - <span style={{ color: 'orange' }}>{account.gotchies_medium_kinship}</span></p>
                        <p>XP - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.gotchies_xp)}</span></p>
                        <p>XP medium - <span style={{ color: 'orange' }}>{account.gotchies_medium_xp}</span></p>
                        <p>NR - <span style={{ color: 'orange' }}>{commonUtils.convertFloatNumberToSuffixNumber(account.gotchies_nr)}</span></p>
                    </div>
                )
            )}
        </div>
    );
}
