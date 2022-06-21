import Phaser from 'phaser';

import parcelsData from 'data/parcels.json';
import { CITADEL_WIDTH, CITADEL_HEIGHT, COLORS } from 'data/citadel.data';
import guilds from 'data/guilds.json';
import walls from 'assets/images/citadel/walls.svg';
import fud from 'assets/images/citadel/fud.png';
import fomo from 'assets/images/citadel/fomo.png';
import alpha from 'assets/images/citadel/alpha.png';
import kek from 'assets/images/citadel/kek.png';

import { Highlight } from './Highlight';
import { CreateParcels } from './CreateParcels';
import DistrictsGridContainer from './DistrictsGridContainer';
import GuildsLogos from './GuildsLogos';
import FiltersManager from './FiltersManager';
import { CitadelUtils } from 'utils';

export default class CitadelScene extends Phaser.Scene {
        constructor({ wrapperRef }) {
            super({ key: 'Citadel_scene' });

            this.wrapper = wrapperRef.current;

            this.selectedParcel = null;

            this.settings = {};
            this.districts = {};
            this.groups = {};
            this.filters = {};
            this.zoom = { max: 10 };

            this.filtersManager = new FiltersManager(this);
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

            this.load.image('fud', fud);
            this.load.image('fomo', fomo);
            this.load.image('alpha', alpha);
            this.load.image('kek', kek);
        }

        create() {
            const { width: w, height: h } = this.sys.canvas;

            this.scale.resize(w, h);
            this.zoom.min = this.getZoomBySize(CITADEL_WIDTH, CITADEL_HEIGHT);
            this.cameras.main.zoom = this.zoom.min * 2;

            this.walls = this.add.image(0, 0, 'walls');
            this.walls.setScale(.6666666);

            this.alchemica = {
                fud: this.add.image(0, 0, 'fud'),
                fomo: this.add.image(0, 0, 'fomo'),
                alpha: this.add.image(0, 0, 'alpha'),
                kek: this.add.image(0, 0, 'kek')
            };

            this.districtHighLight = new Highlight(this, { color: COLORS.district.hover, size: 1 });
            this.selected = new Highlight(this, { color: COLORS.parcels.selected, size: 2 });

            for (const key in parcelsData) {
                this.districts[key] = new CreateParcels(this, {
                    parcels: parcelsData[key],
                    type: 'district',
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
            for (const [key, alchemica] of Object.entries(this.alchemica)) {
                alchemica.setScale(2);
                this.citadel.add(alchemica);
                alchemica.setTintFill(COLORS.alchemica[key]);
            }
            for (const key in this.districts) {
                this.citadel.add(this.districts[key]);
            }
            this.multiselect = new CreateParcels(this, {
                parcels: [],
                type: 'multiselect',
                active: true,
                animate: true
            });
            this.citadel.add([this.groups.guilds, this.groups.grid, this.districtHighLight, this.multiselect, this.selected]);

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
                this.zoom.min = this.getZoomBySize(CITADEL_WIDTH, CITADEL_HEIGHT);

                if (this.selectedParcel !== null) {
                    const { cx, cy } = this.calculateParcelCenter(this.selectedParcel);

                    this.moveToCenter(cx, cy);
                }
            });

            /* eslint-disable @typescript-eslint/no-unused-vars */
            this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                const camera = this.cameras.main;

                camera.zoom = this.getCameraZoom(deltaY);

                if (!this.cursorFromCenter) {
                    this.cursorFromCenter = this.getCursorFromCenter(pointer);
                }

                this.trigger('zoom');

                if (camera.zoom <= this.zoom.min) {
                    this.moveToCenter(camera.centerX, camera.centerY);

                    return;
                }

                this.zoomToPointer(pointer);
            });

