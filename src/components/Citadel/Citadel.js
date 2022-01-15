import React, { useCallback, useEffect, useRef, useState } from 'react';

import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import CitadelScene from './components/Scene';

import styles from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField, Tooltip } from '@mui/material';

import thegraph from '../../api/thegraph';
import Parcel from '../Items/Parcel/Parcel';
import classNames from 'classnames';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';

export default function Citadel({ initialize, ownerParcels, className}) {
    const classes = styles();
    const [game, setGame] = useState(null);

    const [ selectedId, setSelectedId ] = useState(null);
    const [ selectedParcel, setSelectedParcel ] = useState(null);
    const [ scene, setScene ] = useState(null);
    const [ showOwnerParcels, setShowOwnerParcels ] = useState(true);

    const [ searchId, setSearchId ] = useState(null);

    const gameRef = useRef(null);

    const removeSelected = () => {
        scene.addSelectedParcel(false);
        setSelectedParcel(null);
    }
    
    const toggleOwnerParcels = () => {
        setShowOwnerParcels(!showOwnerParcels);
    }

    const initCitadel = () => {
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
                setScene,
                setSelectedId,
                ownerParcels
            })
        });
        
    };

    useEffect( () => {
        if(scene) scene.showOwnerParcels(showOwnerParcels);
    }, [showOwnerParcels])

    useEffect( () => {
        if(selectedId) thegraph.getRealmById(selectedId).then( (parcel) => {
            setSelectedParcel(parcel);
        });
    }, [selectedId]);

    useEffect( () => {
        // let controller = new AbortController();
        setTimeout( () => {
            if( initialize ) initCitadel();
        }, 100);
        // return () => controller?.abort(); // cleanup on destroy
    }, [ initialize ]);

    return (
        <div className={classNames(className, 'citadel-wrapper')}>
            
            <div className={classes.citadelInterface}>

                <div className={classes.citadelSearch}>
                    <TextField className={classes.citadelSearchField} placeholder="Search by id" variant="standard" onChange={ (event) => setSearchId(event.target.value) }/>
                    <IconButton onClick={ () => {scene.addSelectedParcel(+searchId)}} className={classes.citadelInterfaceButton}>
                        <SearchIcon />
                    </IconButton>
                </div>

                <Tooltip 
                    title='Select Owner parcels'
                    enterTouchDelay={0}
                    placement='left'
                >
                    <IconButton onClick={toggleOwnerParcels} className={classes.citadelInterfaceButton}>
                        { showOwnerParcels ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </Tooltip>
            </div>
            { 
                game && 
                <IonPhaser ref={gameRef} game={game} initialize={initialize} />
            }
            {
                selectedParcel &&
                <div className={classes.parcel}>
                    <Parcel parcel={selectedParcel} />

                    <IconButton className={classes.closeParcel} onClick={ removeSelected }>
                        <CloseIcon />
                    </IconButton>
                </div>
            }
        </div>
    );
}