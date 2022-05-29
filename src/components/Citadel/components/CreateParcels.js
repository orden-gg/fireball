import Phaser from 'phaser';

import ethersApi from 'api/ethers.api';
import citadelUtils from 'utils/citadelUtils';
import { COLORS } from 'data/citadel.data';

export default class CreateParcels extends Phaser.GameObjects.Graphics {
    constructor(scene, settings) {
        super(scene);

        scene.add.existing(this);

        this.settings = settings;
        this.duration = 1000;

        this.create(this.settings.parcels);
        this.show(settings.active);
    }

    animate(isAnimate) {
        if (this.hasOwnProperty('parcelsTween')) {
            this.parcelsTween.paused = !isAnimate;
        } else if (isAnimate) {
            const [from, to] = this.valueToColor(
                COLORS.parcels[this.settings.type][0],
                COLORS.parcels[this.settings.type][1]
            );

            this.parcelsTween = this.scene.tweens.addCounter({
                from: 0,
                to: 100,
                repeat: -1,
                yoyo: true,
                duration: this.duration,
                onUpdate: tween => {
                    const value = tween.getValue();
                    const color = this.getRangeColor(from, to, value);

                    this.clear();
                    this.fillStyle(color, 1);
                    this.updateGraphics();
                }
            });
        }
    }

    create(parcels) {
        for (const parcel of parcels) {
            this.drawParcel(parcel);
        }
    }

    drawParcel(parcel) {
        const { x, y } = citadelUtils.getParcelCoords(parcel.coordinateX, parcel.coordinateY);
        const { w, h } = citadelUtils.getParcelSize(parcel.size);

        this.fillStyle(this.getParcelColorBySize(parcel), 1);
        this.fillRect(x, y, w, h);
    }

    valueToColor(from, to) {
        return [
            Phaser.Display.Color.ValueToColor(from),
            Phaser.Display.Color.ValueToColor(to)
        ];
    }

    getParcelColorBySize(parcel) {
        if (this.settings.hasOwnProperty('range')) {
            const range = this.settings.range[citadelUtils.getParcelColorByName(parcel.size)];
            const percentage = this.getParcentage(range, ethersApi.fromWei(parcel.priceInWei));
            const [from, to] = this.valueToColor(
                COLORS.parcels[this.settings.type][0],
                COLORS.parcels[this.settings.type][1]
            );

            return this.getRangeColor(
                from,
                to,
                percentage > 100 ? 100 : percentage
            );
        } else {
            return citadelUtils.getParcelColorBySize(parcel.size)[parcel.use];
        }
    }

    getParcentage(range, price) {
        return ((price - range.min) / (range.max - range.min)) * 100;
    }

    getRangeColor(from, to, range) {
        const color = Phaser.Display.Color.Interpolate.ColorWithColor(from, to, 100, range);

        return Phaser.Display.Color.GetColor(color.r, color.g, color.b);
    }

    updateGraphics() {
        for (const parcel of this.settings.parcels) {
            const { x, y } = citadelUtils.getParcelCoords(parcel.coordinateX, parcel.coordinateY);
            const { w, h } = citadelUtils.getParcelSize(parcel.size);

            this.fillRect(x, y, w, h);
        }
    }

    removeGroup() {
        this.animate(false);
        this.destroy();
    }

    toggleParcel(parcel) {
        const parcelIndex = this.settings.parcels.findIndex(item => item.tokenId === parcel.tokenId);

        if (parcelIndex === -1) {
            this.settings.parcels.push(parcel);
        } else {
            this.settings.parcels.splice(parcelIndex, 1);
        }
    }

    show(isActive) {
        this.settings.active = isActive;

        if (isActive) {
            this.setAlpha(1);
        } else {
            this.setAlpha(0);
        }

        if (this.isAnimate) {
            this.animate(isActive);
        }
    }

    get parcels() {
        return this.settings.parcels;
    }

    get isAnimate() {
        return this.settings.animate;
    }

    get isActive() {
        return this.settings.active;
    }
}
