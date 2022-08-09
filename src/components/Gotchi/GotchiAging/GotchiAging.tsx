import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { EthersApi } from 'api';

import { styles } from './styles';
import { CommonUtils, GotchiUtils } from 'utils';

export function GotchiAging({ block }: { block: number }) {
    const classes = styles();
    const [dataLoading, setDataLoading] = useState(true);
    const [aging, setAging]: any = useState(null);

    useEffect(() => {
        setDataLoading(true);

        Promise.all([
            EthersApi.getLastBlock(),
            EthersApi.getBlockByNumber(block)
        ]).then(([lastBlock, birthdayBlock]) => {
            const blockDiff = lastBlock.number - birthdayBlock.number;
            const metadata = GotchiUtils.getAgingMetadata(blockDiff);

            setAging({
                timestamp: birthdayBlock.timestamp,
                blockDiff: blockDiff,
                metadata: metadata
            });
            setDataLoading(false);
        });

    //   return () => {
    //     second
    //   }
    }, []);

    return (
        <div className={classes.container}>
            { !dataLoading && aging ? (
                <div className={classes.inner}>
                    <div>
                        {aging.metadata.name}
                    </div>
                    <div>
                        born
                        <span>
                            {DateTime.fromSeconds(aging.timestamp).toFormat('dd.MM.yyyy')}
                        </span>
                        <span>
                            ({DateTime.fromSeconds(aging.timestamp).toRelative({ locale: 'en' })})
                        </span>
                    </div>
                    <div>
                        ~{CommonUtils.convertFloatNumberToSuffixNumber(aging.blockDiff)} blocks ago
                    </div>
                </div>
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
}
