import classNames from 'classnames';

import { Erc1155Categories, InstallationTypeNames } from 'shared/constants';
import { ParcelInstallationVM, ParcelTileVM } from 'shared/models';

import { CardImage } from 'components/ItemCard/components';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { InstallationsUtils, TilesUtils } from 'utils';

import { styles } from './styles';

interface ParcelInstallationsProps {
  installations: ParcelInstallationVM[];
  tiles: ParcelTileVM[];
  size?: number;
  className?: string;
}

export function ParcelInstallations({ installations, tiles, size, className }: ParcelInstallationsProps) {
  const classes = styles();

  const renderInstallations = (installations: ParcelInstallationVM[]): JSX.Element[] => {
    return installations
      .filter((installation: ParcelInstallationVM) => InstallationsUtils.getIsInstallationExist(installation.id))
      .map((installation: ParcelInstallationVM) => {
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
              {installation.quantity > 1 && <div className={classes.installationQantity}>x{installation.quantity}</div>}

              <CardImage
                id={installation.id}
                category={Erc1155Categories.Installation}
                className={classes.installationImage}
              />
            </div>
          </CustomTooltip>
        );
      });
  };

  const renderTiles = (tiles: ParcelTileVM[]): JSX.Element[] => {
    return tiles
      .filter((tile: ParcelTileVM) => TilesUtils.getIsTileExists(tile.id))
      .map((tile: ParcelTileVM) => {
        const metadata = TilesUtils.getMetadataById(tile.id);

        return (
          <CustomTooltip
            title={
              <div className={classes.inner}>
                {metadata.type}: <span>{metadata.name}</span>
              </div>
            }
            placement='top'
            arrow={true}
            key={`tile-${tile.id}`}
          >
            <div
              className={classes.installation}
              style={{ width: size ? `${size}px` : '40px', height: size ? `${size}px` : '40px' }}
            >
              {tile.quantity > 1 && <div className={classes.installationQantity}>x{tile.quantity}</div>}

              <CardImage id={tile.id} category={Erc1155Categories.Tile} className={classes.installationImage} />
            </div>
          </CustomTooltip>
        );
      });
  };

  if (!installations?.length && !tiles?.length) {
    return <></>;
  }

  return (
    <div className={classNames(classes.container, className)}>
      {[...renderInstallations(installations), ...renderTiles(tiles)]}
    </div>
  );
}
