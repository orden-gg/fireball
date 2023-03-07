// @ts-nocheck
import Phaser from 'phaser';

import { CitadelUtils } from 'utils';

import { COLORS, DISTRICTS } from 'data/citadel.data';

import { DistrictNumber } from './DistrictNumber';
import { DistrictsGrid } from './DistrictsGrid';
import { Highlight } from './Highlight';

export class DistrictsGridContainer extends Phaser.GameObjects.Container {
  constructor(scene, settings) {
    super(scene);
    scene.add.existing(this);

    this.settings = settings;

    this.TIMEOUT_SECONDS = 25;

    this.numbers = this.createGridNumbers(scene);

    this.districtHighLight = new Highlight(scene, { color: COLORS.district.hover, size: 1 });

    this.add(new DistrictsGrid(scene));
    this.add(this.districtHighLight);
    this.add(Object.entries(this.numbers).map(([, number]) => number));

    this.show(settings.active);

    scene.on('districtHover', (currentId, previousId) => {
      const current = this.numbers[currentId];
      const previous = this.numbers[previousId];

      if (previous !== undefined) {
        previous.setColor(`#${COLORS.grid.toString(16)}`);
        previous.setAlpha(this.settings.active ? 0.7 : 0);
        this.districtHighLight.setAlpha(0);
      }

      if (current !== undefined) {
        const { x, y, w, h } = CitadelUtils.getDistrictParams(currentId);

        current.setColor(`#${COLORS.district.hover.toString(16)}`);
        current.setAlpha(0.7);

        this.districtHighLight.update(x, y, w, h);

        this.addTimeout(current);
      }
    });
  }

  addTimeout(current) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (!this.settings.active) {
      this.timeout = setTimeout(() => {
        current.setAlpha(0);
      }, this.TIMEOUT_SECONDS * 1000);
    }
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
      item.setAlpha(isActive ? 0.7 : 0);
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
