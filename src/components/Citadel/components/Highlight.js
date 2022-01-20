import Phaser from "phaser";
export default class Highlight extends Phaser.GameObjects.Rectangle {

    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.setStrokeStyle(2, 0xfd9af9);
        this.setOrigin(0, 0);
        this.setDepth(2);
    }
}