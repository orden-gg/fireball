import Phaser from "phaser";
export default class Highlight extends Phaser.GameObjects.Rectangle {

    constructor(scene) {
        super(scene);
        scene.add.existing(this);
    }
}