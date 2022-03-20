import Phaser from 'phaser';

import parcelsData from 'data/parcels.json';
import walls from 'assets/images/citadel/walls.svg';

import Highlight from './Highlight';
import ActiveParcels from './ActiveParcels';
import DistrictsGrid from './DistrictsGrid';
import DistrictNumber from './DistrictNumber';

export default function CitadelScene({ setScene, setSelectedId, ownerParcels, wrapperRef }) {
    return class Citadel_scene extends Phaser.Scene {
        constructor() {
            super({ key: 'Citadel_scene' });

            this.CITAADEL_WIDTH = 9504;
            this.CITAADEL_HEIGHT = 6336;

            this.wrapper = wrapperRef.current;

            if(this.wrapper === null) return;

            this.settings = {
                highlight: true,
                zoom: {
                    min: .1,
                    max: 10
                },
                districts: {
                    length: 49,
                    x: 9,
                    y: 6,
                    width: this.CITAADEL_WIDTH/9,
                    height: this.CITAADEL_HEIGHT/6,
                    lineMap: [
                        [0, 1, 9, 1],
                        [0, 2, 9, 2],
                        [0, 3, 3, 3],
                        [6, 3, 9, 3],
                        [0, 4, 9, 4],
                        [0, 5, 9, 5],
                        [1, 0, 1, 6],
                        [2, 0, 2, 6],
                        [3, 0, 3, 6],
                        [4, 0, 4, 2],
                        [4, 4, 4, 6],
                        [5, 0, 5, 2],
                        [5, 4, 5, 6],
                        [6, 0, 6, 6],
                        [7, 0, 7, 6],
                        [8, 0, 8, 6],
                    ],
                    numbersMap: [
                        43, 20, 21, 22, 23, 24, 25, 26, 44,
                        42, 19, 4, 5, 6, 7, 8, 27, 45,
                        41, 18, 3, 1, null, null, 9, 28, 46,
                        40, 17, 2, null, null, null, 10, 29, 47,
                        39, 16, 15, 14, 13, 12, 11, 30, 49
                    ]
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
            this.walls = this.add.image(0, 0, 'walls');
            this.parcels = this.createParcels();
            this.activeParcels = new ActiveParcels(this);
            this.districtsGrid = new DistrictsGrid(this, this.settings.districts);

            this.citadel = this.addCitadel();
            this.citadel.add([this.walls, this.parcels, this.districtsGrid]);

            this.cameras.main.zoom = this.settings.zoom.min * 2;

            let {width, height} = this.sys.canvas;
            this.scale.resize(width, height);
            this.updateZoom();

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
                this.updateZoom();

                if(this.selectedParcel) {
                    let { x, y } = this.calculateParcelCenter(this.selectedParcel);

                    this.moveToCenter(x, y);
                }
            });

            this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                let camera = this.cameras.main;

                if(!this.cursorFromCenter) this.cursorFromCenter = this.getCursorFromCenter(pointer);

                let zoom = camera.zoom = this.getCameraZoom(deltaY);

                if(zoom <= this.settings.zoom.min) return this.moveToCenter(camera.centerX, camera.centerY);

                this.zoomToPointer(pointer);
            });

            this.input.on('pointerup', (pointer) => {
                if(this.settings.isDragging) return;

                let parcel = this.getSelectedParcel(
                    this.getCursorFromCenter(pointer)
                );

                if(parcel !== undefined) this.addSelectedParcel(+parcel.tokenId);
            });

            this.input.on('pointermove', (pointer) => {
                this.cursorFromCenter = null;
            });
        }

        addCitadel() {
            let citadel = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);

            citadel.setSize(this.CITAADEL_WIDTH, this.CITAADEL_HEIGHT);
            citadel.setInteractive();

            this.input.setDraggable(citadel);
            this.input.dragDistanceThreshold = 3;

            return citadel;
        }

        createParcels() {
            let graphics = this.add.graphics({x: -this.CITAADEL_WIDTH/2, y: -this.CITAADEL_HEIGHT/2})

            for(let id in parcelsData) {
                let parcelData = parcelsData[id];
                let { w, h } = this.getParcelSize(parcelData);

                graphics.fillStyle(this.getParcelColor(parcelData), 1);
                graphics.fillRect(+parcelData.coordinateX,+parcelData.coordinateY,w,h);
            }
            return graphics;
        }

        createOwnerParcels() {
            for(let parcel of this.ownerParcelsData) {
                let { x, y } = this.getParcelPosition(parcel);
                let { w, h } = this.getParcelSize(parcel);

                this.activeParcels.create(x, y, w, h, 0xffffff, true);
            }

            this.activeParcels.animateParcels(0xffffff, 0xfff000, 1000);

            return this.activeParcels
        }

        createGridNumbers() {
            let districts = this.settings.districts;
            let numbers = [];
            let [x, y] = [0, 0];

            for (let number of districts.numbersMap) {
                if (!number) {
                    ++x;
                    continue
                };

                numbers.push(
                    new DistrictNumber(this, number, x, y, districts.width, districts.height)
                );

                if(++x%districts.x === 0) {
                    ++y;
                    x = 0;
                };
            }

            return numbers;
        }

        addSelectedParcel(tokenId) {
            if(typeof tokenId !== 'number') {
                this.highlight.destroy();
                this.highlight = null;
                this.selectedParcel = null;
                setSelectedId(null);
            } else {
                if(!parcelsData[tokenId]) return;
                this.selectedParcel = parcelsData[tokenId];
                setSelectedId(this.selectedParcel.tokenId);

                this.addHighlight(this.selectedParcel);

                setTimeout(() => {
                    let { x, y } = this.calculateParcelCenter(this.selectedParcel);
                    this.moveToCenter(x, y, 500);

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

            if(this.highlight) this.highlight.update(x, y, w, h);

            else {
                this.highlight = new Highlight(this, x, y, w, h);
                this.citadel.add(this.highlight);
            }
        }

        addOwnerParcels(ownerParcels) {
            this.ownerParcelsData = ownerParcels;
            this.showOwnerParcels(true);
        }

        updateZoom() {
            let {width: w, height: h} = this.sys.canvas;

            if(w/h > this.CITAADEL_WIDTH/this.CITAADEL_HEIGHT) {
                this.settings.zoom.min = h/this.CITAADEL_HEIGHT;
            } else {
                this.settings.zoom.min = w/this.CITAADEL_WIDTH;
            }
        }

        moveToCenter(x, y, duration) {
            if(duration) return (
                this.add.tween({
                    targets: this.citadel,
                    x: x,
                    y: y,
                    duration: duration,
                    ease: 'Power2'
                })
            )

            this.citadel.setPosition(x, y);
        }

        zoomToPointer(pointer) {
            let p = pointer.position;
            let camera = this.cameras.main;

            let offsetX = (p.x-camera.centerX)/camera.zoom;
            let offsetY = (p.y-camera.centerY)/camera.zoom;

            this.citadel.setPosition(
                camera.centerX+-(this.cursorFromCenter.cx)+offsetX,
                camera.centerY+-(this.cursorFromCenter.cy)+offsetY
            );
        }

        showOwnerParcels(b) {
            if(b) {
                this.parcels.setAlpha(0.5);
                this.walls.setAlpha(0.5);
                this.citadel.add(this.createOwnerParcels());
            } else {
                this.parcels.setAlpha(1);
                this.walls.setAlpha(1);
                this.activeParcels.animateParcels(b);
            }
        }

        showGrid(b) {
            if(b) {
                this.districtsNumbers = this.createGridNumbers();
                this.citadel.add(this.districtsNumbers);
                this.districtsGrid.createLines();
            }
            else {
                for(let number of this.districtsNumbers) number.destroy();
                this.districtsGrid.clear();
            }
        }

        calculateParcelCenter(item) {
            let { x, y } = this.getParcelPosition(item);
            let { w, h } = this.getParcelSize(item);

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

        getSelectedParcel({cx, cy}) {
            let parcel;

            for(let id in parcelsData) {
                let { x, y } = this.getParcelPosition(parcelsData[id]);
                let { w, h } = this.getParcelSize(parcelsData[id]);

                let xRange = cx < x+w && cx > +x;
                let yRange = cy < y+h && cy > +y;

                if (xRange && yRange) {
                    parcel = parcelsData[id]
                    break
                };
            }

            return parcel;
        }

        getCursorFromCenter(pointer) {
            return {
                cx: pointer.worldX-this.citadel.x,
                cy: pointer.worldY-this.citadel.y
            }
        }

        getParcelPosition(parcel) {
            return {
                x: +parcel.coordinateX-this.CITAADEL_WIDTH/2,
                y: +parcel.coordinateY-this.CITAADEL_HEIGHT/2
            }
        }

        getZoomPercent() {
            return ((this.cameras.main.zoom - this.settings.zoom.min) * 100) / (this.settings.zoom.max - this.settings.zoom.min)
        }

        getCameraZoom(deltaY) {
            let nextZoom = this.cameras.main.zoom+-(deltaY)*0.001;
            let {min, max} = this.settings.zoom;

            if(nextZoom <= min) {
                nextZoom = min;
            }
            else if(nextZoom >= max) {
                nextZoom = max;
            }

            return nextZoom;
        }
    }
}
