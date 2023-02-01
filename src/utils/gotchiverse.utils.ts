import { AlchemicaList } from 'shared/models';
import guilds from 'data/guilds.json';

import { CommonUtils } from './common.utils';
import { InstallationsUtils } from './installations.utils';
import { RarityScoreNumber, RarityTypes } from 'shared/constants';

export class GotchiverseUtils {
    public static getGuildImg(name: any): any {
        try {
            return require(`../assets/images/guilds/${name}.png`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static gedAddressGuild(address: any): any {
        const guild = guilds.filter((guild) =>
            guild.members.some((member) => member.toLowerCase() === address.toLowerCase())
        )[0];

        return guild ? CommonUtils.stringToKey(guild.name) : undefined;
    }

    public static getGuildName(key: any): any {
        const index = guilds.findIndex(guild => CommonUtils.stringToKey(guild.name) === key);

        return guilds[index]?.name;
    }

    public static getRarityNameByRS(rs: any): string {
        switch (true) {
            case rs >= RarityScoreNumber.Godlike:
                return RarityTypes.Godlike;
            case rs >= RarityScoreNumber.Mythical:
                return RarityTypes.Mythical;
            case rs >= RarityScoreNumber.Rare:
                return RarityTypes.Rare;
            default:
                return RarityTypes.Common;
        }
    }

    public static countKinshipChannelingBoost(kinship: string): number {
        const defaultKinship = 50;
        const currentKinship = Number(kinship);
        const boost = Math.sqrt(currentKinship / defaultKinship);

        return currentKinship < defaultKinship ? 0 : parseFloat(boost.toFixed(2));
    }

    public static countGotchiChannelingRate(altarLevel: number, boost: number): AlchemicaList {
        const defaultAlchemica: AlchemicaList = [20, 10, 5, 2];
        const altarMultiplier = (100 - (InstallationsUtils.getSpillRateById(altarLevel) / 100)) / 100;
        const modified = defaultAlchemica.map((alchemica: number) => (alchemica * boost) * altarMultiplier);

        return modified as AlchemicaList;
    }

    public static getAlchemicaImg(name: any): any {
        try {
            return require(`../assets/images/icons/${name}.svg`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static getAlchemicaTokenImg(name: any): any {
        try {
            return require(`../assets/images/tokens/${name}-token.svg`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static getAlchemicaMultiplier(name: any): any {
        switch (name) {
            case 'fud':
                return 1000;
            case 'fomo':
                return 500;
            case 'alpha':
                return 250;
            case 'kek':
                return 100;
            default:
                return 1;
        }
    }

    public static getTicketFrensPrice(rarity: any): any {
        switch (rarity) {
            case RarityTypes.Common:
                return 50;
            case RarityTypes.Uncommon:
                return 250;
            case RarityTypes.Rare:
                return 500;
            case RarityTypes.Legendary:
                return 2500;
            case RarityTypes.Mythical:
                return 10000;
            case RarityTypes.Godlike:
                return 50000;
            case RarityTypes.Drop:
                return 10000;
            default:
                return 0;
        }
    }
}
