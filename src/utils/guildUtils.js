// eslint-disable-next-line import/no-anonymous-default-export
export default {

    nameToPath(name) {
        return name.replace(/’| /g, '').replace(/ /g, '').toLowerCase();
    },
}