import React, { useEffect, useRef, useState } from 'react';

import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';

import parselsData from '../../data/parcels.json';

import walls from '../../assets/images/citadel/walls.svg';
import useInterval from '../../hooks/useInterval';
import styles from './styles';
import { Typography } from '@mui/material';
// console.log(parsels);

import commonUitls from '../../utils/commonUtils';
import thegraph from '../../api/thegraph';

const CITAADEL_WIDTH = 9504;
const CITAADEL_HEIGHT = 6336;

export default function Citadel({ initialize, setInitialize}) {
    const classes = styles();
    const [game, setGame] = useState(null);

    const [ selectedParsel, setSelectedParsel ] = useState(null);
    const [ currentOwner, setCurrentOwner] = useState(null);

    const gameRef = useRef(null);

    const destroy = () => {
		if (gameRef.current) gameRef.current.destroy();
		setInitialize(false)
    }

    const getParselCenter = (parsel) => {
        console.log(parsel);
    }

    // const handleParsel = (prevParsel, parsel, id) => {
        // if(prevParsel !== null) {
        //     prevParsel.setStrokeStyle(0);
        // }
        // console.log(setSelectedParsel);
        // setSelectedParsel(parsel);
        // parsel.setStrokeStyle(2, 0xffffff);
    // }

    const calculateParselCenter = (parsel, offset) => {
        console.log(parsel);
        return {
            x: CITAADEL_WIDTH/2-+parsel.coordinateX+offset.x-parsel.width/2,
            y: CITAADEL_HEIGHT/2-+parsel.coordinateY+offset.y-parsel.height/2
        }
    }

    const createMap = function() {

        let colors = {
            humble: 0x2500c2,
            reasonable: 0x016f52,
            spacious: 0x340055,
            selectedParsel: [0xffffff, 0xff7fff]
        }


        this.offset = {
            x: CITAADEL_WIDTH*.05,
            y: CITAADEL_HEIGHT*.05
        }

        this.zoom = {
            max: 10,
            min: .15
        }

        this.selectedParsel = null;

        // this.parsels = [];
        // this.graphics = this.add.graphics();

        // this.graphics.anchor.x = 0;
        this.container = this.add.container(this.offset.x, this.offset.y);

        this.parsels = Object.keys(parselsData).map((id, index) => {
            let parselData = parselsData[id];

            // this.graphics.fillStyle(colors[parselData.sizeLabel], 1);


            // let parsel = this.graphics.fillRect(
            // 	+parselData.coordinateX-CITAADEL_WIDTH/2,
            // 	+parselData.coordinateY-CITAADEL_HEIGHT/2,
            // 	parselData.width,
            // 	parselData.height,
            // );

            let parsel = this.add.rectangle(
                +parselData.coordinateX-CITAADEL_WIDTH/2,
                // +parselData.coordinateX,
                +parselData.coordinateY-CITAADEL_HEIGHT/2,
                // +parselData.coordinateY,
                parselData.width,
                parselData.height,
                colors[parselData.sizeLabel]
            );

            parsel.setInteractive();
            parsel.name = 'parsel';
            parsel.id = id;
            parsel.coordinateX = parselData.coordinateX;
            parsel.coordinateY = parselData.coordinateY;

            // parsel.on('pointerup', (pointer) => {
            //     if(this.selectedParsel !== null) this.selectedParsel.setStrokeStyle(0, 0xffffff);
            //     this.selectedParsel = parsel;
            //     setSelectedParsel(parselData);
            //     parsel.setStrokeStyle(2, 0xffffff);
            //     this.selectedParsel = parsel;
            // });

            // console.log(item);

                // if(!item.length) return;
                // console.log(item[0].list.find(item => item.type === 'Graphics'));
            // })

            parsel.setOrigin(0, 0);

            return parsel
        });

        // for (let key in parselsData) {
        // 	let parselData = parselsData[key];

        //     parsel.name = +parselData.id;


        //     // parsel.emit('pointerdown');
        // }

        this.walls = this.add.image(0, 0, 'walls');

        this.container.add(this.walls);
        this.container.add(this.parsels);

        this.container.setSize(CITAADEL_WIDTH, CITAADEL_HEIGHT);

        this.container.setInteractive();

        this.input.enableDebug(this.container);

        // this.container.backgroundColor = '#000000';

        this.input.setDraggable(this.container);

        // this.input.on('pointerdown', (pointer) => {
        //     this.pointerStart = {...pointer.position};
        //     this.containerPrev = {
        //         x: this.container.x,
        //         y: this.container.y
        //     };
        //     this.pointerPrev = false;
        //     this.pointerDown = true;
        // });

        // this.input.on('pointermove', (pointer) => {
        //     if(this.pointerDown) {

        //         if(this.pointerPrev) {
        //             this.container.x = (this.containerPrev.x + this.pointerPrev.x - this.pointerStart.x)/this.cameras.main.zoom;
        //             this.container.y = (this.containerPrev.y + this.pointerPrev.y - this.pointerStart.y)/this.cameras.main.zoom;
        //         }
        //         this.pointerPrev = {...pointer.position};
        //     }
        // })


        this.input.on('pointerup', (pointer, items) => {
            let parsel = items.find(item => item.name === 'parsel');

            if(parsel === undefined) return;
            
            if(this.selectedParsel !== null) this.selectedParsel.setStrokeStyle(0, 0xffffff);
            this.selectedParsel = parsel;
            setSelectedParsel(parselsData[parsel.id]);
            parsel.setStrokeStyle(2, 0xffffff);
            this.selectedParsel = parsel;

            // let parselCenter = getParselCenter(parsel);

            // console.log((CITAADEL_WIDTH/2-+parsel.coordinateX)*this.cameras.main.zoom);

            let {x, y} = calculateParselCenter(parsel, this.offset)

            setTimeout(() => {
                this.add.tween({
                    targets: this.container,
                    x: x,
                    y: y,
                    duration: 500,
                    ease: 'Power2'
                });
                
    
                this.add.tween({
                    targets: this.cameras.main,
                    zoom: 1,
                    duration: 500,
                    ease: 'Power2'
                });
            }, 25);

            // console.log(this.game.add);
        });


        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // this.input.on('dragend', () => {
        //     console.log('drag end');
        // });

        this.cameras.main.zoom = .15;

        // console.log(this.cameras.main.setOrigin(.56, .55));


        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            let pointerPos = pointer.position;

            // soil.tilePositionX += deltaX * 0.5;
            // soil.tilePositionY += deltaY * 0.5;

            let nextZoom = this.cameras.main.zoom+deltaY*0.001;

            if(nextZoom <= this.zoom.min) nextZoom = this.zoom.min;
            else if(nextZoom >= this.zoom.max) nextZoom = this.zoom.max;

            this.cameras.main.zoom = nextZoom;


            // this.cameras.main.setOrigin(pointerPos.x/this.cameras.main.width, pointerPos.y/this.cameras.main.height);

        });
    

    };

    useEffect( () => {
        // if(selectedParsel) thegraph.getRealmById(selectedParsel?.id).then( (owner) => {
        //     console.log(owner);
        // })
    }, [selectedParsel])

    useEffect( () => {
        setGame({
            width: '100%',
            // width: CITAADEL_WIDTH/10,
            // height: CITAADEL_HEIGHT/10,
            mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
            },
            scene: {
    
                preload: function() {
                    this.load.svg('walls', walls);
                },
    
                init: function() {
                    // this.load.svg('walls', walls);
                    this.cameras.main.setBackgroundColor('#24252A')
                },
    
                create: createMap,
                update: function() {
                    // this.helloWorld.angle += 1;
                }
            }
        });
    }, [])

    return (
        <div className={classes.citadel}>
            { game && <IonPhaser ref={gameRef} game={game} initialize={initialize} />}
            {
                selectedParsel &&
                <div className={classes.parsel}>
                    <Typography>
                        {selectedParsel.parcelHash}
                    </Typography>
                    {
                        currentOwner &&
                        <Typography>
                            {commonUitls.cutAddress(currentOwner)}
                        </Typography>
                    }
                </div>
            }
        </div>
    );
}