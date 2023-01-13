import classNames from 'classnames';

import { Erc1155Categories, InstallationTypeNames } from 'shared/constants';
import { InstallationsUtils, TilesUtils } from 'utils';

import { styles } from './styles';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { CardImage } from 'components/ItemCard/components';
import { useCallback } from 'react';

interface ParcelInstallationsProps {
    parcel: any;
    size?: any;
    className?: string;
}

export function ParcelInstallations({ parcel, size, className }: ParcelInstallationsProps) {
    const classes = styles();

    const getInstallations = useCallback(() => {
        return parcel.installations
            .filter((installation: any) => InstallationsUtils.getIsInstallationExist(installation.id))
            .map((installation: any) => {
                const metadata = InstallationsUtils.getMetadataById(installation.id);
                const isDecoration = metadata.type === InstallationTypeNames.Decoration;

                return (
                    <CustomTooltip
                        title={
                            <div>
                                <div className={classes.inner}>
                                    {metadata.type}: <span>{metadata.name}</span>
                                </div>

                                {!isDecoration && (
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
                        key={`installation-${installation.id}`}
                    >
                        <div
                            className={classes.installation}
                            style={{ width: size ? `${size}px` : '40px', height: size ? `${size}px` : '40px' }}
                        >
                            {installation.quantity > 1 && (
                                <div className={classes.installationQantity}>x{installation.quantity}</div>
                            )}

                            <CardImage
                                id={installation.id}
                                category={Erc1155Categories.Installation}
                                className={classes.installationImage}
                            />
                        </div>
                    </CustomTooltip>
                );
            });
    }, [parcel.installations]);

    const getTiles = useCallback(() => {
        return parcel.tiles
            .filter((tile: any) => TilesUtils.getTileExist(tile.id))
            .map((tile: any) =>
                <div
                    key={`tile-${tile.id}`}
                    className={classes.installation}
                    style={{ width: size ? `${size}px` : '40px', height: size ? `${size}px` : '40px' }}
                >
                    {tile.quantity > 1 && (
                        <div className={classes.installationQantity}>x{tile.quantity}</div>
                    )}

                    <CardImage
                        id={tile.id}
                        category={Erc1155Categories.Tile}
                        className={classes.installationImage}
                    />
                </div>
            );
    }, [parcel.tiles]);

    if (!parcel.installations.length && !parcel.tiles.length) {
        return (
            <div className={classes.container}>
                <div className={classes.placeholderWarning}>no installations</div>
            </div>
        );
    }

    return (
        <div className={classNames(classes.container, className)}>
            {[...getInstallations(), ...getTiles()]}
        </div>
    );
}
