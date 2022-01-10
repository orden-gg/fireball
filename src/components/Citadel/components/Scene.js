import Phaser from 'phaser';

import parcelsData from '../../../data/parcels.json';

import walls from '../../../assets/images/citadel/walls.svg';
import Highlight from './Highlight';

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

            this.selectedParcel = null;
        }
        preload() {
            this.load.svg('walls', walls);
        }

        create() {

            this.container = this.addContainer();

            this.walls = this.add.image(0, 0, 'walls');
    
            this.citadel = this.createParcels();

            this.highlight = new Highlight(this).setStrokeStyle(2, 0xffffff).setOrigin(0, 0);
            this.highlight.setVisible(false);

            this.container.add([this.walls, this.citadel, this.highlight]);

            this.cameras.main.zoom = this.settings.zoom.min * 2;

            setScene(this);

            this.input.on('pointerup', (pointer) => {
                if(this.settings.isDragging) return;
                let parcel = this.getSelectedParcel({x: pointer.worldX, y: pointer.worldY});

                if(parcel != undefined) this.addSelectedParcel(+parcel.tokenId);
            });
    
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
            let graphics = this.add.graphics();

            for(let id in parcelsData) {
                let parcelData = parcelsData[id];

                let [w, h] = this.getParcelSize(parcelData);
                let [x, y] = this.getParcelPosition(parcelData);

                graphics.fillStyle(this.getParcelColor(parcelData), 1);
                graphics.fillRect(x,y,w,h,);
            }
            return graphics;
        }

        createOwnerParcels(parcels) {
            this.ownerParcels = this.add.graphics();

            for(let parcel of parcels) {
                let [ x, y ] = this.getParcelPosition(parcel);
                let [ w, h ] = this.getParcelSize(parcel);

                this.ownerParcels.fillStyle(this.getParcelColor(parcel), 1);
                this.ownerParcels.fillRect(x, y, w, h);

                this.ownerParcels.lineStyle(3, 0xde2be8);
                this.ownerParcels.beginPath();
                this.ownerParcels.arc(x+w/2, y+h/2, this.getCircleRadius(parcel), Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), false, 0.01);
                this.ownerParcels.strokePath();
                this.ownerParcels.closePath();
            }
        }

        addSelectedParcel(tokenId) {
            if(!parcelsData[tokenId]) return;
            if(typeof tokenId !== 'number') {
                this.highlight.setVisible(false);
                this.selectedParcel = null;
                setSelectedId(null);
            } else {
                this.selectedParcel = parcelsData[tokenId];
                setSelectedId(this.selectedParcel.tokenId);

                this.addHighlight(this.selectedParcel);
    
                setTimeout(() => {
                    this.moveToCenter(this.selectedParcel, 500);

                    setTimeout( () => {
                        this.add.tween({
                            targets: this.cameras.main,
                            zoom: 1,
                            duration: 500,
                            ease: 'Power2'
                        });
                    }, 0);
                }, 50);
            }
        }

        addHighlight(parcel) {
            let [ x, y ] = this.getParcelPosition(parcel);
            let [ w, h ] = this.getParcelSize(parcel);

            this.highlight.setVisible(true);
            this.highlight.setPosition(x, y);
            this.highlight.setSize(w, h);
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

            this.createOwnerParcels(ownerParcels);

            this.container.add(this.ownerParcels);

            this.showOwnerParcels(true);

        }
        

        showOwnerParcels(b) {
            if(b) {
                this.citadel.setAlpha(0.5);
                this.walls.setAlpha(0.5);
                this.ownerParcels.setVisible(true);
            } else {
                this.citadel.setAlpha(1);
                this.walls.setAlpha(1);
                this.ownerParcels.setVisible(false);
            }
        }

        calculateCenter(item) {
            let isParcel = !item.x;
            let [ x, y ] = isParcel ? this.getParcelPosition(item) : [ item.x, item.y ];
            let [ w, h ] = isParcel ? this.getParcelSize(item) : [ item.width, item.height ];
            return {
                x: this.cameras.main.centerX-x-w/2,
                y: this.cameras.main.centerY-y-h/2
            }
        }

        getCircleRadius(parcel) {
            let [ w, h ] = this.getParcelSize(parcel);
            return Math.sqrt(Math.pow(w, 2)+Math.pow(h, 2))/2+4;
        }

        getType(id) {
            return this.settings.parcels[parcelsData[id].size]
        }

        getParcelColor(parcel) {
            return this.settings.parcels[parcel.size].colors.default
        }

        getParcelSize(parcel) {
            return [ this.settings.parcels[parcel.size].width, this.settings.parcels[parcel.size].height ]
        }

        getSelectedParcel({x, y}) {
            let [cursorX, cursorY] = [x-this.container.x, y-this.container.y ]
            let parcel;
            for(let id in parcelsData) {

                let [ x, y ] = this.getParcelPosition(parcelsData[id]);
                let [ w, h ] = this.getParcelSize(parcelsData[id]);

                let xRange = cursorX < x+w && cursorX > +x;
                let yRange = cursorY < y+h && cursorY > +y;

                if (xRange && yRange) {
                    parcel = parcelsData[id]
                    break
                };
            }
            return parcel;
        }

        getParcelPosition(parcel) {
            return [parcel.coordinateX-CITAADEL_WIDTH/2, parcel.coordinateY-CITAADEL_HEIGHT/2];
        }

        getZoomPercent() {
            return ((this.cameras.main.zoom - this.settings.zoom.min) * 100) / (this.settings.zoom.max - this.settings.zoom.min)
        }
    }
}