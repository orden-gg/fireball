import { createContext, useEffect, useState } from 'react';

import guildsData from 'data/guilds.json';

export const GuildsContext = createContext({});

const getModifiedGuilds = (guilds: any[]): any[] => {
    const guildsCopy: any[] = [...guilds];
    const ordenGuildIndex = guildsCopy.findIndex(guild => guild.name === 'ordenGG');
    const ordenGuilds: any[] = guildsCopy.splice(ordenGuildIndex, 1);
    const activeGuilds: any[] = guildsCopy.filter(guild => guild.members.length > 0);
    const inactiveGuilds: any[] = guildsCopy.filter(guild => guild.members.length === 0);

    activeGuilds.sort((a: any, b: any) => a.name.localeCompare(b.name));
    inactiveGuilds.sort((a: any, b: any) => a.name.localeCompare(b.name));

    const modifiedGuilds: any[] = ordenGuilds.concat(activeGuilds).concat(inactiveGuilds);

    return modifiedGuilds;
};

export const GuildsContextProvider = (props: any) => {
    const [guilds] = useState<any[]>(getModifiedGuilds([...guildsData]));
    const [guildRealm, setGuildRealm] = useState<any[]>([]);
    const [guildGotchis, setGuildGotchis] = useState<any[]>([]);
    const [guildLendings, setGuildLendings] = useState<any[]>([]);
    const [guildId, setGuildId] = useState<number | null>(null);

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
