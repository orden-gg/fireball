import Phaser from 'phaser';
export default class DistrictsGrid extends Phaser.GameObjects.Graphics {
    constructor(scene, settings) {
        super(scene);
        scene.add.existing(this);
        this.settings = settings;

        this.setPosition(-scene.CITAADEL_WIDTH/2, -scene.CITAADEL_HEIGHT/2);
    }

    createLines() {
        let [w, h] = [this.settings.width, this.settings.height];

        this.lineStyle(8, 0xfd9af9, .5);

        for(let line of this.settings.lineMap) {
            this.beginPath();

            this.moveTo(line[0]*w, line[1]*h);
            this.lineTo(line[2]*w, line[3]*h);

            this.closePath();
            this.strokePath();
        }
    }

}
