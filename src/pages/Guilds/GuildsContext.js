import React, { createContext, useEffect, useState } from 'react';

import guilds from 'data/guilds';
import thegraph from 'api/thegraph.api';

export const GuildsContext = createContext({});

const GuildsContextProvider = (props) => {
    const [currentGuild, setCurrentGuild] = useState({});
    const [guildsData, setGuildsData] = useState(
        [...guilds].reverse().sort(guild => guild.members.length ? -1 : 1)
    );

    const setGotchisByGuild = gotchis => {
        setGuildsData(guildsState => {
            return guildsState.map(guild => {
                guild.gotchis = [];

                guild.members = guild.members.map(address => address.toLowerCase());

                for(let gotchi of gotchis) {
                    const isGuildGotchi = guild.members.includes(gotchi.owner.id);

                    if(isGuildGotchi) {
                        guild.gotchis.push(gotchi);
                    }
                }

                return guild;
            })
        });
    }

    const loadGuildRealm = guild => {
        const id = guildsData.indexOf(guild);

        thegraph.getRealmByAddresses(guild.members).then(realm => {
            setGuildsData(guildsState => {
                guildsState[id].realm = realm;

                return [...guildsState];
            })
        });
    }

    const setRealmByGuild = (realm, id) => {
        setGuildsData(guildsState => {
            guildsState[id].realm = realm;

            return [...guildsState];
        });
    }

    useEffect(() => {
        let destroyed = false;

        setTimeout(() => {
            for(let id of guildsData.keys()) {
                thegraph.getRealmByAddresses(guildsData[id].members).then(realm => {
                    if(destroyed) return;

                    setRealmByGuild(realm, id);
                });
            }

            thegraph.getAllGotchies().then(gotchis => {
                if(destroyed) return;

                setGotchisByGuild(gotchis);
            });
        }, 1000);

        return () => destroyed = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <GuildsContext.Provider value={{
            guildsData,

            currentGuild,
            setCurrentGuild,

            loadGuildRealm
        }}>
            { props.children }
        </GuildsContext.Provider>
    )
}

export default GuildsContextProvider;
