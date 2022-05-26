import Phaser from 'phaser';

import { DISTRICTS } from 'data/citadel.data';

import DistrictsGrid from './DistrictsGrid';
import DistrictNumber from './DistrictNumber';

export default class DistrictsGridContainer extends Phaser.GameObjects.Container {
    constructor(scene, settings) {
        super(scene);
        scene.add.existing(this);

        this.settings = settings;

        this.add([
            new DistrictsGrid(scene),
            ...this.createGridNumbers(scene)
        ]);

        this.show(settings.active);
    }

    createGridNumbers(scene) {
        const numbers = [];

        for (const id in DISTRICTS.positions) {
            numbers.push(
                new DistrictNumber(scene, id)
            );
        }

        return numbers;
    }

    show(isActive) {
        this.settings.active = isActive;

        if (isActive) {
            this.setAlpha(1)
        } else {
            this.setAlpha(0)
        }
    }
}
