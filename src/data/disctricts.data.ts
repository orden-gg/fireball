import DISTRICTS from './districts.json';

const DISTRICT1s = DISTRICTS.filter((district) => ['1a', '1b', '1c', '1d', '1e', '1f'].includes(district.id)).map(
  (district) => ({
    ...district,
    maxX: district.x + district.width,
    maxY: district.y + district.height
  })
);

const findDistrict = function ({ coordinateX, coordinateY, district: districtId }) {
  if (districtId === '1') {
    return DISTRICT1s.find(
      (district) =>
        coordinateX >= district.x &&
        coordinateX < district.maxX &&
        coordinateY >= district.y &&
        coordinateY < district.maxY
    );
  }
  return DISTRICTS.find((district) => district.id === districtId);
};

const gotchiverseCoordsForParcel = function (parcel) {
  const district = findDistrict(parcel);
  if (district) {
    return {
      districtId: district.id,
      x: parcel.coordinateX - district.x,
      y: parcel.coordinateY - district.y
    };
  }
  return null;
};

export { gotchiverseCoordsForParcel };
