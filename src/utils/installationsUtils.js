import { ethers } from 'ethers';
import { installations } from 'data/installations';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getMetadataById(id) {
        return {
            name: this.getNameById(id),
            type: this.getTypeById(id),
            level: this.getLevelById(id),
            spillRadius: this.getSpillRadiusById(id),
            spillRate: this.getSpillRateById(id),
            craftTime: this.getCraftTimeById(id),
            alchemicaCost: this.getAlchemicaCostById(id),
            cooldown: this.getCooldownByLevel(this.getLevelById(id))
        };
    },

    getNameById(id) {
        return installations[id][15];
    },

    getLevelById(id) {
        return installations[id][3];
    },

    getImageById(id) {
        try {
            return require(`../assets/images/installations/${id}.png`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
        }
    },

    getSpillRadiusById(id) {
        return installations[id][5];
    },

    getSpillRateById(id) {
        return installations[id][6];
    },

    getCraftTimeById(id) {
        return installations[id][8];
    },

    getAlchemicaCostById(id) {
        return installations[id][11].map(token => Number(ethers.utils.formatUnits(token.hex)));
    },

    getTypeById(id) {
        switch (installations[id][2]) {
            case 0:
                return 'altar';
            case 1:
                return 'harvester';
            case 2:
                return 'reservoir';
            case 3:
                return 'gotchi lodge';
            case 4:
                return 'wall';
            case 5:
                return 'NFT display';
            case 6:
                return 'buildqueue booster';
            default:
                return 'unknown';
        }
    },

    getCooldownByLevel(lvl, units) {
        const multiplier = units === 'milis' ? 3600000 : units === 'seconds' ? 3600 : 1;

        switch (lvl) {
            case 1:
                return 24 * multiplier;
            case 2:
                return 18 * multiplier;
            case 3:
                return 12 * multiplier;
            case 4:
                return 8 * multiplier;
            case 5:
                return 6 * multiplier;
            case 6:
                return 4 * multiplier;
            case 7:
                return 3 * multiplier;
            case 8:
                return 2 * multiplier;
            case 9:
                return 1 * multiplier;
            default:
                return 0;
        }
    },
}
