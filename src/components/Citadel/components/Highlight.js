import Phaser from 'phaser';
export default class Highlight extends Phaser.GameObjects.Rectangle {
    constructor(scene, settings) {
        super(scene);

        scene.add.existing(this);

        this.settings = settings;

        this.setStrokeStyle(this.settings.size/this.scene.cameras.main.zoom, this.settings.color);
        this.setOrigin(0, 0);
        this.setAlpha(0);

        scene.on('zoom', () => this.updateStroke());
    }

    update(x, y, w, h) {
        this.setSize(w, h);
        this.setPosition(x, y);
        this.setAlpha(1);
    }

    updateStroke() {
        this.setStrokeStyle(this.settings.size/this.scene.cameras.main.zoom, this.settings.color);
    }
}
