import installations from 'data/installations.json';
import { InstallationTypes } from 'data/types';

export class InstallationsUtils {
    public static getMetadataById(id: any): any {
        return {
            name: this.getNameById(id),
            type: this.getTypeById(id),
            level: this.getLevelById(id),
            spillRadius: this.getSpillRadiusById(id),
            spillRate: this.getSpillRateById(id),
            craftTime: this.getCraftTimeById(id),
            // alchemicaCost: this.getAlchemicaCostById(id), // TODO check if needed and fix
            cooldown: this.getCooldownByLevel(this.getLevelById(id))
        };
    }

    public static getNameById(id: any): any {
        return installations[id][InstallationTypes.Name];
    }

    public static getLevelById(id: any): any {
        return installations[id][InstallationTypes.Level];
    }

    public static getImageById(id: any): any {
        try {
            return require(`../assets/images/installations/${id}.png`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static getSpillRadiusById(id: any): any {
        return installations[id][InstallationTypes.SpillRadius];
    }

    public static getSpillRateById(id: any): any {
        return installations[id][InstallationTypes.SpillRate];
    }

    public static getCraftTimeById(id: any): any {
        return installations[id][InstallationTypes.CraftTime];
    }

    // TODO check if needed and fix
    // public static getAlchemicaCostById(id: any): any {
    //     return installations[id][InstallationTypes.AlchemicaCost]
    //         .map(token => Number(ethers.utils.formatUnits(token.hex)));
    // }

    public static getTypeById(id: any): any {
        switch (installations[id][InstallationTypes.Type]) {
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
    }

    public static getCooldownByLevel(lvl: any, units?: any): any {
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
    }
}
