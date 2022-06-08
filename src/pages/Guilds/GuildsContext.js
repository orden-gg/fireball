import { createContext, useEffect, useState } from 'react';

import guildsData from 'data/guilds.json';

export const GuildsContext = createContext({});

const getModifiedGuilds = (guilds) => {
    const guildsCopy = [...guilds];
    const ordenGuildIndex = guildsCopy.findIndex(guild => guild.name === 'ordenGG');
    const ordenGuild = guildsCopy.splice(ordenGuildIndex, 1);
    const activeGuilds = guildsCopy.filter(guild => guild.members.length > 0);
    const inactiveGuilds = guildsCopy.filter(guild => guild.members.length === 0);

    activeGuilds.sort((a, b) => a.name.localeCompare(b.name));
    inactiveGuilds.sort((a, b) => a.name.localeCompare(b.name));

    const modifiedGuilds = ordenGuild.concat(activeGuilds).concat(inactiveGuilds);

    return modifiedGuilds;
};

const GuildsContextProvider = (props) => {
    const [guilds] = useState(getModifiedGuilds([...guildsData]));
    const [guildRealm, setGuildRealm] = useState([]);
    const [guildGotchis, setGuildGotchis] = useState([]);
    const [guildLendings, setGuildLendings] = useState([]);
    const [guildId, setGuildId] = useState(null);

    useEffect(() => {
        setGuildGotchis([]);
        setGuildLendings([]);
        setGuildRealm([]);
    }, [guildId]);

    return (
        <GuildsContext.Provider value={{
            guilds,
            guildId,
            guildGotchis,
            guildLendings,
            guildRealm,

            setGuildId,
            setGuildGotchis,
            setGuildLendings,
            setGuildRealm
        }}>
            { props.children }
        </GuildsContext.Provider>
    );
};

export default GuildsContextProvider;
