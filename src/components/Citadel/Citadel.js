import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Divider } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';

import Phaser from 'phaser';
import classNames from 'classnames';
import { IonPhaser } from '@ion-phaser/react';

import thegraph from 'api/thegraph.api';

import CitadelScene from './components/Scene';
import CitadelLoader from './components/CitadelLoader';
import ParcelBox from './components/ParcelBox';
import CitadelInterface from './components/CitadelInterface'
import FullscreenButton from './components/FullscreenButton';
import BasicButton from './components/BasicButton';
import SearchForm from './components/SearchForm';
import styles, { InterfaceStyles } from './styles';

export default function Citadel({ realmGroups, className, isLoaded }) {
    const [game, setGame] = useState(null);
    const [sceneCreated, setSceneCreated] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const classes = { ...styles(), ...InterfaceStyles() }
    const gameRef = useRef(null);
    const wrapperRef = useRef(null);

    const searchParcles = (id) => {
        game.scene.addSelectedParcel(+id);
    }

    const removeSelected = () => {
        game.scene.removeSelectedParcel();
        setSelectedParcel(null);
    }

    const toggleGroup = (type, isActive) => {
        game.scene.toggleGroup(type, isActive);
    };

    const basicButtons = useMemo(() => {
        return realmGroups
            .filter(group => Boolean(Object.keys(group).length) && group.parcels.length > 0)
            .map(group =>
                <BasicButton
                    settings={group}
                    handleClick={toggleGroup}
                    key={group.type}
                />
            );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realmGroups, sceneCreated]);

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
                scene: new CitadelScene({
                    onParcelSelect(id) {
                        setSelectedId(id)
                    },
                    onSceneCreated() {
                        setSceneCreated(true);
                    },
                    wrapperRef
                })
            });
        }, 100);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedId) {
            const listedGroup = realmGroups.find(group => group.type === 'listed');

            if (listedGroup !== undefined) {
                const parcel = listedGroup.parcels.find(parcel => parcel.id === selectedId);

                if (parcel) {
                    return setSelectedParcel(parcel);
                };
            };

            thegraph.getRealmById(selectedId).then(parcel => {
                setSelectedParcel(parcel);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    useEffect(() => {
        if (sceneCreated && isLoaded) {
            for (const group of realmGroups) {
                game.scene.addGroup(group);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sceneCreated, isLoaded]);

    return (
        <div ref={wrapperRef} className={classNames(className, 'citadel-wrapper')}>
            <CitadelInterface>
                <SearchForm searchParcles={searchParcles} />
                <FullscreenButton wrapperRef={wrapperRef} />
                <BasicButton
                    settings={{
                        type: 'grid',
                        tooltip: 'Districts grid',
                        icons: [<GridOnIcon />, <GridOffIcon />]
                    }}
                    handleClick={toggleGroup}
                />
                <BasicButton
                    settings={{
                        type: 'guilds',
                        tooltip: 'guilds',
                        icons: [<GridOnIcon />, <GridOffIcon />]
                    }}
                    handleClick={toggleGroup}
                />
                {basicButtons.length !== 0 && <Divider className={classes.interfaceDivider}/>}
                {basicButtons}
            </CitadelInterface>

            <IonPhaser ref={gameRef} game={game} initialize={true} className={classes.citadel} />

            <ParcelBox
                removeSelected={removeSelected}
                selectedParcel={selectedParcel}
            />

            <CitadelLoader isLoaded={isLoaded} />
        </div>
    );
}
