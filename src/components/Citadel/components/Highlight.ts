import Phaser from 'phaser';

export class Highlight extends Phaser.GameObjects.Rectangle {
  settings: CustomAny;

  constructor(scene: CustomAny, settings: CustomAny) {
    // @ts-ignore
    super(scene);

    scene.add.existing(this);

    this.settings = settings;

    this.setStrokeStyle(this.settings.size / this.scene.cameras.main.zoom, this.settings.color);
    this.setOrigin(0, 0);
    this.setAlpha(0);

    scene.on('zoom', () => this.updateStroke());
  }

  update(x: CustomAny, y: CustomAny, w: CustomAny, h: CustomAny): void {
    this.setSize(w, h);
    this.setPosition(x, y);
    this.setAlpha(1);
  }

  updateStroke(): void {
    this.setStrokeStyle(this.settings.size / this.scene.cameras.main.zoom, this.settings.color);
  }
}
