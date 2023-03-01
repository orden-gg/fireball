import { IonPhaser } from '@ion-phaser/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import GridOnIcon from '@mui/icons-material/GridOn';
import { Backdrop, CircularProgress, Divider } from '@mui/material';

import classNames from 'classnames';
import Phaser from 'phaser';
import qs from 'query-string';

import { TheGraphApi } from 'api';

import { CommonUtils, FilterUtils, InstallationsUtils, TilesUtils } from 'utils';

import { CustomModal } from 'components/CustomModal/CustomModal';
import { GuildIcon } from 'components/Icons/Icons';
import { ParcelPreview } from 'components/Previews/ParcelPreview/ParcelPreview';

import { BasicButton } from './components/BasicButton';
import { CitadelFilters } from './components/CitadelFilters';
import { CitadelInfo } from './components/CitadelInfo';
import { CitadelInterface } from './components/CitadelInterface';
import { CitadelLoader } from './components/CitadelLoader';
import { FullscreenButton } from './components/FullscreenButton';
import { CitadelScene } from './components/Scene';
import { SearchForm } from './components/SearchForm';
import { InterfaceStyles, styles } from './styles';

const queryParamsOrder = ['district', 'size', 'sort', 'dir', 'active', 'multiselect'];

interface CitadelProps {
  realmGroups: any[];
  className?: string;
  isLoaded: boolean;
}

export function Citadel({ realmGroups, className, isLoaded }: CitadelProps) {
  const classes = { ...styles(), ...InterfaceStyles() };

  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<qs.ParsedQuery<string>>(qs.parse(location.search, { arrayFormat: 'comma' }));

  const [game, setGame] = useState<any>(null);
  const [mapCreated, setMapCreated] = useState<boolean>(false);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [parcelLoading, setParcelLoading] = useState<boolean>(false);

  const gameRef = useRef<any>(null);
  const wrapperRef = useRef<any>(null);

  const findOnMap = (type: string, value: string) => game.scene.find(type, value);

  const removeSelected = () => setSelectedParcel(null);

  const onExportData = () => {
    FilterUtils.exportData(game.scene.filtersManager.filteredParcels, 'parcels');
  };

  const updateGroup = (type: string, isActive: boolean) => {
    game.scene.updateGroup(type, isActive);
  };

  const onFiltersChange = (filters: any) => {
    updateQueryParams(filters);
    game.scene.filtersManager.updateFilters(filters);
  };

  const buttonIsActive = (type: string) => {
    const { active } = params;

    if (typeof active === 'string') {
      return active === type;
    } else {
      return Boolean(active?.some((name) => name === type));
    }
  };

  const basicButtons = useMemo(() => {
    return realmGroups
      .filter((group) => !CommonUtils.isEmptyObject(group) && group.parcels?.length > 0)
      .map((group) => {
        return (
          <BasicButton
            type={group.type}
            icon={group.icon}
            tooltip={group.tooltip}
            active={buttonIsActive(group.type) || group.active}
            handleClick={updateGroup}
            key={group.type}
          />
        );
      });
  }, [realmGroups, mapCreated]);

  const updateQueryParams = useCallback(
    (filters: any) => {
      const newParams: { [key: string]: string | string[] } = FilterUtils.getUpdatedQueryParams(params, filters);

      setParams(newParams);
    },
    [params]
  );

  useEffect(() => {
    setTimeout(() => {
      setGame({
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
        type: Phaser.NONE,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: window.innerWidth,
          height: window.innerHeight
        },
        scene: new CitadelScene({ wrapperRef })
      });
    }, 100);
  }, []);

  useEffect(() => {
    if (game?.scene) {
      game.scene.on('created', () => setMapCreated(true));

      game.scene.on('parcelSelect', (parcel) => {
        setParcelLoading(true);

        TheGraphApi.getRealmById(parcel.tokenId).then((realmParcel) => {
          if (realmParcel !== null) {
            if (realmParcel.installations.length > 0) {
              realmParcel.installations = InstallationsUtils.combineInstallations(realmParcel.installations);
            }

            if (realmParcel.tiles.length > 0) {
              realmParcel.tiles = TilesUtils.combineTiles(realmParcel.tiles);
            }

            setSelectedParcel(realmParcel);
          } else {
            setSelectedParcel(parcel);
          }
          setParcelLoading(false);
        });
      });

      game.scene.on('query', ({ name, params }) => {
        setParams((paramsState) => {
          paramsState[name] = params;

          return { ...paramsState };
        });
      });
    }
  }, [game]);

  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: qs.stringify(params, {
        sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
        arrayFormat: 'comma'
      })
    });
  }, [params]);

  useEffect(() => {
    if (mapCreated && realmGroups.length > 0) {
      const { active } = params;
      const groups = realmGroups.filter((group) => !CommonUtils.isEmptyObject(group));

      game.scene.addGroups(groups);

      if (active) {
        if (typeof active === 'string') {
          game.scene.toggleGroup(active, true);
        } else {
          for (const type of active) {
            game.scene.toggleGroup(type, true);
          }
        }
      } else {
        const activeGroups = groups.filter((group) => group.active);
        activeGroups.forEach((group) => game.scene.toggleGroup(group.type, true));

        setParams((paramsCache) => ({
          ...paramsCache,
          active: activeGroups.map((group) => group.type)
        }));
      }
    }
  }, [realmGroups, mapCreated]);

  useEffect(() => {
    if (isLoaded && mapCreated) {
      const { multiselect } = params;

      if (multiselect && multiselect.length > 0) {
        game.scene.setMultiselect(typeof multiselect === 'string' ? [multiselect] : multiselect);
      }
    }
  }, [isLoaded, mapCreated]);

  useEffect(() => {
    if (selectedParcel !== null) {
      setModalOpen(true);
    }
  }, [selectedParcel]);

  return (
    <div ref={wrapperRef} className={classNames(classes.citadelWrapper, className, 'citadel-wrapper')}>
      <IonPhaser ref={gameRef} game={game} initialize={true} className={classes.citadel} />

      <CitadelInterface>
        <SearchForm onSearch={findOnMap} type='parcel' placeholder='Parcel id or name' />
        <SearchForm onSearch={findOnMap} type='district' placeholder='District id' />
        <Divider className={classes.interfaceDivider} />
        <BasicButton
          type='grid'
          tooltip='Districts grid'
          /* eslint-disable-next-line react/jsx-key */
          icon={<GridOnIcon />}
          handleClick={updateGroup}
          active={buttonIsActive('grid')}
        />
        <BasicButton
          type='guilds'
          tooltip='Guilds'
          /* eslint-disable-next-line react/jsx-key */
          icon={<GuildIcon width={24} height={24} />}
          handleClick={updateGroup}
          active={buttonIsActive('guilds')}
        />
        <>{basicButtons.length !== 0 && <Divider className={classes.interfaceDivider} />}</>
        <>{basicButtons}</>
      </CitadelInterface>

      {mapCreated && (
        <CitadelFilters onFiltersChange={onFiltersChange} queryParams={params} onExportData={onExportData} />
      )}

      <FullscreenButton wrapperRef={wrapperRef} />

      <CitadelInfo />

      <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen} onModalClose={removeSelected}>
        {selectedParcel !== null ? <ParcelPreview parcel={selectedParcel} /> : <></>}
      </CustomModal>

      <CitadelLoader isLoaded={isLoaded && mapCreated} />

      {parcelLoading && (
        <Backdrop open={parcelLoading}>
          <CircularProgress color='primary' />
        </Backdrop>
      )}
    </div>
  );
}
