import { CITADEL_WIDTH, CITADEL_HEIGHT, PARCEL_SIZE, PARCEL_NAME, COLORS } from 'data/citadel.data'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getParcelSize(size) {
        return {
            w: PARCEL_SIZE[size].width,
            h: PARCEL_SIZE[size].height
        }
    },

    getParcelColor(type) {
        return COLORS.parcels[PARCEL_NAME[type]]
    },

    getParcelName(type) {
        return PARCEL_NAME[type];
    },

    getParcelPosition(cx, cy) {
        return {
            x: cx-CITADEL_WIDTH/2,
            y: cy-CITADEL_HEIGHT/2
        }
    }
}
