import React from 'react';

import { DateTime } from 'luxon';

// import { FudIcon, RealmGif } from 'components/Icons/Icons';
// import CustomTooltip from 'components/custom/CustomTooltip';
// import realmApi from 'api/realm.api';
// import { DAY_MILLIS } from 'data/date';

import styles from './styles';
// import ContentLoader from 'react-content-loader';

export default function ChannelingInfo({ last, readyIn }) {
    const classes = styles();

    // const [lastChanneling, setLastChanneling] = useState();
    // const [lastChannelingLoading, setLastChanellingLoading] = useState(true);

    // const dateDiff =  DateTime.fromSeconds(date) + DateTime.fromMillis(DAY_MILLIS) - DateTime.local();
    // const dateArray = Duration.fromObject({ milliseconds: dateDiff }).shiftTo('days', 'hours', 'minutes', 'seconds').normalize().toObject();

    // useEffect(() => {
    //     let mounted = true;

    //     setLastChanellingLoading(true);

    //     realmApi.getParcelLastChanneled(parcelId).then(res => {
    //         if (mounted) {
    //             setLastChanneling(res * 1000);
    //         }
    //     }).finally(() => {
    //         if (mounted) {
    //             setLastChanellingLoading(false);
    //         }
    //     });

    //     // realmApi.getParcelInfo(parcelId).then(res => {
    //     //     console.log('res', res)
    //     // })

    //     return () => mounted = false;
    // }, [parcelId]);

    // const atLeastOneTimeChanneled = (date) => {
    //     return date > 0;
    // }

    // const moreThan24hours = (date) => {
    //     const dateDiff = DateTime.local() - DateTime.fromMillis(date);

    //     return dateDiff > DAY_MILLIS;
    // }

    return (
        <div className={classes.container}>
            <p>last: {DateTime.fromSeconds(last).toRelative()}</p>
            {/* <p>{DateTime.fromSeconds(last).toRelative()}</p> */}
            {/* <p>last {last} - { DateTime.local(last, { zone: 'utc' }).toRelative()}</p> */}
            <p>ready: {readyIn}</p>
            {/* { lastChannelingLoading ? (
                <ContentLoader
                    speed={2}
                    viewBox='0 0 28 28'
                    backgroundColor='#2c2f36'
                    foregroundColor='#16181a'
                    className={classes.placeholder}
                >
                    <rect x='0' y='0' width='28' height='28' />
                </ContentLoader>
            ) : (
                <CustomTooltip
                    title={
                        atLeastOneTimeChanneled(lastChanneling) ? (
                            <span>last channeling: <span className='highlight'>{DateTime.fromMillis(lastChanneling).toRelative()}</span></span>
                        ) : (
                            <span><span className='highlight'>never</span> channeled!</span>
                        )
                    }
                    placement='top'
                    followCursor
                >
                    <div>
                        { !atLeastOneTimeChanneled(lastChanneling) ? (
                            <span style={{ color: 'orange', fontSize: 18, fontWeight: 'bold' }}>N</span>

                        ) : (
                            moreThan24hours(lastChanneling) ? (
                                <RealmGif height={24} width={24} />
                            ) : (
                                <FudIcon className={classes.unactiveIcon} height={24} width={28} />
                            )
                        )}

                    </div>
                </CustomTooltip>
            )} */}
        </div>
    )
}
