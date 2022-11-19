import { Skeleton } from '@mui/material';

import classNames from 'classnames';

import { Erc1155Categories, InstallationTypeNames } from 'shared/constants';
import { InstallationsUtils } from 'utils';

import { styles } from './styles';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { CardImage } from 'components/ItemCard/components';

// const dataFormat = {
//     days: { key: 'dd', value: 'd', shownIfZero: false },
//     hours: { key: 'hh', value: 'h', shownIfZero: false },
//     minutes: { key: 'mm', value: 'm', shownIfZero: false }
// };

interface ParcelInstallationsProps {
    parcel: any;
    size?: any;
    className?: string
}

export function ParcelInstallations({ parcel, size, className }: ParcelInstallationsProps) {
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
        <div className={classNames(classes.container, className)}>
            { parcel.installations
            .filter((installation: any) =>
                InstallationsUtils.getIsInstallationExist(installation.id)
            )
            .map((installation: any, index: number) => {
                const metadata = InstallationsUtils.getMetadataById(installation.id);
                const isDecoration = metadata.type === InstallationTypeNames.Decoration;

                return (
                    <CustomTooltip
                        title={
                            <div>
                                <div className={classes.inner}>
                                    {metadata.type}: <span>{metadata.name}</span>
                                </div>

                                { !isDecoration && (
                                    <div className={classes.row}>
                                        <div className={classes.inner}>
                                            lvl: <span>{metadata.level}</span>
                                        </div>
                                        <div className={classes.inner}>
                                            cd: <span>{metadata.cooldown}h</span>
                                        </div>
                                        <div className={classes.inner}>
                                            spillover: <span>{metadata.spillRate / 100}%</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                        placement='top'
                        arrow={true}
                        key={index}
                    >
                        <div
                            className={classes.installation}
                            style={{ width: size ? `${size}px` : '40px', height: size ? `${size}px` : '40px' }}
                        >
                            <div className={classes.installationLevel}>
                                {metadata.level}
                            </div>
                            <CardImage id={installation.id} category={Erc1155Categories.Realm} className={classes.installationImage} />
                        </div>
                    </CustomTooltip>

                    /* { parcel.upgrading && (
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
                    )} */
                );
            })}
        </div>
    );
}
