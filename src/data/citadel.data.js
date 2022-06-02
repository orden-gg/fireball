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
    },
    4: {
        width: 64,
        height: 64
    },
    5: {
        width: 64,
        height: 64
    }
});
const PARCEL_NAME = Object.freeze({
    0: 'humble',
    1: 'reasonable',
    2: 'spacious',
    3: 'spacious',
    4: 'paartners',
    5: 'guardian'
});
const DISTRICTS = Object.freeze({
    length: 49,
    w: CITADEL_WIDTH/9,
    h: CITADEL_HEIGHT/6,
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
    positions: {
        '1a': {x: 3, y: 2},
        '1b': {x: 4, y: 2},
        '1c': {x: 5, y: 2},
        '1d': {x: 3, y: 3},
        '1e': {x: 4, y: 3},
        '1f': {x: 5, y: 3},
        2: {x: 2, y: 3},
        3: {x: 2, y: 2},
        4: {x: 2, y: 1},
        5: {x: 3, y: 1},
        6: {x: 4, y: 1},
        7: {x: 5, y: 1},
        8: {x: 6, y: 1},
        9: {x: 6, y: 2},
        10: {x: 6, y: 3},
        11: {x: 6, y: 4},
        12: {x: 5, y: 4},
        13: {x: 4, y: 4},
        14: {x: 3, y: 4},
        15: {x: 2, y: 4},
        16: {x: 1, y: 4},
        17: {x: 1, y: 3},
        18: {x: 1, y: 2},
        19: {x: 1, y: 1},
        20: {x: 1, y: 0},
        21: {x: 2, y: 0},
        22: {x: 3, y: 0},
        23: {x: 4, y: 0},
        24: {x: 5, y: 0},
        25: {x: 6, y: 0},
        26: {x: 7, y: 0},
        27: {x: 7, y: 1},
        28: {x: 7, y: 2},
        29: {x: 7, y: 3},
        30: {x: 7, y: 4},
        31: {x: 7, y: 5},
        32: {x: 6, y: 5},
        33: {x: 5, y: 5},
        34: {x: 4, y: 5},
        35: {x: 3, y: 5},
        36: {x: 2, y: 5},
        37: {x: 1, y: 5},
        38: {x: 0, y: 5},
        39: {x: 0, y: 4},
        40: {x: 0, y: 3},
        41: {x: 0, y: 2},
        42: {x: 0, y: 1},
        43: {x: 0, y: 0},
        44: {x: 8, y: 0},
        45: {x: 8, y: 1},
        46: {x: 8, y: 2},
        47: {x: 8, y: 3},
        48: {x: 8, y: 4},
        49: {x: 8, y: 5}
    },
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 49]
});
const COLORS = Object.freeze({
    parcels: {
        selected: 0xfd9af9,
        // humble: {sell: 0x2500c2, raffle: 0x4c75c5, void: 0x000f49},
        // reasonable: {sell: 0x016f52, raffle: 0x00a191, void: 0x002e2b},
        // spacious: {sell: 0x340055, raffle: 0x5100a2, void: 0x22003f},
        humble: {sell: 0x5033ce, raffle: 0x5033ce, void: 0x5033ce},
        reasonable: {sell: 0x328b74, raffle: 0x328b74, void: 0x328b74},
        spacious: {sell: 0x52266e, raffle: 0x52266e, void: 0x52266e},

        humble: {sell: 0x2500c2, raffle: 0x4c75c5, void: 0x000f49},
        reasonable: {sell: 0x016f52, raffle: 0x00a191, void: 0x002e2b},
        spacious: {sell: 0x340055, raffle: 0x5100a2, void: 0x22003f},
        paartners: {void: 0xbf91ff},
        guardian: {void: 0x006b80},
        owner: [0xffffff, 0xfff000],
        guild: [0xffffff, 0xfff000],
        listed: [0x78b5fe, 0x002758],
        multiselect: [0xffffff, 0xfd9af9]
    },
    // grid: 0xfd9af9,
    grid: 0xffffff,
    logo: { back: 0x000000, border: 0xfd9af9 },
    district: {
        hover: 0xffffff
    },
    alchemica: {
        // fud: 0x01ff00,
        // fomo: 0xfe1d02,
        // alpha: 0x01ffff,
        // kek: 0xee20ff,
        fud: 0x66ff65,
        fomo: 0xfe7766,
        alpha: 0x66fffe,
        kek: 0xfb95fa
    }
});

export {
    CITADEL_WIDTH,
    CITADEL_HEIGHT,
    PARCEL_SIZE,
    PARCEL_NAME,
    DISTRICTS,
    COLORS
}
