import React, { createContext, useEffect, useState } from 'react';

import thegraph from 'api/thegraph.api';
import guilds from 'data/guilds';

export const GuildsContext = createContext({});

const GuildsContextProvider = (props) => {
    const [currentGuild, setCurrentGuild] = useState({});
    const [guildsData, setGuildsData] = useState(
        JSON.parse(JSON.stringify(guilds)).map(guild => {
            guild.members = guild.members.map(address => address.toLowerCase());

            return guild;
        })
        .reverse()
        .sort(guild => guild.members.length ? -1 : 1)
    );

    const setGotchisByGuild = gotchis => {
        setGuildsData(guildsState => {
            for(let gotchi of gotchis) {
                for(let guild of guildsState) {
                    if(guild.members.length === 0) {
                        guild.gotchis = [];
                        continue;
                    }

                    if(!guild.hasOwnProperty('gotchis')) {
                        guild.gotchis = [];
                    }

                    const isGuildGotchi = guild.members.includes(gotchi.owner.id);

                    if(isGuildGotchi) {
                        guild.gotchis.push(gotchi);
                    }
                }
            }

            return [...guildsState]
        });
    }

    const setLendingsByGuild = gotchis => {
        setGuildsData(guildsState => {
            for(let gotchi of gotchis) {
                for(let guild of guildsState) {
                    if(guild.members.length === 0) {
                        guild.lendings = [];
                        continue;
                    }

                    if(!guild.hasOwnProperty('lendings')) {
                        guild.lendings = [];
                    }

                    console.log(gotchi.lender);

                    const isGuildGotchi = guild.members.includes(gotchi.lender.toLowerCase());

                    if(isGuildGotchi) {
                        guild.lendings.push(gotchi);
                    }
                }
            }

            return [...guildsState]
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

        for(let id of guildsData.keys()) {
            thegraph.getRealmByAddresses(guildsData[id].members).then(realm => {
                if(destroyed) {
                    return;
                }

                setRealmByGuild(realm, id);
            });
        }



        setTimeout(() => {
            thegraph.getAllGotchies().then(gotchis => {
                if(destroyed) {
                    return;
                }

                setGotchisByGuild(gotchis);
            });

            thegraph.getLendings().then(gotchis => {
                if(destroyed) {
                    return;
                }

                setLendingsByGuild(gotchis);
            });
        }, 0);

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
