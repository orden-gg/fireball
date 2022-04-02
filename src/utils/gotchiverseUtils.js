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
        const guild = guilds.filter((guild) => {
            return guild.members.some((member) => member.toLowerCase() === address.toLowerCase())
        })[0];

        return guild ? commonUtils.stringToKey(guild.name) : undefined;
    },

    getGuildName(key) {
        const index = guilds.findIndex(guild => commonUtils.stringToKey(guild.name) === key);

        return guilds[index]?.name;
    },
}
