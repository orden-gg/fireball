import { Skeleton } from '@mui/material';

import installationsUtils from 'utils/installationsUtils';
import { InstallationTypeNames } from 'data/types';

import styles from './styles';
import InstallationImage from '../Installation/InstallationImage';
import CustomTooltip from 'components/custom/CustomTooltip';

// const dataFormat = {
//     days: { key: 'dd', value: 'd', showIfZero: false },
//     hours: { key: 'hh', value: 'h', showIfZero: false },
//     minutes: { key: 'mm', value: 'm', showIfZero: false }
// };

export default function ParcelInstallations({ parcel, size }) {
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

            { parcel.installations.map((installation, index) => {
                const metadata = installationsUtils.getMetadataById(installation.id);
                const isAltar = metadata.type === InstallationTypeNames.Altar;

                return (
                    <div
                        className={classes.installation}
                        style={{ width: size ? `${size}px` : '40px', height: size ? `${size}px` : '40px' }}
                        key={index}
                    >
                        { isAltar && (
                            <div className={classes.installationLevel}>
                                {metadata.level}
                            </div>
                        )}

                        <CustomTooltip
                            title={
                                <div>
                                    <div className={classes.inner}>
                                        {metadata.type}: <span>{metadata.name}</span>
                                    </div>

                                    { isAltar && (
                                        <div className={classes.row}>
                                            <div className={classes.inner}>
                                                lvl: <span>{metadata.level}</span>
                                            </div>
                                            <div className={classes.inner}>
                                                cd: <span>{metadata.cooldown}h</span>
                                            </div>
                                            <div className={classes.inner}>
                                                rate: <span>{100 - (metadata.spillRate / 100)}%</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                            placement='top'
                            arrow={true}
                        >
                            <div className={classes.installationImage}>
                                <InstallationImage data={installation} />
                            </div>
                        </CustomTooltip>


                        {/* { parcel.upgrading && (
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
                        )} */}
                    </div>
                );
            })}
        </div>
    );
}
