import Phaser from 'phaser';
export default class Highlight extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, w, h, color) {
        super(scene);
        scene.add.existing(this);
        this.setStrokeStyle(2, color);
        this.setOrigin(0, 0);
        this.setSize(w, h);
        this.setPosition(x, y);
    }

    update(x, y, w, h) {
        this.setSize(w, h);
        this.setPosition(x, y);
    }

    remove() {
        this.destroy();
    }
}
