import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Divider } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';
import DeselectIcon from '@mui/icons-material/Deselect';
import SelectAllIcon from '@mui/icons-material/SelectAll';

import Phaser from 'phaser';
import classNames from 'classnames';
import { IonPhaser } from '@ion-phaser/react';
import qs from 'query-string';

import { CustomModal } from 'components/Modal/Modal';
import ParcelPreview from 'components/Previews/ParcelPreview/ParcelPreview';
import commonUtils from 'utils/commonUtils';
import filtersUtils from 'utils/filtersUtils';

import CitadelScene from './components/Scene';
import { CitadelLoader } from './components/CitadelLoader';
import { CitadelInterface } from './components/CitadelInterface';
import FullscreenButton from './components/FullscreenButton';
import { BasicButton } from './components/BasicButton';
import { SearchForm } from './components/SearchForm';
import { CitadelInfo } from './components/CitadelInfo';
import { CitadelFilters } from './components/CitadelFilters';

import { styles, InterfaceStyles } from './styles';

const queryParamsOrder = ['district', 'size', 'sort', 'dir', 'active', 'multiselect'];

interface CitadelProps {
    realmGroups: any[];
    className: string;
    isLoaded: boolean;
}

export function Citadel({ realmGroups, className, isLoaded }: CitadelProps) {
    const classes = { ...styles(), ...InterfaceStyles() };

    const location = useLocation();
    const history = useHistory();
    const [params, setParams] = useState<qs.ParsedQuery<string>>(qs.parse(location.search, { arrayFormat: 'comma' }));

    const [game, setGame] = useState<any>(null);
    const [mapCreated, setMapCreated] = useState<boolean>(false);
    const [selectedParcel, setSelectedParcel] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const gameRef = useRef<any>(null);
    const wrapperRef = useRef<any>(null);

    const findOnMap = (type: string, value: string) => game.scene.find(type, value);

    const removeSelected = () => setSelectedParcel(null);

    const onExportData = () => {
        filtersUtils.exportData(game.scene.filtersManager.filteredParcels, 'parcels');
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
            return Boolean(active?.some(name => name === type));
        }
    };
    const basicButtons = useMemo(() => {
        return realmGroups
            .filter(group => !commonUtils.isEmptyObject(group) && group.parcels?.length > 0)
            .map(group => {

                return (
                    <BasicButton
                        type={group.type}
                        icons={group.icons}
                        tooltip={group.tooltip}
                        active={buttonIsActive(group.type) || group.active}
                        handleClick={updateGroup}
                        key={group.type}
                    />
                );
            });
    }, [realmGroups, mapCreated]);

    const updateQueryParams = useCallback((filters: any) => {
        const newParams: { [key: string]: string | string[] } = filtersUtils.getUpdatedQueryParams(params, filters);

        setParams(newParams);
    }, [params]);

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

            game.scene.on('parcelSelect', id => setSelectedParcel(id));

            game.scene.on('query', ({ name, params }) => {
                setParams(paramsState => {
                    paramsState[name] = params;

                    return { ...paramsState };
                });
            });
        }
    }, [game]);

    useEffect(() => {
        history.push({
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
            const groups = realmGroups.filter(group => !commonUtils.isEmptyObject(group));

            game.scene.addGroups(groups);

            if (active) {
                if (typeof active === 'string') {
                    game.scene.toggleGroup(active, true);
                } else {
                    for (const type of active) {
                        game.scene.toggleGroup(type, true);
                    }
                }
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
        <div ref={wrapperRef} className={classNames(className, 'citadel-wrapper')}>
            <IonPhaser ref={gameRef} game={game} initialize={true} className={classes.citadel} />

            <CitadelInterface>
                <SearchForm
                    onSearch={findOnMap}
                    type='parcel'
                    placeholder="Parcel id or name"
                />
                <SearchForm
                    onSearch={findOnMap}
                    type='district'
                    placeholder="District id"
                />
                <Divider className={classes.interfaceDivider}/>
                <BasicButton
                    type='grid'
                    tooltip='Districts grid'
                    /* eslint-disable-next-line react/jsx-key */
                    icons={[<GridOffIcon />, <GridOnIcon />]}
                    handleClick={updateGroup}
                    active={buttonIsActive('grid')}
                />
                <BasicButton
                    type='guilds'
                    tooltip='Guilds'
                    /* eslint-disable-next-line react/jsx-key */
                    icons={[<DeselectIcon />, <SelectAllIcon />]}
                    handleClick={updateGroup}
                    active={buttonIsActive('guilds')}
                />
                <>{basicButtons.length !== 0 && <Divider className={classes.interfaceDivider}/>}</>
                <>{basicButtons}</>
            </CitadelInterface>

            {mapCreated &&
                <CitadelFilters
                    onFiltersChange={onFiltersChange}
                    queryParams={params}
                    onExportData={onExportData}
                />
            }

            <FullscreenButton wrapperRef={wrapperRef} />

            <CitadelInfo />

            <CustomModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                onModalClose={removeSelected}
            >
                <ParcelPreview parcel={selectedParcel} />
            </CustomModal>

            <CitadelLoader isLoaded={isLoaded && mapCreated} />
        </div>
    );
}
