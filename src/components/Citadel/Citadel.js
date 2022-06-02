import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

import CustomModal from 'components/Modal/Modal';
import ParcelPreview from 'components/Previews/ParcelPreview/ParcelPreview';
import commonUtils from 'utils/commonUtils';
import filtersUtils from 'utils/filtersUtils';

import CitadelScene from './components/Scene';
import CitadelLoader from './components/CitadelLoader';
import CitadelInterface from './components/CitadelInterface'
import FullscreenButton from './components/FullscreenButton';
import BasicButton from './components/BasicButton';
import SearchForm from './components/SearchForm';
import CitadelInfo from './components/CitadelInfo';
import CitadelFilters from './components/CitadelFilters';

import styles, { InterfaceStyles } from './styles';

const queryParamsOrder = ['district', 'size', 'sort', 'dir', 'active', 'multiselect'];

export default function Citadel({ realmGroups, className, isLoaded }) {
    const classes = { ...styles(), ...InterfaceStyles() }

    const location = useLocation();
    const history = useHistory();
    const [params, setParams] = useState(qs.parse(location.search, { arrayFormat: 'comma' }));

    const [game, setGame] = useState(null);
    const [mapCreated, setMapCreated] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const gameRef = useRef(null);
    const wrapperRef = useRef(null);

    const findOnMap = (type, value) => game.scene.find(type, value);

    const buttonIsActive = type => {
        const { active } = params;
        if (typeof active === 'string') {
            return active === type;
        } else {
            return active?.some(name => name === type);
        }
    };

    const removeSelected = () => setSelectedParcel(null);

    const toggleGroup = (type, isActive) => game.scene.toggleGroup(type, isActive);

    const onFiltersChange = filters => {
        updateQueryParams(filters);
        game.scene.trigger(`filtersUpdate`, filters);
    }

    const updateQueryParams = useCallback(filters => {
        const newParams = filtersUtils.getUpdatedQueryParams(params, filters);

        setParams(newParams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, history, location.pathname]);

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
                        handleClick={toggleGroup}
                        key={group.type}
                    />
                )
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realmGroups, mapCreated]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (game?.scene) {
            game.scene.on('created', () => setMapCreated(true));

            game.scene.on('parcelSelect', id => setSelectedParcel(id));

            game.scene.on('query', ({ name, param }) => {
                const queryParam = typeof params[name] === 'string' ? [params[name]] : params[name] || [];
                const paramIndex = queryParam.findIndex(item => item === param);

                if (paramIndex === -1) {
                    queryParam.push(param);
                } else {
                    queryParam.splice(paramIndex, 1);
                }

                setParams(paramsState => {
                    paramsState[name] = queryParam;

                    return { ...paramsState }
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game]);

    useEffect(() => {
        history.push({
            path: location.pathname,
            search: qs.stringify(params, {
                sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    useEffect(() => {
        if (mapCreated && realmGroups.length > 0) {
            const { active } = params;

            game.scene.addGroups(realmGroups.filter(group => !commonUtils.isEmptyObject(group)));

            if (active) {
                if (typeof active === 'string') {
                    game.scene.toggleGroup(active, true, true);
                } else {
                    for (const type of active) {
                        game.scene.toggleGroup(type, true, true);
                    }
                }
            }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realmGroups, mapCreated]);

    useEffect(() => {
        if (isLoaded && mapCreated) {
            const { multiselect } = params;

            game.scene.setMultiselect(typeof multiselect === 'string' ? [multiselect] : multiselect);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    icons={[<GridOffIcon />, <GridOnIcon />]}
                    handleClick={toggleGroup}
                    active={buttonIsActive('grid')}
                />
                <BasicButton
                    type='guilds'
                    tooltip='Guilds'
                    icons={[<DeselectIcon />, <SelectAllIcon />]}
                    handleClick={toggleGroup}
                    active={buttonIsActive('guilds')}
                />
                {basicButtons.length !== 0 && <Divider className={classes.interfaceDivider}/>}
                {basicButtons}
            </CitadelInterface>

            {mapCreated &&
                <CitadelFilters onFiltersChange={onFiltersChange} queryParams={params} />
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
