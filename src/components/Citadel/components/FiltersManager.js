export default class FiltersManager {
    constructor(scene) {
        this.scene = scene;

        this.filters = {};

        this.groups = {
            isGroupsActive: false,
            items: []
        };

        this.parcelsFades = {
            0: 1,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1
        };

        this.groupActive = Object.entries(this.groups).some(([, item]) => item.isActive);
    }

    updateFilters(filters) {
        for (const [key, filter] of Object.entries(filters)) {
            if (this.filters.hasOwnProperty(key)) {
                const isChanged = filter.items.some((item, index) =>
                    item.isSelected !== this.filters[key].items[index].isSelected
                );

                if (isChanged) {
                    this.filters[key] = JSON.parse(JSON.stringify(filter));
                    this[`${key}Filter`]();
                }
            } else {
                this.filters[key] = JSON.parse(JSON.stringify(filter));
                this[`${key}Filter`]();
            }
        }

        this.fadeMapParts();
    }

    updateGroups(type, isActive) {
        const group = this.groups.items.find(group => group.type === type);

        if (group.isActive !== isActive) {
            group.isActive = isActive;

            this.groups.isGroupsActive = this.groups.items.some(item => item.isActive);

            if (this.groups.isGroupsActive) {
                this.fadeDistricts(.5);
            } else {
                this.districtFilter();
            }
        }

        this.fadeMapParts();
    }

    districtFilter() {
        if (this.groups.isGroupsActive) {
            return;
        }

        const filter = this.filters.district;

        for (const item of filter.items) {
            const district = this.scene.districts[item.value];

            district.setAlpha(
                filter.isFilterActive && !item.isSelected ? .5 : 1
            );
        }
    }

    sizeFilter() {
        const filter = this.filters.size;

        for (const key in this.parcelsFades) {
            if (!filter.isFilterActive) {
                this.parcelsFades[key] = 1;
                continue;
            }

            this.parcelsFades[key] = filter.items[key].isSelected ? 1 : .2;
        }

        this.scene.trigger('updateParcelsFade');
    }

    addGroup(group) {
        this.groups.items.push(group);

        if (group.isActive) {
            this.fadeDistricts(.5);
            this.groups.isGroupsActive = true;
        } else {
            this.scene.groups[group.type].show(false);
        }

        this.fadeMapParts();
    }

    fadeMapParts() {
        const number = this.groups.isGroupsActive || Object.entries(this.filters).some(([, filter]) => filter.isFilterActive) ? .5 : 1;
        this.scene.walls.setAlpha(number);

        for (const [, alchemica] of Object.entries(this.scene.alchemica)) {
            alchemica.setAlpha(number === 1 ? 1 : .25);
        }
    }

    fadeDistricts(value) {
        for (const key in this.scene.districts) {
            const district = this.scene.districts[key];

            if (district.alpha !== value) {
                district.setAlpha(value);
            }
        }
    }

    getGroup(type) {
        return this.groups.items.find(group => group.type === type);
    }

    get filteredParcels() {
        const { size, district } = this.filters;

        return district.items.reduce((prev, current) => {
            if (!district.isFilterActive || current.isSelected) {
                const parcels = this.scene.districts[current.value].parcels
                    .filter(parcel =>
                        !size.isFilterActive || size.items[parcel.size].isSelected
                    );

                return prev.concat(parcels);
            } else {
                return prev;
            }
        }, []);
    }
}
