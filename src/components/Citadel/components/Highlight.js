import Phaser from 'phaser';
export default class Highlight extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, w, h) {
        super(scene);
        scene.add.existing(this);
        this.setStrokeStyle(2, 0xfd9af9);
        this.setOrigin(0, 0);
        this.setSize(w, h);
        this.setPosition(x, y);
        this.setDepth(2);
    }

    update(x, y, w, h) {
        this.setSize(w, h);
        this.setPosition(x, y);
    }
}
