import { DateTime } from 'luxon';

import { CountdownFormatNonZeroType } from 'shared/constants';
import { CountdownShortFormat, Parcel } from 'shared/models';
import { Countdown } from 'components/Countdown/Countdown';

import { styles } from './styles';

const countdownFormat: CountdownShortFormat = {
    days: {
        key: CountdownFormatNonZeroType.D,
        value: 'd',
        isShown: true,
        shownIfZero: false
    },
    hours: {
        key: CountdownFormatNonZeroType.H,
        value: 'h',
        isShown: true,
        shownIfZero: false
    },
    minutes: {
        key: CountdownFormatNonZeroType.M,
        value: 'm',
        isShown: true,
        shownIfZero: false
    },
    seconds: {
        key: CountdownFormatNonZeroType.S,
        value: 's',
        isShown: false,
        shownIfZero: false,
        showIfParentIsZero: true,
        parentKey: 'minutes'
    }
};

export function ChannelingInfo({ parcel }: { parcel: Parcel }) {
    const classes = styles();

    const fromTimestampToMillis = (timestamp: number) => {
        return DateTime.fromSeconds(timestamp).toMillis();
    };

    if (!parcel.lastChanneled) {
        return (
            <div className={classes.container}>
                <div className={classes.placeholderWarning}>never channeled</div>
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>channeling</div>

            <div className={classes.inner}>
                last:
                <Countdown targetDate={fromTimestampToMillis(parcel.lastChanneled)} shortFormat={countdownFormat} />
            </div>
            <div className={classes.inner}>
                ready:
                <div className={classes.countdown}>
                    <Countdown
                        targetDate={fromTimestampToMillis(parcel.nextChannel)}
                        shortFormat={countdownFormat}
                        replacementComponent={<span style={{ color: 'lime' }}>Now!</span>}
                    />
                </div>
            </div>
        </div>
    );
}
