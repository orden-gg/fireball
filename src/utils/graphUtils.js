import collaterals from 'data/collaterals';
import sets from 'data/sets';
import tokens from 'data/tokens';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    calculateRewards(position, type) {
        const BRSformula = {y: 0.94, k: 84857.04};
        const KINformula = {y: 0.76, k: 9416.93};
        const EXPformula = {y: 0.65, k: 2396.69};

        if (position > 7500 || position === -1) {
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
            default:
                return {reward: 0};
        }
    },

    getCollateralName(address) {
        const index = collaterals.findIndex(coll => coll.address === address);

        return collaterals[index]?.name;
    },

    getCollateralImg(name) {
        try {
            return require(`../assets/images/collaterals/${name.replace(/^.{2}/g, 'a')}.svg`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
        }
    },

    getTokenName(address) {
        const index = tokens.findIndex(coll => coll.address.toLowerCase() === address.toLowerCase());

        return tokens[index]?.name;
    },

    getTokenImg(name) {
        try {
            return require(`../assets/images/tokens/${name}-token.svg`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
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
    },

    isExistingSetId(id) {
        return id <= sets.length;
    }
}
