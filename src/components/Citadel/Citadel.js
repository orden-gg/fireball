import React, { useEffect, useRef, useState } from 'react';

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
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';

import useFullscreenStatus from '../../hooks/useFullscreenStatus';

import CitadelLoading from '../../assets/gotchiverse-icon.gif';

export default function Citadel({ ownerParcels, className}) {
    const classes = styles();
    const [game, setGame] = useState(null);

    const [ selectedId, setSelectedId ] = useState(null);
    const [ selectedParcel, setSelectedParcel ] = useState(null);
    const [ scene, setScene ] = useState(null);
    const [ mapCreated, setMapCreated ] = useState(false);

    const [ showOwnerParcels, setShowOwnerParcels ] = useState(true);
    const [ searchId, setSearchId ] = useState(null);
    const [ showGrid, setShowGrid ] = useState(false);

    const gameRef = useRef(null);
    const wrapperRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useFullscreenStatus(wrapperRef);

    const removeSelected = () => {
        scene.addSelectedParcel(false);
        setSelectedParcel(null);
    }
    
    const toggleOwnerParcels = () => {
        setShowOwnerParcels(!showOwnerParcels);
        scene.showOwnerParcels(!showOwnerParcels);
    }

    const toggleFullscreen = () => {
        isFullscreen ? document.exitFullscreen() : setIsFullscreen();
    }

    const toggleGrid = () => {
        setShowGrid(!showGrid);
        scene.showGrid(!showGrid);
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
                wrapperRef
            })
        });
        
    };

    useEffect( () => {
        setTimeout( () => {
            initCitadel();
        }, 100);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect( () => {
        if(selectedId) thegraph.getRealmById(selectedId).then( (parcel) => {
            setSelectedParcel(parcel);
        });
        
    }, [selectedId]);

    useEffect( () => {
        if( ownerParcels.length && scene) {
            scene.addOwnerParcels(ownerParcels);
            setMapCreated(true);
        }
    }, [ ownerParcels, scene ]);

    return (
        <div ref={wrapperRef} className={classNames(className, 'citadel-wrapper')}>
            
            <div className={classNames(classes.citadelInterface, 'citadel-interface')}>

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

               {
                    isFullscreen !== null &&
                    <Tooltip
                        title={ isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                        enterTouchDelay={0}
                        placement='left'
                    >
                        <IconButton onClick={toggleFullscreen} className={classes.citadelInterfaceButton}>
                            { isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon /> }
                        </IconButton>
                    </Tooltip>
                }

                <Tooltip 
                    title={ showGrid ? 'Hide Grid' : 'Show Grid' }
                    enterTouchDelay={0}
                    placement='left'
                >
                    <IconButton onClick={toggleGrid} className={classes.citadelInterfaceButton}>
                        { showGrid ? <GridOnIcon /> : <GridOffIcon /> }
                    </IconButton>
                </Tooltip>
            </div>

            <IonPhaser ref={gameRef} game={game} initialize={true} />

            {
                selectedParcel && (
                    <div className={classes.parcel}>
                        <Parcel parcel={selectedParcel} />

                        <IconButton className={classes.closeParcel} onClick={ removeSelected }>
                            <CloseIcon />
                        </IconButton>
                    </div>
                )
                
            }

            <div className={classNames(classes.citadelLoading, mapCreated && 'is-loaded')}>
                <span className={classes.citadelLoadingLine}></span>
                <span className={classes.citadelLoadingLine}></span>
                <span className={classes.citadelLoadingLine}></span>
                <div className={classes.citadelLoadingInner}>
                    <img src={CitadelLoading} alt='Citadel loader' className={classes.citadelLoadingIcon} />
                </div>
            </div>
        </div>
    );
}