import Phaser from 'phaser';

import { COLORS, DISTRICTS } from 'data/citadel.data';

import DistrictsGrid from './DistrictsGrid';
import DistrictNumber from './DistrictNumber';

export default class DistrictsGridContainer extends Phaser.GameObjects.Container {
    constructor(scene, settings) {
        super(scene);
        scene.add.existing(this);

        this.settings = settings;

        this.numbers = this.createGridNumbers(scene);

        this.add(new DistrictsGrid(scene));
        this.add(Object.entries(this.numbers).map(([, number]) => number));

        this.show(settings.active);

        scene.on('districtHover', (current, previous) => {
            if (previous !== undefined) {
                this.numbers[previous].setColor(`#${COLORS.grid.toString(16)}`);
                this.numbers[previous].setAlpha(this.settings.active ? .7 : 0);
            }

            if (current !== undefined) {
                this.numbers[current].setColor(`#${COLORS.district.hover.toString(16)}`);
                this.numbers[current].setAlpha(.7);
            }
        });
    }

    createGridNumbers(scene) {
        const numbers = {};

        for (const id in DISTRICTS.positions) {
            numbers[id] = new DistrictNumber(scene, id);
        }

        return numbers;
    }

    show(isActive) {
        this.settings.active = isActive;

        for (const item of this.list) {
            item.setAlpha(isActive ? .7 : 0);
        }
    }

    get isActive() {
        return this.settings.active;
    }

    get type() {
        return this.settings.type;
    }

    get name() {
        return 'grid';
    }
}
