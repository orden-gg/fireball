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
                this.create(guild);
            }
        }
    }

    create(guild) {
        const url = require(`assets/images/guilds/${guild.logo}`).default;

        this.scene.load.image(guild.name, url);
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
            for (const homeIds of guild.home) {
                this.addLogo(this.getCoords(homeIds), guild);
            }
        });

        this.scene.load.start();
    }

    addLogo(coords, guild) {
        const { x, y, w, h } = coords;
        const logo = this.scene.add.image(x+w/2, y+h/2, guild.name);
        const scale = this.getImageScale(w, h, logo.width, logo.height);


        logo.setScale(scale);
        logo.setAlpha(.6);

        this.graphics.fillRect(x, y, w, h);

        this.graphics.lineStyle(3, COLORS.logo.border, 1);
        this.graphics.strokeRect(x, y, w, h);

        this.add(logo);
    }

    getImageScale(cw, ch, lw, lh) {
        const [scaleW, scaleH] = [cw/lw, ch/lh];

        if (scaleW*100 <= scaleH*100) {
            return scaleW*.9;
        } else {
            return scaleH*.9;
        }
    }

    getCoords(ids) {
        const [parcelTop, parcelBottom] = [parcelsData[ids[0]], parcelsData[ids[1]]]
        const [topLeft, bottomRight] = [
            citadelUtils.getParcelPosition(parcelTop.coordinateX, parcelTop.coordinateY),
            citadelUtils.getParcelPosition(parcelBottom.coordinateX, parcelBottom.coordinateY)
        ]
        const { w, h} = citadelUtils.getParcelSize(parcelBottom.size);

        return {
            ...topLeft,
            w: Math.abs(topLeft.x - bottomRight.x)+w,
            h: Math.abs(topLeft.y - bottomRight.y)+h
        }
    }

    show(isActive) {
        this.settings.active = isActive;

        isActive ? (
            this.setAlpha(1)
        ) : (
            this.setAlpha(0)
        )
    }
}
