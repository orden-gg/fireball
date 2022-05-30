import Phaser from 'phaser';

import { COLORS } from 'data/citadel.data';
import citadelUtils from 'utils/citadelUtils';
export default class DistrictNumber extends Phaser.GameObjects.Text {
    constructor(scene, id) {
        const { x, y, w, h } = citadelUtils.getDistrictParams(id);
        const [offsetX, offsetY] = [w / 2, h / 2];

        super(scene);

        scene.add.existing(this);

        this.text = id;

        this.setPosition(
            x + offsetX,
            y + offsetY
        );

        this.setOrigin(.5, .5);
        this.setAlpha(.7);

        this.setStyle({
            fontSize: this.getFontSize(),
            color: `#${COLORS.grid.toString(16)}`
        });

        scene.on('zoom', () => {
            let size = this.getFontSize();

            if (size < 25) {
                size = 25;
            } else if (size * 3 > h) {
                size = h / 3;
            }

            this.setFontSize(size);
        });
    }

    getFontSize() {
        return 35 / this.scene.cameras.main.zoom
    }
}
