import { InstallationTypeNames, InstallationTypes, RarityTypes } from 'shared/constants';
import { InstallationItem } from 'shared/models';
import installations from 'data/installations.data.json';


export class InstallationsUtils {
    public static getMetadataById(id: any): InstallationItem {
        return {
            name: InstallationsUtils.getNameById(id),
            type: InstallationsUtils.getTypeById(id),
            level: InstallationsUtils.getLevelById(id),
            spillRadius: InstallationsUtils.getSpillRadiusById(id),
            spillRate: InstallationsUtils.getSpillRateById(id),
            craftTime: InstallationsUtils.getCraftTimeById(id),
            alchemicaCost: InstallationsUtils.getAlchemicaCostById(id),
            cooldown: InstallationsUtils.getCooldownByLevel(InstallationsUtils.getLevelById(id)),
            deprecated: InstallationsUtils.getDeprecatedById(id)
        };
    }

    public static getIsInstallationExist(id: number): boolean {
        return Boolean(installations[id]);
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

    public static getAlchemicaCostById(id: any): any {
        return installations[id][InstallationTypes.AlchemicaCost];
    }

    public static getTypeById(id: any): string {
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

    public static getDeprecatedById(id: any): any {
        return installations[id][InstallationTypes.Deprecated];
    }

    public static getRarityById(id: number | string): string {
        const name: string = InstallationsUtils.getNameById(id).split(' ')[0].toLowerCase();
        const isRarity: boolean = Object.values(RarityTypes).some((rarity: string) => rarity === name);

        if (isRarity) {
            return name;
        } else {
            return 'golden';
        }
    }
}