            this.input.on('pointerup', (pointer) => {
                if (this.settings.isDragging) {
                    return;
                }

                const parcel = CitadelUtils.getParcelByTypeAndValueCoords(
                    parseInt(this.settings.district),
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
                const id = CitadelUtils.getDistrictIdByCoords(cx, cy);

                this.cursorFromCenter = null;

                if (id !== this.settings.district) {
                    const { x, y, w, h } = CitadelUtils.getDistrictParams(id);

                    this.trigger('districtHover', id, this.settings.district);
                    this.settings.district = id;

                    this.districtHighLight.update(x, y, w, h);
                }
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

        addAlchemicaImage(name) {
            const image = this.add.image(0, 0, name);
            image.setScale(2);

            return image;
        }

        addSelectedParcel(value) {
            const parcel = this.getParcel(value);

            if (parcel === undefined) {
                return;
            } else if (this.selectedParcel !== null) {
                this.removeSelectedParcel();
            }

            this.selectedParcel = parcel;

            const { x, y } = CitadelUtils.getParcelCoords(parcel.coordinateX, parcel.coordinateY);
            const { w, h } = CitadelUtils.getParcelSize(parcel.size);

            this.selected.update(x, y, w, h);
            this.citadel.add(this.selected);

            this.reOrderItems();

            setTimeout(() => {
                const { cx, cy } = this.calculateParcelCenter(parcel);
                this.moveToCenter(cx, cy, 500);

                setTimeout(() => {
                    this.zoomTo(1.1, 500, () => {
                        this.trigger('parcelSelect', parcel);
                    });
                }, 0);
            }, 50);
        }

        addGroups(groups) {
            for (const group of groups) {
                this.addGroup(group);
            }
        }

        addGroup(group) {
            const { active, type, parcels } = group;

            if (this.groups?.hasOwnProperty(type) && parcels !== this.groups[type].parcels) {
                const isActive = this.filtersManager.getGroup(type).isActive;

                if (isActive && parcels.length === 0) {
                    this.updateGroup(type, false);
                }

                this.groups[type].updateParcels(group);

                return;
            }

            if (group.parcels.length > 0) {
                this.groups[type] = new CreateParcels(this, group);

                this.citadel.add(this.groups[type]);

                this.filtersManager.addGroup({
                    isActive: active,
                    type: type
                });
            }
        }

        removeSelectedParcel() {
            this.selected.setAlpha(0);
            this.selectedParcel = null;
        }

        toggleMultiselect(parcel) {
            this.multiselect.toggleParcel(parcel);

            this.trigger('query', {
                name: 'multiselect',
                params: this.multiselect.parcels.map(parcel => parcel.tokenId)
            });
        }

        updateGroup(type, isActive) {
            this.toggleGroup(type, isActive);

            const params = Object.entries(this.groups)
                .filter(([, group]) => group.isActive)
                .map(([, group]) => group.type);

            this.trigger('query', {
                name: 'active',
                params: params
            });
        }

        toggleGroup(type, isActive) {
            const group = this.groups[type];

            if (group !== undefined) {
                if (group.name === 'parcels') {
                    this.filtersManager.updateGroups(type, group.parcels.length !== 0 && isActive);
                    group.show(group.parcels.length !== 0 && isActive);
                } else {
                    group.show(isActive);
                }

                this.reOrderItems();
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

        zoomTo(scale, duration, onComplete) {
            this.add.tween({
                targets: this.cameras.main,
                zoom: scale,
                duration: duration,
                ease: 'Power2',
                onUpdate: () => {
                    this.trigger('zoom');
                },
                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            });
        }

        zoomToPointer(pointer) {
            const { x, y } = pointer.position;
            const { centerX, centerY, zoom } = this.cameras.main;
            const offsetX = (x - centerX) / zoom;
            const offsetY = (y - centerY) / zoom;
            const [cx, cy] = [
                centerX + -(this.cursorFromCenter.cx) + offsetX,
                centerY + -(this.cursorFromCenter.cy) + offsetY
            ];

            this.citadel.setPosition(cx, cy);
        }

        zoomToDistrict(id) {
            const { x, y, w, h } = CitadelUtils.getDistrictParams(id);
            const { cx, cy } = this.calculateCenter({ x, y, w, h });

            if (isNaN(cx) || isNaN(cy)) {
                return;
            }

            this.moveToCenter(cx , cy, 500);
            this.zoomTo(this.getZoomBySize(w, h) * .9, 500);
            this.districtHighLight.update(x, y, w, h);
            this.trigger('districtHover', id, this.settings.district);
            this.settings.district = id;
        }

        reOrderItems() {
            this.citadel.bringToTop(this.multiselect);
            this.citadel.bringToTop(this.selected);
            this.citadel.bringToTop(this.groups.guilds);
            this.citadel.bringToTop(this.groups.grid);
            this.citadel.bringToTop(this.districtHighLight);
        }

        find(type, value) {
            if (type === 'parcel') {
                this.addSelectedParcel(value);
            } else {
                this.zoomToDistrict(value);
            }
        }

        calculateParcelCenter(parcel) {
            const params = {
                ...CitadelUtils.getParcelCoords(parcel.coordinateX, parcel.coordinateY),
                ...CitadelUtils.getParcelSize(parcel.size)
            };

            return this.calculateCenter(params);
        }

        calculateCenter({ x, y, w, h }) {
            const { centerX, centerY } = this.cameras.main;

            return {
                cx: centerX - x - w / 2,
                cy: centerY - y - h / 2
            };
        }

        setMultiselect(ids) {
            const parcels = ids
                .map(id => CitadelUtils.getParcelByTypeAndValue('tokenId', id))
                .filter(parcel => parcel !== undefined);

            if (parcels.length === 0) {
                return;
            }

            for (const parcel of parcels) {
                this.multiselect.toggleParcel(parcel);
            }

            this.multiselect.animate(true);

            this.reOrderItems();
        }

        getZoomBySize(w, h) {
            const { width, height } = this.sys.canvas;

            if (width / height > w / h) {
                return height / h;
            } else {
                return width / w;
            }
        }

        getParcel(value) {
            if (typeof value === 'object') {
                return value;
            } else if (isNaN(parseInt(value))) {
                return CitadelUtils.getParcelByTypeAndValue('parcelHash', CitadelUtils.getParcedName(value));
            } else {
                return CitadelUtils.getParcelByTypeAndValue('tokenId', value);
            }
        }

        getCursorFromCenter(pointer) {
            return {
                cx: pointer.worldX-this.citadel.x,
                cy: pointer.worldY-this.citadel.y
            };
        }

        getCameraZoom(deltaY) {
            const { min, max } = this.zoom;

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
        }
    }
