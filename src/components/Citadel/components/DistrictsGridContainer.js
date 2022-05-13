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

        let [x, y] = [0, 0];

        for (const number of DISTRICTS.numbersMap) {
            if (!number) {
                ++x;
                continue
            };

            numbers.push(
                new DistrictNumber(scene, number, x, y, DISTRICTS.width, DISTRICTS.height)
            );

            if (++x % DISTRICTS.x === 0) {
                ++y;
                x = 0;
            };
        }

        return numbers;
    }

    show(isActive) {
        this.settings.active = isActive;

        isActive ? (
            this.setAlpha(1)
        ) : (
            this.setAlpha(0)
        )
    }
}
