import Phaser from 'phaser';
import parcelsData from '../../../data/parcels.json';

import walls from '../../../assets/images/citadel/walls.svg';

import thegraph from '../../../api/thegraph';
import Parcel from './Parcel';
import Circle from './Circle';
import classNames from 'classnames';

const CITAADEL_WIDTH = 9504;
const CITAADEL_HEIGHT = 6336;

export default function CitadelScene({ setScene, setSelectedId }) {

    return class Citadel_scene extends Phaser.Scene {
        constructor() {
            super({ key: 'Citadel_scene' });

            this.wrapper = document.querySelector('.citadel-wrapper');

            this.settings = {
                highlight: true,
                zoom: {
                    min: this.wrapper.clientHeight/CITAADEL_HEIGHT,
                    max: 10
                },
                parcels: [
                    {
                        name: 'humble',
                        width: 8,
                        height: 8,
                        colors: {
                            default: 0x2500c2
                        }
                    }, {
                        name: 'reasonable',
                        width: 16,
                        height: 16,
                        colors: {
                            default: 0x016f52
                        }
                    }, {
                        name: 'spacious',
                        width: 32,
                        height: 64,
                        colors: {
                            default: 0x340055
                        }
                    }, {
                        name: 'spacious',
                        width: 64,
                        height: 32,
                        colors: {
                            default: 0x340055
                        }
                    }
                ],
                selectedParcel: [0xffffff, 0xff7fff],
            }

            this.parcelCircles = [];

            this.selectedParcel = null
        }
        preload() {
            this.load.svg('walls', walls);
        }

        init() {
            // this.cameras.main.setBackgroundColor('#24252A');
        }

        create() {

            this.container = this.addContainer();

            this.walls = this.add.image(0, 0, 'walls');
    
            this.parcels = this.createParcels();

            this.container.add(this.walls);
            this.container.add(this.parcels);

            this.cameras.main.zoom = this.settings.zoom.min * 2;

            this.input.on('pointerup', (pointer) => {
                if(this.settings.isDragging) return;
                let parcel = this.getSelectedParcel({x: pointer.worldX, y: pointer.worldY});

                if(parcel === undefined) return;
                
                if(this.selectedParcel !== null) this.selectedParcel.setStrokeStyle(0);
                this.selectedParcel = parcel;
                setSelectedId(parcel.tokenId);
                parcel.setStrokeStyle(2, 0xffffff);
                this.selectedParcel = parcel;
    
                setTimeout(() => {
                    this.moveToCenter(parcel, 500);

        
                    setTimeout( () => {
                        this.add.tween({
                            targets: this.cameras.main,
                            zoom: 1,
                            duration: 500,
                            ease: 'Power2'
                        });
                    }, 0);
                }, 50);
            });

            setScene(this);
    
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
                this.settings.isDragging = true;
            });
    
            this.input.on('dragend', () => {
                setTimeout( () => {
                    this.settings.isDragging = false;
                }, 50);
            });

            this.scale.on('resize', () => {
                this.settings.zoom.min = this.wrapper.clientHeight/CITAADEL_HEIGHT;
                if(this.selectedParcel) this.moveToCenter(this.selectedParcel);
            });
    
            this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                let pointerPos = pointer.position;

                let nextZoom = this.cameras.main.zoom+-(deltaY)*0.001;
    
                if(nextZoom <= this.settings.zoom.min) {
                    nextZoom = this.settings.zoom.min;
                    this.container.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
                }
                if(nextZoom >= this.settings.zoom.max) nextZoom = this.settings.zoom.max;
                this.cameras.main.zoom = nextZoom;
            });
        }

        addContainer() {
            let container = this.add.container();
            container.setSize(CITAADEL_WIDTH, CITAADEL_HEIGHT);
            container.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
            container.setInteractive();

            this.input.enableDebug(container);
            this.input.setDraggable(container);
            this.input.dragDistanceThreshold = 3;

            return container;
        }

        createParcels() {
            this.parcelsGroup = this.add.group();

            for(let id in parcelsData) {
                let parcelData = parcelsData[id];

                let [w, h] = this.getParcelSize(id);
                let [x, y] = this.getParcelCoordinate(id);
    
                let parcel = new Parcel(
                    this,
                    x-CITAADEL_WIDTH/2,
                    y-CITAADEL_HEIGHT/2,
                    w,
                    h,
                    this.getParcelColor(id)
                );

                parcel.tokenId = id;
                parcel.coordinateX = x;
                parcel.coordinateY = y;
    
                parcel.setOrigin(0, 0);

                this.parcelsGroup.add(parcel);
            }

            // Object.keys(parcelsData).map((id, index) => {
            //     let parcelData = parcelsData[id];

            //     let [w, h] = this.getParcelSize(id);
            //     let [x, y] = this.getParcelCoordinate(id);
    
            //     let parcel = new Parcel(
            //         this,
            //         x-CITAADEL_WIDTH/2,
            //         y-CITAADEL_HEIGHT/2,
            //         w,
            //         h,
            //         this.getParcelColor(id)
            //     );

            //     parcel.tokenId = id;
            //     parcel.coordinateX = x;
            //     parcel.coordinateY = y;
    
            //     parcel.setOrigin(0, 0);

            //     this.group.add(parcel);
    
            //     return parcel
            // });

            return this.parcelsGroup.children.entries;
        }

        addSelectedParcel(tokenId) {
            if(typeof tokenId !== 'number') {
                this.selectedParcel.setStrokeStyle(0);
                this.selectedParcel = null;
                setSelectedId(null);
            }
        }

        moveToCenter(item, duration) {
            let {x, y} = this.calculateCenter(item);

            if(duration) return (
                this.add.tween({
                    targets: this.container,
                    x: x,
                    y: y,
                    duration: duration,
                    ease: 'Power2'
                })
            )

            this.container.x = x;
            this.container.y = y
        }

        addOwnerParcels(ownerParcels) {

            this.ownerParcels = [];
            
            if(this.parcelCircles.length) {
                for(let circle of this.parcelCircles) circle.destroy();
                this.parcelCircles = [];
            }

            for(let parcel of this.parcels) {
                if(ownerParcels.find(ownerParcel => ownerParcel.tokenId === parcel.tokenId )) {
                    this.ownerParcels.push(parcel);
                    this.parcelCircles.push(
                        new Circle(
                            this,
                            parcel.x+parcel.width/2,
                            parcel.y+parcel.height/2,
                            this.getCircleRadius(parcel)
    
                        ).setStrokeStyle(3, 0xde2be8)
                    );
                }
            }

            this.container.add(this.parcelCircles);

            this.showOwnerParcels(true);

        }

        showOwnerParcels(b) {
            if(b) {
                this.parcelsGroup.setAlpha(0.5);
                this.walls.setAlpha(0.5);
                this.showCircles(true);
                for(let ownerParcel of this.ownerParcels) ownerParcel.setAlpha(1);
            } else {
                this.parcelsGroup.setAlpha(1);
                this.walls.setAlpha(1);
                this.showCircles(false);
            }
        }

        showCircles(b) {
            for(let circle of this.parcelCircles) circle.visible = b;
        }

        calculateCenter(item) {
            return {
                x: this.cameras.main.centerX-item.x-item.width/2,
                y: this.cameras.main.centerY-item.y-item.height/2
            }
        }

        getCircleRadius(parcel) {
            // switch (key) {
            //     case value:
                    
            //         break;
            
            //     default:
            //         break;
            // }
            // if(parcelsData[parcel.tokenId].size !== 3) return parcel.width/2+10;
            // else return parcel.height/2+10;
            return Math.sqrt(Math.pow(parcel.width, 2)+Math.pow(parcel.height, 2))/2+4;
        }

        // getSizeId(id) {
        //     return 
        // }

        getType(id) {
            return this.settings.parcels[parcelsData[id].size]
        }

        getParcelColor(id) {
            return this.settings.parcels[parcelsData[id].size].colors.default
        }

        getParcelCoordinate(id) {
            return [ +parcelsData[id].coordinateX, +parcelsData[id].coordinateY ]; 
        }

        getParcelSize(id) {
            return [ this.settings.parcels[parcelsData[id].size].width, this.settings.parcels[parcelsData[id].size].height ]
        }

        getSelectedParcel({x, y}) {
            let [cursorX, cursorY] = [x-this.container.x, y-this.container.y ]
            let parcel;
            this.parcels.some( item => {
                let xRange = cursorX < +item.x+item.width && cursorX > +item.x;
                let yRange = cursorY < +item.y+item.height && cursorY > +item.y;
                if (xRange && yRange) parcel = item;
            });
            return parcel;
        };

        getZoomPercent() {
            return ((this.cameras.main.zoom - this.settings.zoom.min) * 100) / (this.settings.zoom.max - this.settings.zoom.min)
        }
    }
}