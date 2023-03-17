import { CITADEL_HEIGHT, CITADEL_WIDTH, COLORS, DISTRICTS, PARCEL_NAME, PARCEL_SIZE } from 'data/citadel.data';
import parcelsData from 'data/parcels.json';

export class CitadelUtils {
  public static getParcelSize(size: CustomAny): CustomAny {
    return {
      w: PARCEL_SIZE[size].width,
      h: PARCEL_SIZE[size].height
    };
  }

  public static getParcelSizeName(id: number): string {
    switch (id) {
      case 0:
        return 'humble';
      case 1:
        return 'reasonable';
      case 2: // 32x64
        return 'spacious';
      case 3: // 64x32
        return 'spacious';
      case 4:
        return 'partner';
      case 5:
        return 'guardian';
      default:
        return '';
    }
  }

  public static getParcelDimmentions(id: number): string {
    switch (id) {
      case 0:
        return '8x8';
      case 1:
        return '16x16';
      case 2:
        return '32x64';
      case 3:
        return '64x32';
      case 4:
        return '64x64';
      case 5:
        return '64x64';
      default:
        return '';
    }
  }

  public static getParcelColorBySize(size: CustomAny): CustomAny {
    return COLORS.parcels[PARCEL_NAME[size]];
  }

  public static getParcelColorByName(size: CustomAny): CustomAny {
    return PARCEL_NAME[size];
  }

  public static getParcelCoords(cx: CustomAny, cy: CustomAny): CustomAny {
    return {
      x: cx - CITADEL_WIDTH / 2,
      y: cy - CITADEL_HEIGHT / 2
    };
  }

  public static getDistrictParams(id: CustomAny): CustomAny {
    const district: CustomAny = DISTRICTS.positions[id];

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

  public static getParcelByTypeAndValue(type: CustomAny, value: CustomAny): CustomAny {
    let result: CustomAny;

    for (const [, district] of Object.entries(parcelsData)) {
      const parcel: CustomAny = district.find((parcel: CustomAny) => parcel[type] === value);

      if (parcel !== undefined) {
        result = parcel;

        break;
      }
    }

    return result;
  }

  public static getDistrictIdByCoords(cx: CustomAny, cy: CustomAny): CustomAny {
    let result: CustomAny;

    for (const id in DISTRICTS.positions) {
      const { x, y, w, h } = CitadelUtils.getDistrictParams(id) as CustomAny;

      if (cx >= x && cx <= x + w && cy >= y && cy <= y + h) {
        result = id;
        break;
      }
    }

    return result;
  }

  public static getParcedName(value: CustomAny): CustomAny {
    const splited: CustomAny = value.split(' ');

    if (splited.length > 1) {
      return splited.join('-').toLowerCase();
    } else {
      return value.toLowerCase();
    }
  }

  public static getParcelByTypeAndValueCoords(
    districtId: CustomAny,
    { cx, cy }: { cx: CustomAny; cy: CustomAny }
  ): CustomAny {
    const district: CustomAny = parcelsData[districtId] || [];

    let result: CustomAny;

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
