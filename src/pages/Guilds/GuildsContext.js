import React, { createContext, useEffect, useState } from 'react';

import fireballApi from 'api/fireball.api';
import guildsData from 'data/guilds.json';
import commonUtils from 'utils/commonUtils';

guildsData.reverse().sort(guild => guild.members.length ? -1 : 1);

export const GuildsContext = createContext({});

const GuildsContextProvider = (props) => {
    const [guildRealm, setGuildRealm] = useState([]);
    const [guildGotchis, setGuildGotchis] = useState([]);
    const [guildLendings, setGuildLendings] = useState([]);
    const [gotchisAmount, setGotchisAmount] = useState([]);
    const [guildId, setGuildId] = useState(null);

    useEffect(() => {
        let destroyed = false;

        const promises = guildsData
            .filter(guild => guild.members?.length > 0)
            .map(guild =>
                fireballApi.getGotchisAmountByGuild(commonUtils.stringToKey(guild.name))
            );

        Promise.all(promises).then(response => {
            if(destroyed) {
                return;
            }

            setGotchisAmount(
                guildsData.map((guild, id) => response[id]?.ghosts_num || 0)
            );
        });

        return () => destroyed = true;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setGuildGotchis([]);
        setGuildLendings([]);
        setGuildRealm([]);
    }, [guildId]);

    return (
        <GuildsContext.Provider value={{
            guildsData,
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
