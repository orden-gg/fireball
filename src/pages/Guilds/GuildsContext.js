import React, { createContext, useEffect, useState } from 'react';

import thegraphApi from 'api/thegraph.api';
import fireballApi from 'api/fireball.api';
import guildsData from 'data/guilds.json';
import commonUtils from 'utils/commonUtils';

guildsData.reverse().sort(guild => guild.members.length ? -1 : 1);

export const GuildsContext = createContext({});

const GuildsContextProvider = (props) => {
    const [realm, setRealm] = useState([]);

    const [gotchis, setGotchis] = useState([]);
    const [lendings, setLendings] = useState([]);
    const [gotchisAmount, setGotchisAmount] = useState([]);
    const [guildId, setGuildId] = useState(null);

    const loadGuildGotchis = id => {
        thegraphApi.getGotchisByAddresses(guildsData[id].members).then(responses => {
            setGotchis(gotchisState => {
                gotchisState[id] = responses;

                return [...gotchisState];
            });
        });
    }

    const loadGuildLendings = id => {
        const promises = guildsData[id].members.map(address => thegraphApi.getLendingsByAddress(address));

        Promise.all(promises).then(responses => {
            const guildLendings = responses.reduce((result, current) => result.concat(current), []);

            setLendings(lendingsState => {
                lendingsState[id] = guildLendings;

                return [...lendingsState];
            });
        });
    }

    const loadGuildRealm = id => {
        thegraphApi.getRealmByAddresses(guildsData[id].members).then(realm => {
            setRealm(realmState => {
                realmState[id] = realm;

                return [...realmState];
            })
        });
    }

    const loadGuildData = id => {
        loadGuildGotchis(id);
        loadGuildLendings(id);
        loadGuildRealm(id);
    }

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

    return (
        <GuildsContext.Provider value={{
            guildsData,
            gotchisAmount,
            guildId,
            gotchis,
            lendings,
            realm,

            loadGuildData,
            setGuildId
        }}>
            { props.children }
        </GuildsContext.Provider>
    )
}

export default GuildsContextProvider;
