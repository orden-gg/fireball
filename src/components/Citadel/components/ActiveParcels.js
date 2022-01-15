import Phaser from "phaser";
export default class ActiveParcels extends Phaser.GameObjects.Graphics {

    constructor(scene) {
        super(scene);
        scene.add.existing(this);
    }

    create(x, y, w, h, color) {
        this.fillStyle(color, 1);
        this.fillRect(x, y, w, h);
    }
    
}