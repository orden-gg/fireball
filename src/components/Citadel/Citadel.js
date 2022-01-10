import React, { useCallback, useEffect, useRef, useState } from 'react';

import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import CitadelScene from './components/Scene';

import styles from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';

import thegraph from '../../api/thegraph';
import Parcel from '../Items/Parcel/Parcel';
import classNames from 'classnames';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// import parcelsData from '../../data/parcels.json';

export default function Citadel({ initialize, setInitialize, ownerParcels}) {
    const classes = styles();
    const [game, setGame] = useState(null);

    const [ selectedId, setSelectedId ] = useState(null);
    const [ selectedParcel, setSelectedParcel ] = useState(null);
    const [ scene, setScene ] = useState(null);
    const [ showOwnerParcels, setShowOwnerParcels ] = useState(true);

    const gameRef = useRef(null);

    const destroy = () => {
		if (gameRef.current) gameRef.current.destroy();
		setInitialize(false)
    }

    const removeSelected = () => {
        scene.addSelectedParcel(false);
        setSelectedParcel(null);
    }
    
    const toggleOwnerParcels = () => {
        setShowOwnerParcels(!showOwnerParcels);
    }

    useEffect( () => {
        if(scene) scene.showOwnerParcels(showOwnerParcels);
    }, [showOwnerParcels])

    useEffect( () => {
        if(selectedId) thegraph.getRealmById(selectedId).then( (parcel) => {
            setSelectedParcel(parcel);
        });
    }, [selectedId]);

    const initCitadel = useCallback( () => {
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
                setSelectedId
            })
        });
        
    }, [game, setScene] );

    useEffect( () => {
        if(scene !== null && ownerParcels.length) scene.addOwnerParcels(ownerParcels);
    }, [scene])

    useEffect( () => {

        // let obj = {};
        // let keyse = Object.keys(parcelsData);
        
        // for(let key of keyse) {
        //     obj[key] = {
        //         tokenId: key,
        //         size: parcelsData[key].size,
        //         coordinateX: parcelsData[key].coordinateX,
        //         coordinateY: parcelsData[key].coordinateY
        //     }
        // }
        // console.log(JSON.stringify(obj));
        initCitadel();
    }, []);

    return (
        <div className={classNames(classes.citadel, 'citadel-wrapper')}>
            
            <div className={classes.citadelInterface}>

            <Tooltip 
                title='Select Owner parcels'
                // classes={{ tooltip: classes.customTooltip }} 
                enterTouchDelay={0}
                placement='left'
            >
                <IconButton onClick={toggleOwnerParcels}>
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