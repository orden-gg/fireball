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

export default function Citadel({ parcelsGroups, className, isLoaded }) {
    const [game, setGame] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [scene, setScene] = useState(null);
    const classes = { ...styles(), ...InterfaceStyles() }
    const gameRef = useRef(null);
    const wrapperRef = useRef(null);

    const searchParcles = (id) => {
        scene.addSelectedParcel(+id);
    }

    const removeSelected = () => {
        scene.removeSelectedParcel();
        setSelectedParcel(null);
    }

    const toggleGroup = (type, isActive) => {
        scene.toggleGroup(type, isActive);
    };

    const basicButtons = useMemo(() => {
        return parcelsGroups.map(group =>
            <BasicButton
                settings={group}
                handleClick={toggleGroup}
                key={group.type}
            />
        )
    }, [parcelsGroups, scene]);

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
                scene: CitadelScene({
                    onCreated(scene) {
                        setScene(scene)
                    },
                    onParcelSelect(id) {
                        setSelectedId(id)
                    },
                    wrapperRef
                })
            });
        }, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedId) {
            const listedGroup = parcelsGroups.find(group => group.type === 'listed');

            if (listedGroup !== undefined) {
                const parcel = listedGroup.parcels.find(parcel => parcel.id === selectedId);

                if (parcel) {
                    return setSelectedParcel(parcel);
                };
            };

            thegraph.getRealmById(selectedId).then((parcel) => {
                setSelectedParcel(parcel);
            });
        }
    }, [selectedId]);

    useEffect(() => {
        if (scene && isLoaded) {
            for (const group of parcelsGroups) {
                scene.addGroup(group);
            }
        }
    }, [scene, isLoaded]);

    return (
        <div ref={wrapperRef} className={classNames(className, 'citadel-wrapper')}>
            <CitadelInterface>
                <SearchForm searchParcles={searchParcles} />
                <FullscreenButton wrapperRef={wrapperRef} />
                <BasicButton
                    settings={{
                        type: 'grid',
                        tooltip: 'Districts grid',
                        icons: [<GridOffIcon />, <GridOnIcon />]
                    }}
                    handleClick={toggleGroup}
                />
                <Divider className={classes.interfaceDivider}/>
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
