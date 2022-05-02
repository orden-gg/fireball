import React, { createContext, useEffect, useState } from 'react';

import fireballApi from 'api/fireball.api';
import guildsData from 'data/guilds.json';
import commonUtils from 'utils/commonUtils';

export const GuildsContext = createContext({});

const getModifiedGuilds = (guilds) => {
    const guildsCopy = [...guilds];
    const ordenGuildIndex = guildsCopy.findIndex(guild => guild.name === 'ordenGG');
    const ordenGuild = guildsCopy.splice(ordenGuildIndex, 1);
    const activeGuilds = guildsCopy.filter(guild => guild.members.length > 0);
    const inactiveGuilds = guildsCopy.filter(guild => guild.members.length === 0);

    activeGuilds.sort((a, b) => a.name.localeCompare(b.name));
    inactiveGuilds.sort((a, b) => a.name.localeCompare(b.name));

    const modifiedGuilds = ordenGuild.concat(activeGuilds).concat(inactiveGuilds)

    return modifiedGuilds;
}

const GuildsContextProvider = (props) => {
    const [guilds] = useState(getModifiedGuilds([...guildsData]));
    const [guildRealm, setGuildRealm] = useState([]);
    const [guildGotchis, setGuildGotchis] = useState([]);
    const [guildLendings, setGuildLendings] = useState([]);
    const [gotchisAmount, setGotchisAmount] = useState([]); // TODO check if needed, not used anywhere for now
    const [guildId, setGuildId] = useState(null);

    useEffect(() => {
        let mounted = false;

        const promises = guilds
            .filter(guild => guild.members?.length > 0)
            .map(guild =>
                fireballApi.getGotchisAmountByGuild(commonUtils.stringToKey(guild.name))
            );

        Promise.all(promises).then(response => {
            if (mounted) {
                return;
            }

            setGotchisAmount(
                guilds.map((guild, id) => response[id]?.ghosts_num || 0)
            );
        });

        return () => mounted = true;
    }, [guilds]);

    useEffect(() => {
        setGuildGotchis([]);
        setGuildLendings([]);
        setGuildRealm([]);
    }, [guildId]);

    return (
        <GuildsContext.Provider value={{
            guilds,
            gotchisAmount,
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
    )
}

export default GuildsContextProvider;
