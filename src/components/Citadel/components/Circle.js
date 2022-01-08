import Phaser from "phaser";
export default class Parcel extends Phaser.GameObjects.Arc {

    constructor(scene, x, y, radius) {
        super(scene, x, y, radius, 0, 360, false);
        scene.add.existing(this);
    }
}