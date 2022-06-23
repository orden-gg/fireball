import installations from 'data/installations.data';
import { InstallationTypeNames, InstallationTypes } from 'data/types';

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
            cooldown: this.getCooldownByLevel(this.getLevelById(id)),
            deprecated: this.getDeprecatedById(id)
        };
    },

    getNameById(id) {
        return installations[id][InstallationTypes.Name];
    },

    getLevelById(id) {
        return installations[id][InstallationTypes.Level];
    },

    getImageById(id) {
        try {
            return require(`../assets/images/installations/${id}.png`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    },

    getSpillRadiusById(id) {
        return installations[id][InstallationTypes.SpillRadius];
    },

    getSpillRateById(id) {
        return installations[id][InstallationTypes.SpillRate];
    },

    getCraftTimeById(id) {
        return installations[id][InstallationTypes.CraftTime];
    },

    getAlchemicaCostById(id) {
        return installations[id][InstallationTypes.AlchemicaCost];
    },

    getTypeById(id) {
        switch (installations[id][InstallationTypes.Type]) {
            case 0:
                return InstallationTypeNames.Altar;
            case 1:
                return InstallationTypeNames.Harvester;
            case 2:
                return InstallationTypeNames.Reservoir;
            case 3:
                return InstallationTypeNames.GotchiLodge;
            case 4:
                return InstallationTypeNames.Wall;
            case 5:
                return InstallationTypeNames.NFTDisplay;
            case 6:
                return InstallationTypeNames.BuildqueueBooster;
            case 7:
                return InstallationTypeNames.Decoration;
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

    getDeprecatedById(id) {
        return installations[id][InstallationTypes.Deprecated];
    }
};
