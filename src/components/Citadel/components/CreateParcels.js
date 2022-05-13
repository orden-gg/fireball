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
        if (Array.isArray(parcels)) {
            for(const parcel of parcels) {
                this.addParcel(parcel);
            }
        } else {
            for(const id in parcels) {
                this.addParcel(parcels[id]);
            }
        }
    }

    addParcel(parcel) {
        const { x, y } = citadelUtils.getParcelPosition(parcel.coordinateX, parcel.coordinateY);
        const { w, h } = citadelUtils.getParcelSize(parcel.size);

        this.fillStyle(this.getParcelColor(parcel), 1);
        this.fillRect(x, y, w, h);
    }

    valueToColor(from, to) {
        return [
            Phaser.Display.Color.ValueToColor(from),
            Phaser.Display.Color.ValueToColor(to)
        ];
    }

    getParcelColor(parcel) {
        if (this.settings.hasOwnProperty('range')) {
            const range = this.settings.range[citadelUtils.getParcelName(parcel.size)];
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
            return citadelUtils.getParcelColor(parcel.size).default;
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
        for(let parcel of this.settings.parcels) {
            const { x, y } = citadelUtils.getParcelPosition(+parcel.coordinateX, +parcel.coordinateY);
            const { w, h } = citadelUtils.getParcelSize(parcel.size);

            this.fillRect(x, y, w, h);
        }
    }

    updateParcels(parcels) {
        this.settings.parcels = parcels;
    }

    show(isActive) {
        this.settings.active = isActive;

        isActive ? (
            this.setAlpha(1)
        ) : (
            this.setAlpha(0)
        )
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
