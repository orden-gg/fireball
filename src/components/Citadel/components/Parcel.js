import Phaser from "phaser";
export default class Parcel extends Phaser.GameObjects.Rectangle {

    constructor(scene, x, y, w, h, color) {
        super(scene, x, y, w, h, color);
        scene.add.existing(this);
    }
}