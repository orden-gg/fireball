import Phaser from 'phaser';

import parcelsData from 'data/parcels.json';
import { CITADEL_WIDTH, CITADEL_HEIGHT, ZOOM, COLORS } from 'data/citadel.data';
import guilds from 'data/guilds.json';
import walls from 'assets/images/citadel/walls.svg';

import Highlight from './Highlight';
import CreateParcels from './CreateParcels';
import DistrictsGridContainer from './DistrictsGridContainer';
import GuildsLogos from './GuildsLogos';
import citadelUtils from 'utils/citadelUtils';

export default class CitadelScene extends Phaser.Scene {
        constructor({ wrapperRef }) {
            super({ key: 'Citadel_scene' });

            this.wrapper = wrapperRef.current;

            this.selectedParcel = null;

            this.settings = {}
            this.districts = {};
            this.groups = {};
        }

        preload() {
            for (const guild of guilds) {
                if (guild.hasOwnProperty('home')) {
                    this.loadLogo(guild);
                }
            }

            this.load.svg('walls', walls, {
                width: CITADEL_WIDTH * 1.5,
                height: CITADEL_HEIGHT * 1.5
            });
        }

        create() {
            const { width: w, height: h } = this.sys.canvas;

            this.scale.resize(w, h);
            this.updateZoom();
            this.cameras.main.zoom = ZOOM.min * 2;

            this.walls = this.add.image(0, 0, 'walls');
            this.walls.setScale(.6666666);

            this.districtHighLight = new Highlight(this, {color: COLORS.district.hover, size: 1});
            this.selected = new Highlight(this, {color: COLORS.parcels.selected, size: 2});

            for(const key in parcelsData) {
                this.districts[key] = new CreateParcels(this, {
                    parcels: parcelsData[key],
                    type: 'parcels',
                    active: true
                });
            }

            this.groups.grid = new DistrictsGridContainer(this, {
                type: 'grid'
            });

            this.groups.guilds = new GuildsLogos(this, {
                type: 'guilds'
            });

            this.citadel = this.addCitadel();

            this.citadel.add(this.walls);
            for (const key in this.districts) {
                this.citadel.add(this.districts[key]);
            }
            this.citadel.add([this.groups.guilds, this.groups.grid, this.districtHighLight, this.selected]);

            this.trigger('created');

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

                this.trigger('zoom');

                if (camera.zoom <= ZOOM.min) {
                    this.moveToCenter(camera.centerX, camera.centerY);
                    return;
                }

                this.zoomToPointer(pointer);
            });

            this.input.on('pointerup', (pointer) => {
                if (this.settings.isDragging) {
                    return;
                }

                const parcel = citadelUtils.getParcelByCoords(
                    this.settings.district,
                    this.getCursorFromCenter(pointer)
                );

                if (parcel === undefined) {
                    return;
                }

                const shiftPressed = pointer.event.shiftKey;

                if (shiftPressed) {
                    this.toggleMultiselect(parcel);
                } else {
                    this.addSelectedParcel(parcel);
                }
            });

            this.input.on('pointermove', pointer => {
                const { cx, cy } = this.getCursorFromCenter(pointer);
                const id = citadelUtils.getDistrictIdByCoords(cx, cy);

                this.cursorFromCenter = null;

                if (id === undefined) {
                    this.districtHighLight.setAlpha(0);
                } else {
                    const { x, y, w, h } = citadelUtils.getDistrictParams(id);

                    this.districtHighLight.update(x, y, w, h);
                }

                this.settings.district = id;

            });
        }

        loadLogo(guild) {
            const url = require(`assets/images/guilds/${guild.logo}`).default;
            const string = '^data:';
            const regexp = new RegExp(string);

            if (!regexp.test(url)) {
                this.load.image(guild.name, url);
            } else {
                this.textures.addBase64(guild.name, url);
            }
        }

        addCitadel() {
            const citadel = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);

            citadel.setSize(CITADEL_WIDTH, CITADEL_HEIGHT);
            citadel.setInteractive();

            this.input.setDraggable(citadel);
            this.input.dragDistanceThreshold = 3;

            return citadel;
        }

        addSelectedParcel(data) {
            const parcel = typeof data === 'number' ? citadelUtils.getParcelById(data) : data;

            if (parcel === undefined) {
                return;
            } else if (this.selectedParcel !== null) {
                this.removeSelectedParcel();
            }

            this.selectedParcel = parcel;

            const { x, y } = citadelUtils.getParcelCoords(parcel.coordinateX, parcel.coordinateY);
            const { w, h } = citadelUtils.getParcelSize(parcel.size);

            this.selected.update(x, y, w, h);
            this.citadel.add(this.selected);

            this.trigger('parcelSelect', parcel);

            this.reOrderItems();

            setTimeout(() => {
                let { x, y } = this.calculateParcelCenter(parcel);
                this.moveToCenter(x, y, 500);

                setTimeout(() => {
                    this.add.tween({
                        targets: this.cameras.main,
                        zoom: 1.1,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            this.trigger('zoom');
                        }
                    });
                }, 0);
            }, 50);
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

        removeSelectedParcel() {
            this.selected.setAlpha(0);
            this.selectedParcel = null;
        }

        toggleMultiselect(parcel) {
            if (!this.hasOwnProperty('multiselect')) {
                this.setMultiselect([parcel.tokenId]);
            } else {
                this.multiselect.toggleParcel(parcel);
            }

            const ids = this.multiselect.parcels.map(parcel => parcel.tokenId);

            if(ids.length === 0) {
                this.multiselect.removeGroup();
                delete this.multiselect;
            }

            this.trigger('query', {
                name: 'multiselect',
                param: parcel.tokenId
            });
        }

        toggleGroup(type, isActive, load) {
            const group = this.groups[type];

            if(group === undefined) {
                return;
            }

            group.show(isActive);

            this.updateMapFade();

            this.reOrderItems();

            if(!load) {
                this.trigger('query', {
                    name: 'active',
                    param: type
                });
            }
        }

        updateZoom() {
            const { width: w, height: h } = this.sys.canvas;

            if (w / h > CITADEL_WIDTH / CITADEL_HEIGHT) {
                ZOOM.min = h / CITADEL_HEIGHT;
            } else {
                ZOOM.min = w / CITADEL_WIDTH;
            }
        }

        updateMapFade() {
            const isSomeShown = Object.entries(this.groups).some(([, item]) => item.isActive);

            if (isSomeShown) {
                this.fadeMap(.5);
            } else {
                this.fadeMap(1);
            }
        }

        moveToCenter(x, y, duration) {
            if (duration) {
                this.add.tween({
                    targets: this.citadel,
                    x: x,
                    y: y,
                    duration: duration,
                    ease: 'Power2'
                });
            } else {
                this.citadel.setPosition(x, y);
            }
        }

        zoomToPointer(pointer) {
            const p = pointer.position;
            const { centerX, centerY, zoom } = this.cameras.main;
            const offsetX = (p.x - centerX) / zoom;
            const offsetY = (p.y - centerY) / zoom;
            const [x, y] = [
                centerX + -(this.cursorFromCenter.cx) + offsetX,
                centerY + -(this.cursorFromCenter.cy) + offsetY
            ];

            this.citadel.setPosition(x, y);
        }

        fadeMap(fade) {
            for(const key in this.districts) {
                this.districts[key].setAlpha(fade);
            }

            this.walls.setAlpha(fade);
        }

        reOrderItems() {
            this.citadel.bringToTop(this.groups.guilds);
            this.citadel.bringToTop(this.groups.grid);
            this.citadel.bringToTop(this.districtHighLight);
            this.citadel.bringToTop(this.selected);
        }

        calculateParcelCenter(item) {
            const { x, y } = citadelUtils.getParcelCoords(item.coordinateX, item.coordinateY);
            const { w, h } = citadelUtils.getParcelSize(item.size);
            const { centerX, centerY } = this.cameras.main;

            return {
                x: centerX-x-w/2,
                y: centerY-y-h/2
            }
        }

        setMultiselect(ids) {
            const parcels = ids
                .map(id => citadelUtils.getParcelById(parseInt(id)))
                .filter(parcel => parcel !== undefined);

            if(parcels.length === 0) {
                return;
            };

            this.multiselect = new CreateParcels(this, {
                parcels: parcels,
                type: 'multiselect',
                active: true,
                animate: true
            });

            this.citadel.add(this.multiselect);
            this.multiselect.animate(true);
            this.reOrderItems();
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

        on(eventName, handler) {
            if (!this._eventHandlers) {
                this._eventHandlers = {};
            }
            if (!this._eventHandlers[eventName]) {
                this._eventHandlers[eventName] = [];
            }

            this._eventHandlers[eventName].push(handler);
        }

        trigger(eventName) {
            if (!this._eventHandlers || !this._eventHandlers[eventName]) {
                return;
            }

            const handlers = this._eventHandlers[eventName];

            for (let i = 0; i < handlers.length; i++) {
                handlers[i].apply(this, [].slice.call(arguments, 1));
            }
        };
    }
