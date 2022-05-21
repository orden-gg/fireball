import Phaser from 'phaser';

import citadelUtils from 'utils/citadelUtils';
import guilds from 'data/guilds.json';
import parcelsData from 'data/parcels.json';
import { COLORS } from 'data/citadel.data';

export default class GuildsLogos extends Phaser.GameObjects.Container {
    constructor(scene, settings) {
        super(scene);
        scene.add.existing(this);

        this.settings = settings;

        this.show(settings.active);

        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(COLORS.logo.back, 1);
        this.graphics.setAlpha(.5);

        this.add(this.graphics);

        for (const guild of guilds) {
            if (guild.hasOwnProperty('home')) {
                this.loadImages(guild);
            }
        }

        this.scene.textures.on('addtexture', (name) => {
            const guild = guilds.find(guild => guild.name === name);
            this.addLogos(guild);
        }, this.scene);
    }

    loadImages(guild) {
        const url = require(`assets/images/guilds/${guild.logo}`).default;
        const string = '^data:';
        const regexp = new RegExp(string);

        if (!regexp.test(url)) {
            this.scene.load.image(guild.name, url);
            this.scene.load.start();
        } else {
            this.scene.textures.addBase64(guild.name, url);
        }
    }

    addLogos(guild) {
        for (const [first, second] of guild.home) {
            const { x, y, w, h } = this.calculateData(parcelsData[first], parcelsData[second]);
            const logo = this.scene.add.image(x + w / 2, y + h / 2, guild.name);
            const scale = this.getImageScale(w, h, logo.width, logo.height);

            logo.setScale(scale);
            logo.setAlpha(.6);

            this.graphics.fillRect(x, y, w, h);

            this.graphics.lineStyle(3, COLORS.logo.border, 1);
            this.graphics.strokeRect(x, y, w, h);

            this.add(logo);
        }
    }

    getImageScale(cw, ch, lw, lh) {
        const [scaleW, scaleH] = [cw / lw, ch / lh];

        if (scaleW * 100 <= scaleH * 100) {
            return scaleW * .7;
        } else {
            return scaleH * .7;
        }
    }

    getStartFrom(first, second) {
        let dir;

        if (first.coordinateY < second.coordinateY) {
            if (first.coordinateX < second.coordinateX) {
                dir = 'lt';
            } else {
                dir = 'rt'
            }
        } else {
            if (first.coordinateX < second.coordinateX) {
                dir = 'lb';
            } else {
                dir = 'rb'
            }
        }

        return dir;
    }

    calculateData(first, second) {
        const startFrom = this.getStartFrom(first, second);
        const { x: x1, y: y1 } = citadelUtils.getParcelPosition(first.coordinateX, first.coordinateY);
        const { x: x2, y: y2 } = citadelUtils.getParcelPosition(second.coordinateX, second.coordinateY);
        const { w: w1, h: h1 } = citadelUtils.getParcelSize(first.size);
        const { w: w2, h: h2 } = citadelUtils.getParcelSize(second.size);
        const w = Math.abs(x1 - x2);
        const h = Math.abs(y1 - y2);
        let data;

        switch (startFrom) {
            case 'lb':
                data = {
                    x: x1,
                    y: y1 - h,
                    w: w + w2,
                    h: h + h1
                }
                break;
            case 'rt': {
                data = {
                    x: x1 - w,
                    y: y1,
                    w: w + w1,
                    h: h + h2
                }
                break;
            }
            case 'rb':
                data = {
                    x: x1 - w,
                    y: y1 - h,
                    w: w + w1,
                    h: h + h1
                }
                break;
            default:
                data = {
                    x: x1,
                    y: y1,
                    w: w + w2,
                    h: h + h2
                };
                break;
        }

        return data;
    }

    show(isActive) {
        this.settings.active = isActive;

        if (isActive) {
            this.setAlpha(1);
        } else {
            this.setAlpha(0);
        }
    }
}
