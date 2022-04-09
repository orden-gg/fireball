import guilds from 'data/guilds';

import commonUtils from './commonUtils';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getGuildImg(name) {
        try {
            return require(`../assets/images/guilds/${name}.png`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
        }
    },

    gedAddressGuild(address) {
        const guild = guilds.filter((guild) =>
            guild.members.some((member) => member.toLowerCase() === address.toLowerCase())
        )[0];

        return guild ? commonUtils.stringToKey(guild.name) : undefined;
    },

    getGuildName(key) {
        const index = guilds.findIndex(guild => commonUtils.stringToKey(guild.name) === key);

        return guilds[index]?.name;
    },

    getRarityNameByRS(rs) {
        switch (true) {
            case rs > 580:
                return 'godlike'
            case rs > 525:
                return 'mythical'
            default:
                return 'rare'
        }
    },

    countAlchemicaEfficency(fud, fomo, alpha, kek) {
        // 1 fomo = 2 fud
        // 1 alpha = 4 fud
        // 1 kek = 10 fud
        return fud + fomo * 2 + alpha * 4 + kek * 10;
    },

}
