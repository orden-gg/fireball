import Phaser from 'phaser';
export default class ActiveParcels extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.parcels = [];
        this.colors = [0xffffff, 0xfff000];
        this.duration = 1000;
        this.fillStyle(this.colors[0], 1);
    }

    animateParcels(isAnimate) {
        let [fromColor, toColor] = [
            Phaser.Display.Color.ValueToColor(this.colors[0]),
            Phaser.Display.Color.ValueToColor(this.colors[1])
        ];

        if (!isAnimate) {
            this.parcelsTween.stop();
            this.clear();
            return;
        }

        this.parcelsTween = this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            repeat: -1,
            yoyo: true,
            duration: this.duration,
            onUpdate: tween => {
                const value = tween.getValue();
                const color = Phaser.Display.Color.Interpolate.ColorWithColor(fromColor, toColor, 100, value);

                this.clear();
                this.fillStyle(
                    Phaser.Display.Color.GetColor(color.r, color.g, color.b),
                    1
                )
                this.updateGraphics();
            }
        });
    }

    create(parcelsData) {
        this.parcels = [];

        for(let parcel of parcelsData) {
            const { x, y, w, h } = parcel;
            this.parcels.push(parcel);
            this.fillRect(x, y, w, h);
        }

        this.animateParcels(true);
    }

    updateGraphics() {
        for(let parcel of this.parcels) {
            let {x, y, w, h} = parcel;

            this.fillRect(x, y, w, h);
        }
    }
}
