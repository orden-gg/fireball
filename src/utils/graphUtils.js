import { sets } from '../data/sets';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    calculateRewards(position, type) {
        const BRSformula = {y: 0.94, k: 102656.27};
        const KINformula = {y: 0.76, k: 7000.66};
        const EXPformula = {y: 0.65, k: 3703.69};

        if(position > 5000 || position === -1) {
            return {reward: 0};
        }

        switch(type) {
            case 'BRS':
                return {
                    name: type,
                    position: position + 1,
                    reward: +((Math.pow(1 / (position + 1), BRSformula.y)) * BRSformula.k).toFixed(0)
                };
            case 'KIN':
                return {
                    name: type,
                    position: position + 1,
                    reward: +((Math.pow(1 / (position + 1), KINformula.y)) * KINformula.k).toFixed(0)
                };
            case 'EXP':
                return {
                    name: type,
                    position: position + 1,
                    reward: +((Math.pow(1 / (position + 1), EXPformula.y)) * EXPformula.k).toFixed(0)
                };
            case 'H2_KIN':
                return {
                    name: type,
                    position: position + 1,
                    reward: +((Math.pow(1 / (position + 1), KINformula.y)) * KINformula.k).toFixed(0)
                };
            case 'H2_EXP':
                return {
                    name: type,
                    position: position + 1,
                    reward: +((Math.pow(1 / (position + 1), EXPformula.y)) * EXPformula.k).toFixed(0)
                };
            default:
                return {reward: 0};
        }
    },

    getCollateralName(address) {
        switch (address) {
            // haunt 1
            case '0x20d3922b4a1a8560e1ac99fba4fade0c849e2142':
                return 'maWETH';
            case '0x9719d867a500ef117cc201206b8ab51e794d3f82':
                return 'maUSDC';
            case '0xe0b22e0037b130a9f56bbb537684e6fa18192341':
                return 'maDAI';
            case '0x8c8bdbe9cee455732525086264a4bf9cf821c498':
                return 'maUNI';
            case '0x823cd4264c1b951c9209ad0deaea9988fe8429bf':
                return 'maAAVE';
            case '0xf4b8888427b00d7caf21654408b7cba2ecf4ebd9':
                return 'maTUSD';
            case '0x98ea609569bd25119707451ef982b90e3eb719cd':
                return 'maLINK';
            case '0xe20f7d1f0ec39c4d5db01f53554f2ef54c71f613':
                return 'maYFI';
            case '0xdae5f1590db13e3b40423b5b5c5fbf175515910b':
                return 'maUSDT';

            // haunt 2
            case '0x28424507fefb6f7f8e9d3860f56504e4e5f5f390':
                return 'amWETH';
            case '0x27f8d03b3a2196956ed754badc28d73be8830a6e':
                return 'amDAI';
            case '0x60d55f02a771d515e077c9c2403a1ef324885cec':
                return 'amUSDT';
            case '0x8df3aad3a84da6b69a4da8aec3ea40d9091b2ac4':
                return 'amWMATIC';
            case '0x1d2a0e5ec8e5bbdca5cb219e649b565d8e5c3360':
                return 'amAAVE';
            case '0x5c2ed810328349100a66b82b78a1791b101c9d61':
                return 'amWBTC';
            case '0x1a13f4ca1d028320a707d99520abfefca3998b7f':
                return 'amUSDC';
            default:
                return null;
        }
    },

    getCollateralImg(name) {
        try {
            return require(`../assets/collaterals/${name.replace(/^.{2}/g, 'a')}.svg`).default;
        } catch (error) {
            return require(`../assets/images/no-image2.svg`).default;
        }
    },

    getSetName(id) {
        return sets[id][0] || '';
    },

    getSetWearables(id) {
        return sets[id][2] || '';
    },

    getSetModifiers(id) {
        return sets[id][3] || '';
    }
}