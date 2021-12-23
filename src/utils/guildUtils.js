// eslint-disable-next-line import/no-anonymous-default-export
export default {

    nameToPath(name) {
        return name.replace(/ /g, '').toLowerCase();
    },
    // getGuildLogo(name) {
    //     try {
    //         return require(`../assets/guilds/${name}`).default
    //     } catch (error) {
    //         return undefined;
    //     }
    // }
}