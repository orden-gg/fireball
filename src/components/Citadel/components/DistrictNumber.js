import Phaser from 'phaser';

import { CITADEL_WIDTH, CITADEL_HEIGHT, COLORS } from 'data/citadel.data';
export default class DistrictNumber extends Phaser.GameObjects.Text {
    constructor(scene, number, x, y, w, h) {
        super(scene);
        scene.add.existing(this);
        this.text = number;

        const [offsetX, offsetY] = [number-1 ? w/2 : w*1.5, number-1 ? h/2 : h]

        this.setPosition(
            x*w-CITADEL_WIDTH/2+offsetX,
            y*h-CITADEL_HEIGHT/2+offsetY
        );

        this.setOrigin(.5, .5);
        this.setAlpha(.5);

        this.setStyle({
            fontSize: 125,
            color: `#${COLORS.grid.toString(16)}`
        });
    }

}
