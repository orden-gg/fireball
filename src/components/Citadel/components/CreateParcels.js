import Phaser from 'phaser';

import ethersApi from 'api/ethers.api';
import { CitadelUtils } from 'utils';
import { COLORS } from 'data/citadel.data';

export default class CreateParcels extends Phaser.GameObjects.Graphics {
    constructor(scene, settings) {
        super(scene);

        scene.add.existing(this);

        this.settings = settings;
        this.duration = 1000;

        this.create();

        this.scene.on('updateParcelsFade', () => {
            if (!this.settings.animate) {
                this.clear();
                this.create();
            }
        });
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
                    this.animateColor = this.getRangeColor(from, to, value);

                    this.clear();
                    this.create();
                }
            });
        }
    }

    create() {
        for (const parcel of this.settings.parcels) {
            this.drawParcel(parcel, this.animateColor || this.getParcelColorBySize(parcel));
        }
    }

    drawParcel(parcel, color) {
        const { x, y } = CitadelUtils.getParcelCoords(parcel.coordinateX, parcel.coordinateY);
        const { w, h } = CitadelUtils.getParcelSize(parcel.size);

        this.fillStyle(color, this.scene.filtersManager.parcelsFades[parcel.size]);
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
            const range = this.settings.range[CitadelUtils.getParcelColorByName(parcel.size)];
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
            return CitadelUtils.getParcelColorBySize(parcel.size)[parcel.use];
        }
    }

    getParcentage(range, price) {
        return ((price - range.min) / (range.max - range.min)) * 100;
    }

    getRangeColor(from, to, range) {
        const color = Phaser.Display.Color.Interpolate.ColorWithColor(from, to, 100, range);

        return Phaser.Display.Color.GetColor(color.r, color.g, color.b);
    }

    toggleParcel(parcel) {
        const parcelIndex = this.settings.parcels.findIndex(item => item.tokenId === parcel.tokenId);

        if (parcelIndex === -1) {
            this.settings.parcels.push(parcel);
        } else {
            this.settings.parcels.splice(parcelIndex, 1);
        }
    }

    updateParcels(group) {
        this.settings.parcels = group.parcels;
        this.create();
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

    get name() {
        return 'parcels';
    }

    get type() {
        return this.settings.type;
    }
}
