import React, { useEffect, useState } from 'react';

import { DateTime } from 'luxon';

import ethersApi from 'api/ethers.api';

import Countdown from './Countdown';

/***
 * @param block - polygon block height number
*/

const shortFormat = {
    days: { key: 'dd', value: 'd', showIfZero: false },
    hours: { key: 'hh', value: 'h', showIfZero: false },
    minutes: { key: 'mm', value: 'm', showIfZero: false },
};

export default function BlockCountdown({ block, props }) {
    const [timestamp, setTimestamp] = useState(null);

    useEffect(() => {
        let mounted = true;

        ethersApi.getFutureBlockTimestamp(block, 'polygon')
            .then(res => {
                if (mounted) {
                    setTimestamp(DateTime.fromSeconds(res).toMillis())
                }
            });

        return () => mounted = false;
    }, [block]);

    if (!timestamp) {
        return <span>Loading...</span>
    }

    return (
        <>
            ≈
            <Countdown targetDate={timestamp} shortFormat={shortFormat} {...props} />
        </>
    )
}
