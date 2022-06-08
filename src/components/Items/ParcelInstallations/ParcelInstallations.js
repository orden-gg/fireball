import { Skeleton } from '@mui/material';

import { DateTime } from 'luxon';

import Countdown from 'components/Countdown/Countdown';
import installationsUtils from 'utils/installationsUtils';

import styles from './styles';

const dataFormat = {
    days: { key: 'dd', value: 'd', showIfZero: false },
    hours: { key: 'hh', value: 'h', showIfZero: false },
    minutes: { key: 'mm', value: 'm', showIfZero: false }
};

export default function ParcelInstallations({ parcel }) {
    const classes = styles();

    if (parcel.installations.loading) {
        return <div className={classes.placeholder}>
            <Skeleton
                className={classes.placeholderInner}
                variant='rectangular'
                width='100%'
                height={30}
            />
        </div>;
    }

    if (!parcel.installations.length) {
        return <div className={classes.container}>
            <div className={classes.placeholderWarning}>
                no installations
            </div>
        </div>;
    }

    return (
        <div className={classes.container}>
            {console.log('parcel.installations', parcel.installations)}
            { parcel.installations.map((inst, index) => {
                const metadata = installationsUtils.getMetadataById(inst.id);

                return (
                    <div className={classes.installation} key={index}>
                        <div className={classes.subtitle}>Altar!</div>

                        <div className={classes.row}>
                            <div className={classes.inner}>lvl:<span>{metadata.level}</span></div>
                            <div className={classes.inner}>cd:<span>{metadata.cooldown}h</span></div>
                            <div className={classes.inner}>rate:<span>{100 - (metadata.spillRate / 100)}%</span></div>
                        </div>

                        { parcel.upgrading && (
                            <div className={classes.upgrade}>
                                <span>upg:</span>

                                <div className={classes.countdown}>
                                    <Countdown
                                        targetDate={DateTime.fromSeconds(parcel.upgrading.timestamp).toMillis()}
                                        shortFormat={dataFormat}
                                        replacementComponent={<span className={classes.ready}>Ready!</span>}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
