import { CITADEL_WIDTH, CITADEL_HEIGHT, PARCEL_SIZE, PARCEL_NAME, COLORS, DISTRICTS } from 'data/citadel.data';
import parcelsData from 'data/parcels.json';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getParcelSize(size) {
        return {
            w: PARCEL_SIZE[size].width,
            h: PARCEL_SIZE[size].height
        }
    },

    getParcelColorBySize(size) {
        return COLORS.parcels[PARCEL_NAME[size]]
    },

    getParcelColorByName(size) {
        return PARCEL_NAME[size];
    },

    getParcelCoords(cx, cy) {
        return {
            x: cx-CITADEL_WIDTH/2,
            y: cy-CITADEL_HEIGHT/2
        }
    },

    getDistrictParams(id) {
        const district = DISTRICTS.positions[id];

        if (district === undefined) {
            return {};
        } else {
            return {
                x: district.x * DISTRICTS.w - CITADEL_WIDTH / 2,
                y: district.y * DISTRICTS.h - CITADEL_HEIGHT / 2,
                w: district.w * DISTRICTS.w || DISTRICTS.w,
                h: district.h * DISTRICTS.h || DISTRICTS.h
            }
        }
    },

    getParcelByTypeAndValue(type, value) {
        let result;

        for (const [, district] of Object.entries(parcelsData)) {
            const parcel = district.find(parcel => parcel[type] === value);

            if (parcel !== undefined) {
                result = parcel;
                break;
            }
        }

        return result;
    },

    getDistrictIdByCoords(cx, cy) {
        let result;

        for (const id in DISTRICTS.positions) {
            const { x, y, w, h } = this.getDistrictParams(id);

            if (cx >= x && cx <= x + w && cy >= y && cy <= y + h) {
                result = id;
                break;
            }
        }

        return result;
    },

    getParcedName(value) {
        const splited = value.split(' ');

        if (splited.length > 1) {
            return splited.join('-').toLowerCase();
        } else {
            return value.toLowerCase();
        }
    },

    getParcelByTypeAndValueCoords(districtId, {cx, cy}) {
        const district = parcelsData[districtId] || [];

        let result;

        for (const parcel of district) {
            const { x, y } = this.getParcelCoords(parcel.coordinateX, parcel.coordinateY);
            const { w, h } = this.getParcelSize(parcel.size);
            const xRange = cx < x + w && cx > x;
            const yRange = cy < y + h && cy > y;

            if (xRange && yRange) {
                result = parcel;

                break;
            }
        }

        return result;
    }

}
