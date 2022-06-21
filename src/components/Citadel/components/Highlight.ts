import Phaser from 'phaser';

export class Highlight extends Phaser.GameObjects.Rectangle {
    settings: any;

    constructor(scene: any, settings: any) {
        // @ts-ignore
        super(scene);

        scene.add.existing(this);

        this.settings = settings;

        this.setStrokeStyle(this.settings.size/this.scene.cameras.main.zoom, this.settings.color);
        this.setOrigin(0, 0);
        this.setAlpha(0);

        scene.on('zoom', () => this.updateStroke());
    }

    update(x: any, y: any, w: any, h: any): void {
        this.setSize(w, h);
        this.setPosition(x, y);
        this.setAlpha(1);
    }

    updateStroke(): void {
        this.setStrokeStyle(this.settings.size/this.scene.cameras.main.zoom, this.settings.color);
    }
}
