import guilds from 'data/guilds.json';

import { CommonUtils } from './commonUtils';

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
            case rs > 580:
                return 'godlike';
            case rs > 525:
                return 'mythical';
            default:
                return 'rare';
        }
    }

    public static countAlchemicaEfficency(fud: any, fomo: any, alpha: any, kek: any): any {
        // 1 fomo = 2 fud
        // 1 alpha = 4 fud
        // 1 kek = 10 fud
        return fud + fomo * 2 + alpha * 4 + kek * 10;
    }
}
