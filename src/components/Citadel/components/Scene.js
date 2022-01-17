import Phaser from 'phaser';

import parcelsData from '../../../data/parcels.json';

import walls from '../../../assets/images/citadel/walls.svg';
import Highlight from './Highlight';
import ActiveCitcles from './activeCircles';
import ActiveParcels from './ActiveParcels';

const CITAADEL_WIDTH = 9504;
const CITAADEL_HEIGHT = 6336;

export default function CitadelScene({ setScene, setSelectedId, ownerParcels, wrapperRef }) {

    return class Citadel_scene extends Phaser.Scene {
        constructor() {
            super({ key: 'Citadel_scene' });
            this.wrapper = wrapperRef.current;

            if(this.wrapper === null) return;

            let [ w, h ] = [this.wrapper.clientWidth, this.wrapper.clientHeight]

            this.settings = {
                highlight: true,
                zoom: {
                    min: w/h > CITAADEL_WIDTH/CITAADEL_HEIGHT ? h/CITAADEL_HEIGHT : w/CITAADEL_WIDTH,
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
            this.ownerParcelsData = ownerParcels;
        }
        preload() {
            this.load.svg('walls', walls);
        }

        create() {

            this.container = this.addContainer();

            this.walls = this.add.image(0, 0, 'walls');
    
            this.citadel = this.createParcels();

            this.highlight = new Highlight(this);
            this.highlight.setVisible(false);

            this.container.add([this.walls, this.citadel, this.highlight]);

            this.cameras.main.zoom = this.settings.zoom.min * 2;

            this.scale.resize(this.wrapper.clientWidth, this.wrapper.clientHeight);

            setScene(this);

            this.input.on('pointerup', (pointer) => {
                if(this.settings.isDragging) return;
                let parcel = this.getSelectedParcel({wx: pointer.worldX, wy: pointer.worldY});

                if(parcel !== undefined) this.addSelectedParcel(+parcel.tokenId);
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
                let [ w, h ] = [ this.wrapper.clientWidth, this.wrapper.clientHeight];

                this.settings.zoom.min = w/h > CITAADEL_WIDTH/CITAADEL_HEIGHT ? h/CITAADEL_HEIGHT : w/CITAADEL_WIDTH;
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

            this.input.on('pointermove', (pointer) => {
                // console.log(pointer);
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

                let { w, h } = this.getParcelSize(parcelData);
                let { x, y } = this.getParcelPosition(parcelData);

                graphics.fillStyle(this.getParcelColor(parcelData), 1);
                graphics.fillRect(x,y,w,h);
            }
            return graphics;
        }

        createOwnerParcels() {
            this.activeParcels = new ActiveParcels(this);
            this.activeCircles = new ActiveCitcles(this);
            

            for(let parcel of this.ownerParcelsData) {
                let { x, y } = this.getParcelPosition(parcel);
                let { w, h } = this.getParcelSize(parcel);
                let color = this.getParcelColor(parcel);
                let radius = this.getCircleRadius(parcel);

                this.activeParcels.create(x, y, w, h, color);
                this.activeCircles.create(x, y, w, h, radius, 0xffffff, true);
            }

            this.activeCircles.animateCircles(0xffffff, 0xfff000, 1000);
        }

        addSelectedParcel(tokenId) {
            if(typeof tokenId !== 'number') {
                this.highlight.setVisible(false);
                this.selectedParcel = null;
                setSelectedId(null);
            } else {
                if(!parcelsData[tokenId]) return;
                this.selectedParcel = parcelsData[tokenId];
                setSelectedId(this.selectedParcel.tokenId);

                this.addHighlight(this.selectedParcel);
    
                setTimeout(() => {
                    this.moveToCenter(this.selectedParcel, 500);

                    setTimeout( () => {
                        this.add.tween({
                            targets: this.cameras.main,
                            zoom: 1.1,
                            duration: 500,
                            ease: 'Power2'
                        });
                    }, 0);
                }, 50);
            }
        }

        addHighlight(parcel) {
            let { x, y } = this.getParcelPosition(parcel);
            let { w, h } = this.getParcelSize(parcel);

            this.highlight.setVisible(true);
            this.highlight.setPosition(x, y);
            this.highlight.setSize(w, h);
        }

        moveToCenter(item, duration) {
            let { x, y } = this.calculateCenter(item);

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
            this.ownerParcelsData = ownerParcels;
            this.createOwnerParcels();

            this.container.add(this.activeParcels);
            this.container.add(this.activeCircles);

            this.showOwnerParcels(true);

        }

        showOwnerParcels(b) {

            this.activeParcels.setVisible(b);
            this.activeCircles.setVisible(b);

            if(b) {
                this.citadel.setAlpha(0.5);
                this.walls.setAlpha(0.5);
                this.activeCircles.animateCircles(0xffffff, 0xfff000, 1000);
            } else {
                this.citadel.setAlpha(1);
                this.walls.setAlpha(1);
                this.activeCircles.animateCircles(b);
            }
        }

        calculateCenter(item) {
            let isParcel = !item.x;
            let { x, y } = isParcel ? this.getParcelPosition(item) : { x: item.x, y: item.y };
            let { w, h } = isParcel ? this.getParcelSize(item) : { w: item.width, h: item.height };

            return {
                x: this.cameras.main.centerX-x-w/2,
                y: this.cameras.main.centerY-y-h/2
            }
        }

        getCircleRadius(parcel) {
            let { w, h } = this.getParcelSize(parcel);
            return Math.sqrt(Math.pow(w, 2)+Math.pow(h, 2))/2+4;
        }

        getType(id) {
            return this.settings.parcels[parcelsData[id].size]
        }

        getParcelColor(parcel) {
            return this.settings.parcels[parcel.size].colors.default
        }

        getParcelSize(parcel) {
            return {
                w: this.settings.parcels[parcel.size].width,
                h: this.settings.parcels[parcel.size].height
            }
        }

        getSelectedParcel({wx, wy}) {
            let [cursorX, cursorY] = [wx-this.container.x, wy-this.container.y ]
            let parcel;
            
            for(let id in parcelsData) {

                let { x, y } = this.getParcelPosition(parcelsData[id]);
                let { w, h } = this.getParcelSize(parcelsData[id]);

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
            return {
                x: parcel.coordinateX-CITAADEL_WIDTH/2,
                y: parcel.coordinateY-CITAADEL_HEIGHT/2
            }
        }

        getZoomPercent() {
            return ((this.cameras.main.zoom - this.settings.zoom.min) * 100) / (this.settings.zoom.max - this.settings.zoom.min)
        }
    }
}