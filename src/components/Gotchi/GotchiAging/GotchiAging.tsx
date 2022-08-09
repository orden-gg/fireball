import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

import { DateTime } from 'luxon';
import classNames from 'classnames';

import { CountdownShortFormat, GotchiAgingModel } from 'shared/models';
import { CountdownFormatNonZeroType } from 'shared/constants';
import { ShineLabel } from 'components/Labels/ShineLabel';
import { Countdown } from 'components/Countdown/Countdown';
import { EthersApi } from 'api';
import { CommonUtils, GotchiUtils } from 'utils';

import { styles } from './styles';

const countdownFormat: CountdownShortFormat = {
    years: {
        key: CountdownFormatNonZeroType.Y,
        value: 'y',
        isShown: true,
        shownIfZero: false
    },
    days: {
        key: CountdownFormatNonZeroType.D,
        value: 'd',
        isShown: true,
        shownIfZero: false
    }
};

export function GotchiAging({ block }: { block: number }) {
    const classes = styles();

    const [dataLoading, setDataLoading] = useState(true);
    const [aging, setAging]: any = useState(null);

    useEffect(() => {
        let mounted = true;

        setDataLoading(true);

        Promise.all([
            EthersApi.getLastBlock(),
            EthersApi.getBlockByNumber(block)
        ]).then(([lastBlock, birthdayBlock]) => {
            const blockDiff = lastBlock.number - birthdayBlock.number;
            const metadata: GotchiAgingModel = GotchiUtils.getAgingMetadata(blockDiff);

            if (mounted) {
                setAging({
                    timestamp: birthdayBlock.timestamp,
                    blockDiff: blockDiff,
                    metadata: metadata
                });
                setDataLoading(false);
            }
        });

        return () => { mounted = false };
    }, []);

    return (
        <div className={classes.container}>
            { !dataLoading && aging ? (

                <div className={classes.inner}>
                    <div>
                        <img
                            src={GotchiUtils.getAgingImg(aging.metadata.boost)}
                            alt={aging.metadata.name} />
                    </div>
                    <div>
                        <div className={classes.name}>
                            <ShineLabel text={aging.metadata.name} />
                            <span className={classes.offset}>(+{aging.metadata.boost} pts)</span>
                        </div>
                        <div>
                            born
                            <span className={classNames(classes.offset, classes.highlight)}>
                                {DateTime.fromSeconds(aging.timestamp).toFormat('dd.MM.yyyy')}
                            </span>
                            <span className={classes.offset}>
                                (<Countdown
                                    targetDate={DateTime.fromSeconds(aging.timestamp).toMillis()}
                                    shortFormat={countdownFormat}
                                />)
                            </span>
                        </div>
                        <div>
                            ~{CommonUtils.convertFloatNumberToSuffixNumber(aging.blockDiff)} blocks ago
                        </div>
                    </div>
                </div>
            ) : (
                <Skeleton
                    className={classes.placeholder}
                    variant='rectangular'
                    width={280}
                    height={66}
                />
            )}
        </div>
    );
}
