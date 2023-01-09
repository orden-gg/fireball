import { CITADEL_WIDTH, CITADEL_HEIGHT, PARCEL_SIZE, PARCEL_NAME, COLORS, DISTRICTS } from 'data/citadel.data';
import parcelsData from 'data/parcels.json';

export class CitadelUtils {
    public static getParcelSize(size: any): any {
        return {
            w: PARCEL_SIZE[size].width,
            h: PARCEL_SIZE[size].height
        };
    }

    public static getParcelSizeName(id: any): any {
        switch (id.toString()) {
            case '0':
                return 'humble';
            case '1':
                return 'reasonable';
            case '2': // 32x64
                return 'spacious';
            case '3': // 64x32
                return 'spacious';
            case '4':
                return 'partner';
            case '5':
                return 'guardian';
            default:
                return '';
        }
    }

    public static getParcelDimmentions(id: any): any {
        switch (id.toString()) {
            case '0':
                return '8x8';
            case '1':
                return '16x16';
            case '2':
                return '32x64';
            case '3':
                return '64x32';
            case '4':
                return '64x64';
            case '5':
                return '64x64';
            default:
                return '';
        }
    }

    public static getParcelColorBySize(size: any): any {
        return COLORS.parcels[PARCEL_NAME[size]];
    }

    public static getParcelColorByName(size: any): any {
        return PARCEL_NAME[size];
    }

    public static getParcelCoords(cx: any, cy: any): any {
        return {
            x: cx - CITADEL_WIDTH / 2,
            y: cy - CITADEL_HEIGHT / 2
        };
    }

    public static getDistrictParams(id: any): any {
        const district: any = DISTRICTS.positions[id];

        if (district === undefined) {
            return {};
        } else {
            return {
                x: district.x * DISTRICTS.w - CITADEL_WIDTH / 2,
                y: district.y * DISTRICTS.h - CITADEL_HEIGHT / 2,
                w: DISTRICTS.w,
                h: DISTRICTS.h
            };
        }
    }

    public static getParcelByTypeAndValue(type: any, value: any): any {
        let result: any;

        for (const [, district] of Object.entries(parcelsData)) {
            const parcel: any = district.find((parcel: any) => parcel[type] === value);

            if (parcel !== undefined) {
                result = parcel;

                break;
            }
        }

        return result;
    }

    public static getDistrictIdByCoords(cx: any, cy: any): any {
        let result: any;

        for (const id in DISTRICTS.positions) {
            const { x, y, w, h } = CitadelUtils.getDistrictParams(id) as any;

            if (cx >= x && cx <= x + w && cy >= y && cy <= y + h) {
                result = id;
                break;
            }
        }

        return result;
    }

    public static getParcedName(value: any): any {
        const splited: any = value.split(' ');

        if (splited.length > 1) {
            return splited.join('-').toLowerCase();
        } else {
            return value.toLowerCase();
        }
    }

    public static getParcelByTypeAndValueCoords(districtId: any, { cx, cy }: { cx: any; cy: any }): any {
        const district: any = parcelsData[districtId] || [];

        let result: any;

        for (const parcel of district) {
            const { x, y } = CitadelUtils.getParcelCoords(parcel.coordinateX, parcel.coordinateY);
            const { w, h } = CitadelUtils.getParcelSize(parcel.size);
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
