import Phaser from 'phaser';

import parcelsData from 'data/parcels.json';
import { CITADEL_WIDTH, CITADEL_HEIGHT, ZOOM, COLORS } from 'data/citadel.data';
import walls from 'assets/images/citadel/walls.svg';

import Highlight from './Highlight';
import CreateParcels from './CreateParcels';
import DistrictsGridContainer from './DistrictsGridContainer';
import GuildsLogos from './GuildsLogos';
import citadelUtils from 'utils/citadelUtils';
export default class CitadelScene extends Phaser.Scene {
        constructor({ onMultiselectChange, onParcelSelect, onSceneCreated, wrapperRef }) {
            super({ key: 'Citadel_scene' });

            this.wrapper = wrapperRef.current;

            if (this.wrapper === null) return;

            this.settings = {}

            this.onSceneCreated = onSceneCreated;
            this.onMultiselectChange = onMultiselectChange;

            this.selectedParcel = null;
            this.onParcelSelect = onParcelSelect;
            this.groups = {};
            this.multiselect = {};
        }

        preload() {
            this.load.svg('walls', walls);
        }

        create() {
            const { width: w, height: h } = this.sys.canvas;

            this.walls = this.add.image(0, 0, 'walls');

            this.parcels = new CreateParcels(this, {
                parcels: parcelsData,
                type: 'parcels',
                active: true
            });

            this.groups.grid = new DistrictsGridContainer(this, {
                type: 'grid'
            });
            this.groups.guilds = new GuildsLogos(this, {
                type: 'guilds'
            });

            this.citadel = this.addCitadel([
                this.walls,
                this.parcels,
                this.groups.guilds,
                this.groups.grid,
            ]);

            this.cameras.main.zoom = ZOOM.min * 2;

            this.scale.resize(w, h);
            this.updateZoom();

            this.onSceneCreated();

            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;

                this.settings.isDragging = true;
            });

            this.input.on('dragend', () => {
                setTimeout(() => {
                    this.settings.isDragging = false;
                }, 50);
            });

            this.scale.on('resize', () => {
                this.updateZoom();

                if (this.selectedParcel !== null) {
                    const { x, y } = this.calculateParcelCenter(this.selectedParcel);

                    this.moveToCenter(x, y);
                }
            });

            this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                const camera = this.cameras.main;

                camera.zoom = this.getCameraZoom(deltaY);

                if (!this.cursorFromCenter) {
                    this.cursorFromCenter = this.getCursorFromCenter(pointer);
                }

                if (camera.zoom <= ZOOM.min) {
                    return this.moveToCenter(camera.centerX, camera.centerY);
                }

                this.zoomToPointer(pointer);
            });

            this.input.on('pointerup', (pointer) => {
                if (this.settings.isDragging) {
                    return;
                }

                const parcel = this.getSelectedParcel(
                    this.getCursorFromCenter(pointer)
                );

                const shiftPressed = pointer.event.shiftKey;

                if (shiftPressed) {
                    return this.toggleMultiselect(parcel);
                }

                this.addSelectedParcel(parcel);
            });

            this.input.on('pointermove', pointer => {
                this.cursorFromCenter = null;
            });
        }

        addCitadel(items) {
            const citadel = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY, items);

            citadel.setSize(CITADEL_WIDTH, CITADEL_HEIGHT);
            citadel.setInteractive();

            this.input.setDraggable(citadel);
            this.input.dragDistanceThreshold = 3;

            return citadel;
        }

        addSelectedParcel(parcel) {
            if (parcel === undefined) {
                return;
            } else if (this.selectedParcel !== null) {
                this.removeSelectedParcel();
            }

            this.selectedParcel = parcel;

            const { x, y } = citadelUtils.getParcelPosition(parcel.coordinateX, parcel.coordinateY);
            const { w, h } = citadelUtils.getParcelSize(parcel.size);

            this.selected = new Highlight(this, x, y, w, h, COLORS.parcels.selected);
            this.citadel.add(this.selected);

            this.onParcelSelect(parcel.tokenId);

            this.reOrderItems();

            setTimeout(() => {
                let { x, y } = this.calculateParcelCenter(parcel);
                this.moveToCenter(x, y, 500);

                setTimeout(() => {
                    this.add.tween({
                        targets: this.cameras.main,
                        zoom: 1.1,
                        duration: 500,
                        ease: 'Power2'
                    });
                }, 0);
            }, 50);
        }

        removeSelectedParcel() {
            this.selected.remove();
            this.selectedParcel = null;
        }

        setMultiselect(ids) {
            const parcels = ids
                .filter(id => parcelsData[id] !== undefined)
                .map(id => parcelsData[id]);

            if(parcels.length === 0) {
                return;
            };

            this.groups.multiselect = new CreateParcels(this, {
                parcels: parcels,
                type: 'multiselect',
                active: true,
                animate: true
            });

            this.citadel.add(this.groups.multiselect);
            this.groups.multiselect.animate(true);
            this.fadeMap(.5);
            this.reOrderItems();
        }

        toggleMultiselect(parcel) {
            if (parcel === undefined) {
                return;
            }

            if (!this.groups.hasOwnProperty('multiselect')) {
                this.setMultiselect([parcel.tokenId]);
            } else {
                this.groups.multiselect.toggleParcel(parcel);
            }

            const ids = this.groups.multiselect.parcels.map(parcel => parcel.tokenId);

            if(ids.length === 0) {
                this.groups.multiselect.removeGroup();
                delete this.groups.multiselect;
                this.updateMapFade();
            }

            this.onMultiselectChange(ids);
        }

        addGroup(group) {
            const type = group.type;

            if (this.groups?.hasOwnProperty(type)) {
                group.active = this.groups[type].isActive;
                this.groups[type].removeGroup();
                delete this.groups[type];
            }

            if (group.parcels.length !== 0) {
                this.groups[type] = new CreateParcels(this, group);
                this.groups[type].animate(Boolean(group.animate));

                this.citadel.add(this.groups[type], 0);
            }

            this.updateMapFade();
        }

        updateZoom() {
            const { width: w, height: h } = this.sys.canvas;

            if (w/h > CITADEL_WIDTH/CITADEL_HEIGHT) {
                ZOOM.min = h/CITADEL_HEIGHT;
            } else {
                ZOOM.min = w/CITADEL_WIDTH;
            }
        }

        moveToCenter(x, y, duration) {
            if (duration) return (
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
            const p = pointer.position;
            const { centerX, centerY, zoom } = this.cameras.main;
            const offsetX = (p.x-centerX)/zoom;
            const offsetY = (p.y-centerY)/zoom;
            const [x, y] = [
                centerX+-(this.cursorFromCenter.cx)+offsetX,
                centerY+-(this.cursorFromCenter.cy)+offsetY
            ];

            this.citadel.setPosition(x, y);
        }

        toggleGroup(type, isActive) {
            const group = this.groups[type];

            group.show(isActive);

            if (group.isAnimate) {
                group.animate(isActive);
            }

            this.updateMapFade();

            this.reOrderItems();
        }

        updateMapFade() {
            const isSomeShown = Object.entries(this.groups).some(([, item]) => item.isActive);

            if (isSomeShown) {
                this.fadeMap(.5);
            } else {
                this.fadeMap(1);
            }
        }

        reOrderItems() {
            this.citadel.bringToTop(this.groups.guilds);
            this.citadel.bringToTop(this.groups.grid);
        }

        fadeMap(fade) {
            this.parcels.setAlpha(fade);
            this.walls.setAlpha(fade);
        }

        calculateParcelCenter(item) {
            const { x, y } = citadelUtils.getParcelPosition(item.coordinateX, item.coordinateY);
            const { w, h } = citadelUtils.getParcelSize(item.size);
            const { centerX, centerY } = this.cameras.main;

            return {
                x: centerX-x-w/2,
                y: centerY-y-h/2
            }
        }

        getSelectedParcel({cx, cy}) {
            let parcel;

            for (const id in parcelsData) {
                const { x, y } = citadelUtils.getParcelPosition(parcelsData[id].coordinateX, parcelsData[id].coordinateY);
                const { w, h } = citadelUtils.getParcelSize(parcelsData[id].size);
                const xRange = cx < x+w && cx > +x;
                const yRange = cy < y+h && cy > +y;

                if (xRange && yRange) {
                    parcel = parcelsData[id];

                    break;
                }
            }

            return parcel;
        }

        getCursorFromCenter(pointer) {
            return {
                cx: pointer.worldX-this.citadel.x,
                cy: pointer.worldY-this.citadel.y
            }
        }

        getCameraZoom(deltaY) {
            const { min, max } = ZOOM;

            let nextZoom = this.cameras.main.zoom+-(deltaY)*0.001;

            if (nextZoom <= min) {
                nextZoom = min;
            } else if (nextZoom >= max) {
                nextZoom = max;
            }

            return nextZoom;
        }
    }
