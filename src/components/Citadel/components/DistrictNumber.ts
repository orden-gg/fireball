// @ts-nocheck
import Phaser from 'phaser';

import { COLORS } from 'data/citadel.data';
import { CitadelUtils } from 'utils';

export class DistrictNumber extends Phaser.GameObjects.Text {
    constructor(scene, id) {
        const { x, y, w, h } = CitadelUtils.getDistrictParams(id);
        const [offsetX, offsetY] = [w / 2, h / 2];

        super(scene);

        scene.add.existing(this);

        this.text = id;
        this.fontSize = h / 10;
        this.startScale = 5;

        this.setPosition(
            Math.floor(x + offsetX),
            Math.floor(y + offsetY)
        );

        this.setOrigin(.5, .5);
        this.setAlpha(.7);
        this.updateScale();

        this.setStyle({
            fontSize: this.fontSize,
            fontFamily: 'Fira Code ,monospace',
            color: `#${COLORS.grid.toString(16)}`
        });

        scene.on('zoom', () => {
            this.updateScale();
        });
    }

    updateScale() {
        this.setScale(.5 / this.scene.cameras.main.zoom);

        const size = this.scale * this.fontSize;

        if (size > this.fontSize * this.startScale) {
            this.setScale(1 * this.startScale);
        }
    }
}
