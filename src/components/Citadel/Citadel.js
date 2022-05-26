import React, { useEffect, useMemo, useRef, useState } from 'react';
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

import CitadelScene from './components/Scene';
import CitadelLoader from './components/CitadelLoader';
import CitadelInterface from './components/CitadelInterface'
import FullscreenButton from './components/FullscreenButton';
import BasicButton from './components/BasicButton';
import SearchForm from './components/SearchForm';
import CitadelInfo from './components/CitadelInfo';

import styles, { InterfaceStyles } from './styles';

const paramsToArray = params => {
    const parsedParams = {};

    for(const [key, param] of Object.entries(params)) {
        const items = param?.split(',');
        const isExisting = items !== undefined && items[0].length !== 0;
        parsedParams[key] = isExisting ? items : [];
    }

    return parsedParams;
}

export default function Citadel({ realmGroups, className, isLoaded }) {
    const classes = { ...styles(), ...InterfaceStyles() }

    const location = useLocation();
    const history = useHistory();

    const [params, setParams] = useState(paramsToArray(qs.parse(location.search)));

    const [game, setGame] = useState(null);
    const [mapCreated, setMapCreated] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const gameRef = useRef(null);
    const wrapperRef = useRef(null);

    const findOnMap = (type, value) => game.scene.find(type, value);

    const buttonIsActive = type => params.active?.some(name => name === type);

    const removeSelected = () => setSelectedParcel(null);

    const toggleGroup = (type, isActive) => game.scene.toggleGroup(type, isActive);

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
        if(game?.scene) {
            game.scene.on('created', () => setMapCreated(true));

            game.scene.on('parcelSelect', id => setSelectedParcel(id));

            game.scene.on('query', ({ name, param }) => {
                const queryParam = params[name] || [];
                const paramIndex = queryParam.findIndex(item => item === param);

                if (paramIndex === -1) {
                    queryParam.push(param);
                } else {
                    queryParam.splice(paramIndex, 1);
                }

                setParams(paramsState => {
                    paramsState[name] = queryParam;

                    return {...paramsState}
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game]);

    useEffect(() => {
        history.push({
            path: location.pathname,
            search: qs.stringify(params, { arrayFormat: 'comma' })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    useEffect(() => {
        if(mapCreated) {
            for (const group of realmGroups) {
                if (commonUtils.isEmptyObject(group)) {
                    continue;
                }

                game.scene.addGroup(group);
            }

            if (params.active) {
                for (const type of params.active) {
                    game.scene.toggleGroup(type, true, true);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realmGroups, mapCreated]);

    useEffect(() => {
        if (isLoaded && mapCreated) {

            if (params.multiselect?.length > 0) {
                game.scene.setMultiselect(params.multiselect);
            }
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
                <FullscreenButton wrapperRef={wrapperRef} />
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

            <IonPhaser ref={gameRef} game={game} initialize={true} className={classes.citadel} />

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
