import Phaser from 'phaser';
import { COLORS } from 'data/citadel.data';
export default class Highlight extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, w, h) {
        super(scene);
        scene.add.existing(this);
        this.setStrokeStyle(2, COLORS.parcels.selected);
        this.setOrigin(0, 0);
        this.setSize(w, h);
        this.setPosition(x, y);
        this.setDepth(2);
    }

    update(x, y, w, h) {
        this.setSize(w, h);
        this.setPosition(x, y);
    }

    remove() {
        this.destroy();
    }
}
