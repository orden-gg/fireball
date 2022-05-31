const CITADEL_WIDTH = 9504;
const CITADEL_HEIGHT = 6336;
const PARCEL_SIZE = Object.freeze({
    0: {
        width: 8,
        height: 8
    },
    1: {
        width: 16,
        height: 16,
    },
    2: {
        width: 32,
        height: 64
    },
    3: {
        width: 64,
        height: 32
    }
});
const PARCEL_NAME = Object.freeze({
    0: 'humble',
    1: 'reasonable',
    2: 'spacious',
    3: 'spacious'
});
const DISTRICTS = Object.freeze({
    length: 49,
    x: 9,
    width: CITADEL_WIDTH/9,
    height: CITADEL_HEIGHT/6,
    lineMap: [
        [0, 1, 9, 1],
        [0, 2, 9, 2],
        [0, 3, 3, 3],
        [6, 3, 9, 3],
        [0, 4, 9, 4],
        [0, 5, 9, 5],
        [1, 0, 1, 6],
        [2, 0, 2, 6],
        [3, 0, 3, 6],
        [4, 0, 4, 2],
        [4, 4, 4, 6],
        [5, 0, 5, 2],
        [5, 4, 5, 6],
        [6, 0, 6, 6],
        [7, 0, 7, 6],
        [8, 0, 8, 6],
    ],
    numbersMap: [
        43, 20, 21, 22, 23, 24, 25, 26, 44,
        42, 19, 4, 5, 6, 7, 8, 27, 45,
        41, 18, 3, 1, null, null, 9, 28, 46,
        40, 17, 2, null, null, null, 10, 29, 47,
        39, 16, 15, 14, 13, 12, 11, 30, 49
    ]
});
const DISTRICTS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 39, 40, 41, 42, 43, 44, 45, 46, 47, 49];
const ZOOM = { min: .1, max: 10 };
const COLORS = Object.freeze({
    parcels: {
        selected: 0xffffff,
        humble: { default: 0x2500c2 },
        reasonable: { default: 0x016f52 },
        spacious: { default: 0x340055 },
        owner: [0xffffff, 0xfff000],
        guild: [0xffffff, 0xfff000],
        listed: [0x78b5fe, 0x002758],
        multiselect: [0xffffff, 0xfd9af9]
    },
    grid: 0xfd9af9,
    logo: { back: 0x000000, border: 0xfd9af9 }
});

export {
    CITADEL_WIDTH,
    CITADEL_HEIGHT,
    PARCEL_SIZE,
    PARCEL_NAME,
    DISTRICTS,
    DISTRICTS_NUMBERS,
    ZOOM,
    COLORS
}
